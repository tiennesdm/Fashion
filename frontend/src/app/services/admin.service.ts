import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Product } from '../shared/product.model';
import { CategoryName} from '../shared/CategoryName.model';
// import {Observable} from 'rxjs/Rx';
// import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private posts: Product[] = [];
  private category: CategoryName[] = [];
  private postsUpdated = new Subject<{ posts: Product[]; postCount: number }>();
  private categoryUpdated = new Subject<{category: CategoryName[]; }  >();

  constructor(private http: HttpClient, private router: Router) {}
 /* getCategory() {
   // const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string , getcategory: any }>(
        'http://localhost:3000/api/allCategoryName'
      ).pipe(
        map(getcategory => {
          console.log(getcategory);
          return {
          //  id: getcategory.getcategory.id,
            category: getcategory.getcategory.map(post => {
              return {
                id: post.id,
                categoryName: post.category_name ,
              };
            }),
          };
        })
      ).subscribe(transformedcategorydata => {
        this.category = transformedcategorydata.category;
        this.categoryUpdated.next({
          category: [...this.category],
        });

      });
  } */
  onCategoryRegister(id: number , categoryName: string ) {
    const register: CategoryName = { id: null, categoryName: categoryName};
    console.log(register);
    this.http
      .post<{ message: string; }>(
        'http://localhost:3000/api/allCategoryName',
         register
      )
      .subscribe(responseData => {
        console.log(responseData);
        this.router.navigate(['/card']);
      }
      , err => {
        console.log(err.message);
      }
      );

 }
getCategory(): Observable<CategoryName[]> {
  return this.http.get<CategoryName[]>('http://localhost:3000/api/allCategoryName')
}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe(
        map(postData => {
       //   console.log(postData);
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
    }>('http://localhost:3000/api/posts/' + id);
  }
  getCategorybyId(id: string){
     return this.http.get<{}>('http://localhost:3000/api/allCategoryName/' + id);
  }

  addPost(title: string, content: string, image: File, category: string) {
   /* const register: Product = { title: title, content: content, image:image,category:category}; */
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    postData.append('category', category);
    console.log(postData);
    this.http
      .post<{ message: string; post: Product }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(['/list']);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string, category: string) {
    let postData: Product | FormData;
    console.log(postData);
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
      postData.append('category', category);
    } else {
      postData = {
        id: ('{id}'),
        title: ('{title}'),
        content: ('{content}'),
        imagePath: ('{image}'),
        creator: ('{null}'),
        category: ('{category}')
      };
      console.log(postData);
    }
    this.http
      .put('http://localhost:3000/api/posts/' + id, postData)
      .subscribe(response => {
        this.router.navigate(['/list']);
      });
  }


  deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
  }
  /*deleteCategory(id: string) {
    return this.http.delete('http://localhost:3000/api/allCategoryName' + id);
  } */
  deleteCategory(categoryid: string) {
    return this.http.delete('http://localhost:3000/api/allCategoryName/' + categoryid);
  }
 updateCategory(id: string, categoryName: string) {
   /* console.log(id);
    console.log(category);
    let CategoryData: CategoryName | FormData;
    //console.log(CategoryData);
    CategoryData = new FormData();
    CategoryData.append('id', id);
    CategoryData.append('category', category);
    JSON.stringify(CategoryData); */
    const register: CategoryName = { id: id, categoryName: categoryName};

    this.http
      .put('http://localhost:3000/api/allCategoryName/' + id, register)
      .subscribe(response => {
        this.router.navigate(['/showcategorylist']);
      });
  }
  /*
    updateUser(user: User) {
    return this.http.put(this.baseUrl + '/' + user.id, user);
  }
  */
 /* updateCategory(id: string, category: string): Observable<CategoryName> {
    return this.http.put<CategoryName>('http://localhost:3000/api/allCategoryName/' + id, category);
  }
  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + user.id, user);
  }
  /*
  deleteCategory(id: string): Observable<CategoryName> {
    return this.http.delete<CategoryName>('http://localhost:3000/api/allCategoryName' + id);
  } */
}
