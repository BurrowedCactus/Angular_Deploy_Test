import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
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
  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private fileUploadService: FilesService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.form = new FormGroup({
      'title': new FormControl(null,{
        validators:[Validators.required, Validators.minLength(3)]},),
      'content': new FormControl(null),
      'file': new FormControl(null)
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
/*
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
          this.form.setValue({
            'id':this.post.id,
            'title':this.post.title,
            'content':this.post.content,
            'file':})
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
      */
      this.isLoading = false;
    });

  }

  onSubmit(){}
    /*
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postsService.addPost(
        form.value.title,
        form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
    */
}
