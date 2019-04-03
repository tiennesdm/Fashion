import { NgModule ,  CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialForm } from '../angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyCarouselModule} from '../carousel/carousel.module';
import { Routes, RouterModule } from '@angular/router';
import { CarouselModule, PopoverModule , ModalModule } from 'ngx-bootstrap';
import { MenComponent } from './men/men.component';
import { WomenComponent } from './women/women.component';
import { ProductComponent } from './product/product.component';
const routes: Routes = [
  { path: ':categoryName', component: MenComponent , data: { breadcrumbs: '' }},
//  {path: 'women' , component: WomenComponent, data: { breadcrumbs: 'Women' }},
//  { path: 'men', component: MenComponent, data: { breadcrumbs: 'Men' } },
];
@NgModule({
  declarations: [
    MenComponent,
    WomenComponent,
    ProductComponent ,
  //  CarouselComponent


  ],
  imports: [
    CommonModule,
    AngularMaterialForm,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    MyCarouselModule,
    PopoverModule,
    RouterModule.forChild(routes)

  ],
  exports: [
    MenComponent,
    WomenComponent ,
    ProductComponent,
   // CarouselComponent
  ],
})
export class TrendModule { }
