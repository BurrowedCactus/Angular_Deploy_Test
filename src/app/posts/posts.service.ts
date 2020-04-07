import { Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject, BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/Operators";

import { Post } from "./post.model";

import { environment } from "./../../environments/environment";

const path = environment.apiUrl + "posts/";
@Injectable({
  providedIn: "root"
})
export class PostsService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<{
    posts: Post[];
    postCount: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {
    //this.getPosts();
  }

  getPosts() {
    //const queryParams = `?pageSize=${postsPerPage}&pageIndex=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        path// + queryParams
      )
      .pipe(
        map(postData => ({
          posts: postData.posts.map(post => ({
            title: post.title,
            content: post.content,
            id: post._id
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

  addPost(post: Post): Observable<any> {
    return this.http.post(path, post);
  }

  updatePost(post: Post): Observable<any>  {
    if(!post.id){
      console.log("error, cannot update a post with no id. In posts service.");
    }
    return this.http.put(path + post.id, post);
  }

  deletePost(postId: string) {
    return this.http.delete(path + postId);
  }
}
