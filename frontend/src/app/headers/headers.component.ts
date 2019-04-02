import { Component, OnInit, OnDestroy, ElementRef, Renderer2 ,HostListener,HostBinding,Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit, OnDestroy  {
  defaultcolor = 'black';
   Highlightedcolor = 'red' ;
    @HostBinding('style.color') color  = this.defaultcolor;

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService, private elm: ElementRef , private render: Renderer2
   ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
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
