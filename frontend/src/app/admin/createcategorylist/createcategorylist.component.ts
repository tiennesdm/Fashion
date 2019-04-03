import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { CategoryName } from '../../shared/CategoryName.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-createcategorylist',
  templateUrl: './createcategorylist.component.html',
  styleUrls: ['./createcategorylist.component.css']
})
export class CreatecategorylistComponent implements OnInit {
  userIsAuthenticated = false;
  private authStatusSub: Subscription;
  isLoading = false;

  constructor(
    public postsService: AdminService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
  }
  onCategoryRegister(form: NgForm) {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    this.postsService.onCategoryRegister( form.value.id, form.value.category );
    form.resetForm();
}
/*title = '';
description = '';
selected  = '' ;
enteredTitle = '';
enteredContent = '';
// post: Product;
category: CategoryName;
isLoading = false;
form: FormGroup;
imagePreview: string;
private mode = 'create';
private postId: string;
private authStatusSub: Subscription;
private CategorySub: Subscription;

constructor(
  public postsService: AdminService,
  public route: ActivatedRoute,
  private authService: AuthService
) {}

ngOnInit() {
  this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
 /* this.postsService.getCategory()
    .subscribe( data => {
      this.category = data;
    }); */
/*  this.form = new FormGroup({
    id: new FormControl(null, {
      validators: [Validators.required]
    }),
    category: new FormControl(null, { validators: [Validators.required] }),
  });
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('id')) {
      this.mode = 'edit';
      this.postId = paramMap.get('id');
      this.isLoading = true;
      this.postsService.getCategorys(this.postId).subscribe(postData => {
        this.isLoading = false;
       // this.category = postData;
        this.category = {
          id: postData._id,
          categoryName: postData.category_name
        }
        //  id: postData._id,
         // id: postData.id,
          //category: postData.categoryName,
         // content: postData.content,
         // imagePath: postData.imagePath,
         // creator: postData.creator,
         // category: this.selected
      //  };
        this.form.setValue({
          category: this.category.categoryName,
       //   content: this.post.content,
        //  image: this.post.imagePath,
         // selected: this.post.category
      //    category: this.selected
        });
      });
    } else {
      this.mode = 'create';
      this.postId = null;
    }
  });
}

/*onImagePicked(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({ image: file });
  this.form.get('image').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(file);
} */

/*onSavePost() {
  if (this.form.invalid) {
    return;
  }
  this.isLoading = true;
  if (this.mode === 'create') {
    this.postsService.onCategoryRegister(
      null,
      this.form.value.category,
    //  this.form.value.content,
    //  this.form.value.image,
     // this.selected
    );
  } else {
    this.postsService.updateCategory(
      this.postId,
      this.form.value.category,
    //  this.form.value.content,
    //  this.form.value.image,
     // this.selected
    );
  }
  this.form.reset();
} */
}
