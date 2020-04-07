import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { PostsService } from '../posts.service';
import { FilesService } from '../../files.service';
import { Post } from "../post.model";
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { CanDeactivateInterface } from './can-deactivate.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit , CanDeactivateInterface{
  post: Post;
  isLoading = false;
  private mode = "create";
  private postId: string;
  private changesSaved: boolean = false;
  form = this.fb.group({
    id: [''],
    title: ['',Validators.required],
    content: ['',Validators.required],
    file: ['']
  });

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private fileUploadService: FilesService,
    private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.postsService.getPost(this.postId).subscribe(postData => {
          console.log(postData);
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
          this.form.setValue({
            'id':this.post.id,
            'title':this.post.title,
            'content':this.post.content,
            'file':null
            })
          this.isLoading = false;
        });
      } else {
        this.mode = "create";
        this.postId = null;
        this.isLoading = false;
        this.post = {title: "",content: ""};
      }
    });

  }

  onSubmit(){
    this.isLoading = true;
    this.changesSaved = true;
    let response$: Observable<any>;
    if (this.mode === "create") {
      let newPost: Post = {
        title: this.form.value.title,
        content: this.form.value.content
      }
      response$ = this.postsService.addPost(newPost);
    } else {
      let updatedPost: Post = {
        id: this.postId,
        title: this.form.value.title,
        content: this.form.value.content
      }
      response$ = this.postsService.updatePost(updatedPost);
    }
    response$.subscribe(responseData => {
      this.router.navigate(["/"]);
    });
    this.form.reset();
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean>{
    if (this.changesSaved){
      return true;
    } else if (this.post.title === this.form.value.title && this.post.content === this.form.value.content){
      return true;
    }
    return confirm('Do you want to discard the changes?');
  }

}
