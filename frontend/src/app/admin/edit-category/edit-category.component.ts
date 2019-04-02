import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { CategoryName } from '../../shared/CategoryName.model';
import {MatTableDataSource} from '@angular/material';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
 /* category: CategoryName;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: AdminService) { }

  ngOnInit() {
   let userId = window.localStorage.getItem('editUserId');
    if(!userId) {
      alert('Invalid action.');
      this.router.navigate(['/showcategorylist']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });
    this.apiService.getUserById(+userId)
      .subscribe( data => {
        this.editForm.setValue(data.result);
      });
  }

  onSubmit() {
    this.apiService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.status === 200) {
            alert('User updated successfully.');
            this.router.navigate(['list-user']);
          }else {
            alert(data.message);
          }
        },
        error => {
          alert(error);
        });
  }
  }*/
  post: CategoryName;
  editForm: FormGroup;
  categoryId: string;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: AdminService) { }
 formData: any  = {
   category: ''
 }
  ngOnInit() {
    this.categoryId = localStorage.getItem('CategoryId');
    console.log('i am from edit', this.categoryId);
    if (!this.categoryId) {
      alert('Invalid action')
      this.router.navigate(['/showcategorylist']);
      return;
    }

    this.editForm = new FormGroup({
      id: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      category: new FormControl(null, { validators: [Validators.required] }),
    });
  /*  this.userService.getCategorybyId(this.categoryId)
    .subscribe( data => {
        this.category.push(data);
      });
    this.userService.getCategorybyId(this.categoryId)
      .subscribe( data => {
        // this.category = data;
        console.log(data);
        this.editForm.setValue(data);
      }); */
    this.userService.getCategorybyId(this.categoryId).subscribe((postData: any)  => {
     // postData.toString();
      this.post = {

        id: postData._id,
        categoryName: postData.category_name
       // title: postData.title,
       // content: postData.content,
      //  imagePath: postData.imagePath,
      //  creator: postData.creator,
      //  category: this.selected
      };
      this.editForm.setValue({
        id: this.post.id,
        category : this.post.categoryName,
       // image: this.post.imagePath,
       // selected: this.post.category
    //    category: this.selected
      });
  });
}

  onSubmit() {
    console.log(this.editForm.value.category);
    this.userService.updateCategory(this.categoryId, this.editForm.value.category);
  }
}
