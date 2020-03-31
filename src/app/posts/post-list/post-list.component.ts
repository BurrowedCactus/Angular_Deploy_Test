import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] = [];
  isLoading: Boolean = false;
  @Input() totalPosts = 10;
  @Input() postsPerPage = 5;
  @Input() currentPage = 1;
  @Input() pageSizeOptions = [1,2,5,10];
  private postsSub : Subscription;

  constructor(private postsService:PostsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    //these two parts feels really weird, maybe change this part in the future.
    //get current content
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    //get future content
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
      this.isLoading = false;
    });
  }

  ngOnDestroy():void{
    this.postsSub.unsubscribe();
  }

  onDelete(postId:string){
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.currentPage = 1;
      this.totalPosts -= 1;
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
}
