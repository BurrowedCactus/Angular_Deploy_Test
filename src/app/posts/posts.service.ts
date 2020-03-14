import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/Operators';

import { Post } from './post.model';

import { environment } from './../../environments/environment'



const path = environment.apiUrl + 'posts/';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts:Post[]=[];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();


  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postsPerPage}&pageIndex=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        path + queryParams
      )
      .pipe(
        map(postData => ({
          posts: postData.posts.map(post => ({
            title: post.title,
            content: post.content,
            id: post._id,
          })),
          maxPosts: postData.maxPosts
        }))
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: transformedPostData.posts,
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
    }>(path + id);
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.http
      .post<{ message: string, postId: string }>(path, post)
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http
      .put(path + id, post)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(path + postId);
  }

}
