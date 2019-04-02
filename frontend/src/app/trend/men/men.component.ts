import { Component, OnInit , OnDestroy} from '@angular/core';
import { Product } from '../../shared/product.model';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { TrendService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent implements OnInit , OnDestroy {
  posts: Product[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 8;
  currentPage = 1;
  pageSizeOptions = [8, 16, 24, 32];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public postsService: TrendService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout( () => {this.spinner.hide(); }, 1000);
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Product[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });

  }
  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
