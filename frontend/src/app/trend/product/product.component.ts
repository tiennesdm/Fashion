import { Component, OnInit, Input, EventEmitter , Output, 
  OnChanges,AfterContentChecked, 
  AfterContentInit, 
  OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageEvent } from '@angular/material';
import { TrendService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../shared/product.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements  OnChanges{
  @Input('childmessage') childmessage ;
  posts: Product [] = [] ;
  newMessage: any = '';
  categoryName: string ;
  isLoading = false;
  totalPosts = 0;
  postsPerPage;
  currentPage = 1;
  pageSizeOptions = [];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  constructor( public postsService: TrendService,
               private authService: AuthService,
               private spinner: NgxSpinnerService) { }

  ngOnChanges() {
    this.spinner.show();
    setTimeout( () => {this.spinner.hide(); }, 1000);
    console.log('i am change ', this.childmessage);
    this.postsService.getPostByCategory(this.childmessage).subscribe(
      (data: any) => {
        this.posts = data;
        console.log(data);
        console.log(data.message);
        this.postsPerPage = data.maxPosts;
      //  this.pageSizeOptions.push(data.length+1);
      //  console.log(data.maxPosts);
      }
    );
    this.postsSub = this.postsService
    .getPostUpdateListener()
    .subscribe((postData: { posts: Product[]; postCount: number }) => {
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    
    });
  }
  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
 /* ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  } */

}
