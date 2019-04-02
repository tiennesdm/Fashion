import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
// import {MenComponent} from './trend/men/men.component';
 // import { WomenComponent } from './trend/women/women.component';
import {CreateComponent} from './admin/create/create.component';
import {ListComponent} from './admin/list/list.component';
import {AuthGuardGuard} from './auth/auth-guard.guard';
import {CardComponent} from './card/card.component';
// import { TrendModule } from './trend/trend.module';
import {ItemResolver} from './resolver/item.resolver';
import {AnotherItemResolver} from './resolver/application.resolver';
const routes: Routes = [
 // { path: '', component: MenComponent },
//  { path: 'men', component: MenComponent },
  { path: 'login', component: LoginComponent ,
  data: { breadcrumbs: 'Login' },
},
//  {path: 'women' , component: WomenComponent},
 { path: '', redirectTo: 'men', pathMatch: 'full' },
// { path: 'trend', loadChildren: './trend/trend.module#TrendModule',
// },
/*{
  path: 'admin', loadChildren: './admin/admin.module/#AdminModule',
},*/
  { path: 'card', component: CardComponent, data: { breadcrumbs: 'Card' } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes ) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
