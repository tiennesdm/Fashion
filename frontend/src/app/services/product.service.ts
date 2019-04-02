import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Product } from '../shared/product.model';
import { from } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrendService {

  private posts: Product[] = [];
//  private women: Post[] = [];
  private postsUpdated = new Subject<{ posts: Product[]; postCount: number }>();
//  private postsUpdatedwomen = new Subject<{women: Post[]; postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}
  getPosts(postsPerPage: number, currentPage: number) {
    const men = 'Men';
    // const category = `&category=${men}`;
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}&category=${men}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3000/api/men' + queryParams
      )
      .pipe(
        map(postData => {
          console.log(postData);
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
                category: post.category
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
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
      imagePath: string;
      creator: string;
      category: string;
    }>('http://localhost:3000/api/men' + id);
  }
 getPostsWomen(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3000/api/women' + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
                category: post.category
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListenerWomen() {
    return this.postsUpdated.asObservable();
  }

  getPostWomen(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
      category: string;
    }>('http://localhost:3000/api/women' + id);
  }
}
