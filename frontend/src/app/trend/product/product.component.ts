import { Component, OnInit, Input, EventEmitter , Output, 
  OnChanges,AfterContentChecked, DoCheck,AfterViewInit,
  AfterContentInit, 
  OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class ProductComponent implements OnInit{
  @Input('childmessage') childmessage ;
  posts: Product [] = [] ;
  newMessage: any = '';
  categoryName: string ;
  isLoading = false;
  totalPosts = 0;
  postsPerPage;
  currentPage = 1;
  categoryRoute = '';
  pageSizeOptions = [5,10,15];
  userIsAuthenticated = false;
  userId: string;
  snapshotParam = 'initial value';
  subscribedParam = 'initial value';
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  constructor( public postsService: TrendService,
               private authService: AuthService,
               private spinner: NgxSpinnerService,
               private readonly route: ActivatedRoute,
               private readonly router: Router,
               ) { }
   ngOnInit() {
                // No Subscriptio
      
    //  this.snapshotParam = this.route.snapshot.paramMap.get('categoryName');
    //  console.log('this is route in on initalise',this.route.snapshot.paramMap.get('categoryName'));
    //  this.categoryRoute = this.route.snapshot.paramMap.get('categoryName');
                // Subscribed
    //  console.log('category',this.categoryRoute);
      this.route.paramMap.subscribe(params => {
       this.subscribedParam = params.get('categoryName');
       this.postsService.getPostByCategory(this.subscribedParam).subscribe(
        (data: any) => {
          this.spinner.show();
         setTimeout( () => {this.spinner.hide(); }, 1000);
          this.posts = data;
          console.log(data);
          console.log(data.message);
          this.postsPerPage = data.maxPosts;
        //  this.pageSizeOptions.push(data.length+1);
        //  console.log(data.maxPosts);
        }
      );
     //  console.log('subscribe',this.subscribedParam);
                });


              }
            /*  ngDoCheck(){
                this.snapshotParam = this.route.snapshot.paramMap.get('categoryName');
                console.log('this is route in do check',this.route.snapshot.paramMap.get('categoryName'));

              } 
              ngAfterViewInit(){
                this.snapshotParam = this.route.snapshot.paramMap.get('categoryName');
                console.log('this is route ng after view init',this.route.snapshot.paramMap.get('categoryName'));

              }

  ngOnChanges() {
    this.snapshotParam = this.route.snapshot.paramMap.get('categoryName');
    console.log('this is route in changes',this.route.snapshot.paramMap.get('categoryName'));
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
     // this.posts = postData.posts;
    
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
