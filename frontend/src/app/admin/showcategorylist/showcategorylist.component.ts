import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { CategoryName } from '../../shared/CategoryName.model';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-showcategorylist',
  templateUrl: './showcategorylist.component.html',
  styleUrls: ['./showcategorylist.component.css']
})
export class ShowcategorylistComponent implements  OnInit {
  category: CategoryName [] = [];
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  displayedColumns: string[] = ['position', 'name'];
  public dataSource = new MatTableDataSource<CategoryName>();
  constructor(
    public postsService: AdminService,
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.postsService.getCategory()
    .subscribe( data => {
      this.category = data;
      // this.category= data._id
      console.log(this.category);
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
  }
  /*deleteCategory(id: string): void {
    this.postsService.deleteCategory(category.id)
      .subscribe( data => {
        this.category = this.category.filter(u => u !== category);
      } )
  } ; */
 /* ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  } */
  deleteCategory(categoryId: string) {
    this.isLoading = true;
    this.postsService.deleteCategory(categoryId).subscribe(() => {
      this.postsService.getCategory().subscribe( data => {
        this.category = data ;
      });
    }, () => {
      this.isLoading = false;
    });
  }
  editCategory(categoryId: string ) {
    console.log(categoryId);
    localStorage.setItem('CategoryId', categoryId.toString());
    this.postsService.getCategorybyId(categoryId);
    this.router.navigate(['/editCategory']);




  }
  /*editUser(categoryId: string): void {
   // window.localStorage.removeItem("editUserId");
   // window.localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };*/

}
