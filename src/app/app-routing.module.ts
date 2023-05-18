import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthComponent} from "./auth/auth.component";
import {canActivate} from "./services/auth/auth-guard-service.guard";

const routes: Routes = [
  {path: '', canActivate: [canActivate], component: HomeComponent},
  {path: 'login', component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
