import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Product } from '../shared/product.model';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrendService {
  baseUrl = environment.baseUrl;

  private posts: Product[] = [];
//  private women: Post[] = [];
  private postsUpdated = new Subject<{ posts: Product[]; postCount: number }>();
//  private postsUpdatedwomen = new Subject<{women: Post[]; postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}
  getPosts(postsPerPage: number, currentPage: number) {
    let url = this.baseUrl + '/product' ;
    const men = 'Men';
    // const category = `&category=${men}`;
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}&category=${men}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        url + queryParams
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
    let url = this.baseUrl + '/product' ;
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
      category: string;
    }>(url + id);
  }
  getPostByCategory(category: string): Observable<Product[]> {
    let url = this.baseUrl + '/product/' ;
    return this.http.get<Product[]>(url + category);
  }
  getPostsWomen(postsPerPage: number, currentPage: number) {
    let url = this.baseUrl + '/women' ;
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        url + queryParams
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
    let url = this.baseUrl + '/women' ;
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
      category: string;
    }>(url + id);
  } 
}
