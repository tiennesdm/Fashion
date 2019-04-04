import { Component, OnInit, OnDestroy, ElementRef, Renderer2 
  ,HostListener,HostBinding,Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import {CategoryName} from '../shared/CategoryName.model';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { TrendService } from '../services/product.service';
@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit, OnDestroy  {
  defaultcolor = 'black';
   Highlightedcolor = 'red' ;
    @HostBinding('style.color') color  = this.defaultcolor;
    // @Output() categoryName = new EventEmitter<string>();
  userIsAuthenticated = false;
  c: string;
  private authListenerSubs: Subscription;
  category: CategoryName [] = [];
 

  constructor(private authService: AuthService, 
              public postsService: AdminService,
              public productService: TrendService, 
              private elm: ElementRef , private render: Renderer2
   ) {}
newMessage: any  = '';
  ngOnInit() {
  
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.postsService.getCategory()
    .subscribe( (data: any )=> {
      this.category= data;
     // this.c = this.category.category_name
      // this.category= data._id
      console.log(this.category);
    });
    
  }
  getCategoryName(categoryname: string) {
    this.newMessage = categoryname;

  }
  @HostListener('mouseenter') mouseover(event: Event)
{

  this.color = this.Highlightedcolor ;
}
@HostListener('mouseleave') mouseleave(event: Event)
{

  this.color = this.defaultcolor;
}

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
