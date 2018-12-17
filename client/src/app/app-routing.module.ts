import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AnaliticsPageComponent } from './analitics-page/analitics-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { TestdrivePageComponent } from './testdrive-page/testdrive-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import { CategoriesCarComponent } from './categories-page/categories-form/categories-car/categories-car.component';


const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [     
    { path: 'overview', component: OverviewPageComponent},
    { path: 'analitics', component: AnaliticsPageComponent},
    { path: 'history', component: HistoryPageComponent},
    { path: 'testdrive', component: TestdrivePageComponent},
    { path: 'marks', component: CategoriesPageComponent},
    { path: 'marks/new', component: CategoriesFormComponent},
    { path: 'marks/:id', component: CategoriesFormComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
