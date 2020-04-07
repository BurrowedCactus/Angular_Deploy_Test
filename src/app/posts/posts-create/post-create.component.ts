import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from '../posts.service';
import { FilesService } from '../../files.service';
import { Post } from "../post.model";
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  post: Post;
  isLoading = false;
  private mode = "create";
  private postId: string;
  form = this.fb.group({
    id: [''],
    title: ['',Validators.required],
    content: ['',Validators.required],
    file: ['']
  });

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
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
      }
    });

  }

  onSubmit(){
    this.isLoading = true;
    if (this.mode === "create") {
      let newPost: Post = {
        title: this.form.value.title,
        content: this.form.value.content
      }
      this.postsService.addPost(newPost);
    } else {
      let updatedPost: Post = {
        id: this.postId,
        title: this.form.value.title,
        content: this.form.value.content
      }
      this.postsService.updatePost(updatedPost);
    }
    this.form.reset();
  }
}
