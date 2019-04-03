import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialForm } from '../angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {AuthGuardGuard} from '../auth/auth-guard.guard';
import { ShowcategorylistComponent } from './showcategorylist/showcategorylist.component';
import { CreatecategorylistComponent } from './createcategorylist/createcategorylist.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

const routes: Routes = [
  {path: 'create', component: CreateComponent,
  data: { breadcrumbs: 'Create' },

  canActivate: [AuthGuardGuard]

},
{path: 'showcategorylist', component: ShowcategorylistComponent,
data: { breadcrumbs: 'Categorylist' },

canActivate: [AuthGuardGuard]

},
  {path: 'list', component: ListComponent ,
  data: { breadcrumbs: 'List' },
  canActivate: [AuthGuardGuard]},
  { path: 'edit/:postId', component: CreateComponent, canActivate: [AuthGuardGuard],
  data: { breadcrumbs: 'Edit' }
},
  {path: 'createcategory', component: CreatecategorylistComponent,
data: { breadcrumbs: 'CreateCategory' },

canActivate: [AuthGuardGuard]

},
{path: 'editCategory', component: EditCategoryComponent,
data: { breadcrumbs: 'EditCategory' },

canActivate: [AuthGuardGuard]

},

];
@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    ShowcategorylistComponent,
    CreatecategorylistComponent,
    EditCategoryComponent ,

  ],
  imports: [
    CommonModule,
    AngularMaterialForm,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
 exports: [
    CreateComponent,
    ListComponent ,
    ShowcategorylistComponent,
    CreatecategorylistComponent,
    EditCategoryComponent
  ]
})
export class AdminModule { }
