import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialForm } from '../angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselComponent } from './carousel.component';


@NgModule({
  declarations: [
    CarouselComponent ,

  ],
  imports: [
    CommonModule,
    AngularMaterialForm,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule
  ],
  exports : [
    CarouselComponent
  ],
})
export class MyCarouselModule { }
