import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BreadcrumbsModule} from 'ng6-breadcrumbs';
import { CarouselModule, PopoverModule , ModalModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialForm } from './angular-material.module';
import 'hammerjs';
import { HoverbottomcolorDirective } from './shared/hoverbottomcolor.directive';
import { TrendModule } from './trend/product.module';
import { MyCarouselModule} from './carousel/carousel.module';
import {AdminModule} from './admin/admin.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HeadersComponent } from './headers/headers.component';
import { CardComponent } from './card/card.component';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error-interceptor';

// import { McBreadcrumbsModule } from 'ngx-breadcrumbs';


/* import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule
} from '@angular/material'; */

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeadersComponent,
    ErrorComponent,
    CardComponent,
    HoverbottomcolorDirective,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularMaterialForm,
    TrendModule ,
    MyCarouselModule,
    AdminModule,
    BreadcrumbsModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CarouselModule.forRoot().providers,
    TooltipModule.forRoot().providers
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule { }
