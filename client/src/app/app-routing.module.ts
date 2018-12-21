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
import { TestdriveMarksComponent } from './testdrive-page/testdrive-marks/testdrive-marks.component';
import { TestdriveModelsComponent } from './testdrive-page/testdrive-models/testdrive-models.component';
import { CarsComponent } from './cars/cars.component';
import { UserSiteComponent } from './shared/layouts/user-site/user-site.component';
import { Overview1PageComponent } from './overview1-page/overview1-page.component';
import { Categories1PageComponent } from './categories1-page/categories1-page.component';
import { Categories1FormComponent } from './categories1-page/categories1-form/categories1-form.component';
import { Testdrive1PageComponent } from './testdrive1-page/testdrive1-page.component';
import { Testdrive1MarksComponent } from './testdrive1-page/testdrive1-marks/testdrive1-marks.component';
import { Testdrive1ModelsComponent } from './testdrive1-page/testdrive1-models/testdrive1-models.component';




const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: 'admin', component: CarsComponent },
    ]
  },

  //USER
  {
    path: '', component: UserSiteComponent, canActivate: [AuthGuard], children: [
      { path: 'overview1', component: Overview1PageComponent },
      {
        path: 'testdrive1', component: Testdrive1PageComponent, children: [
          { path: '', component: Testdrive1MarksComponent },
          { path: ':id', component: Testdrive1ModelsComponent }
        ]
      },
      { path: 'marks1', component: Categories1PageComponent },
      { path: 'marks1/new', component: Categories1FormComponent },
      { path: 'marks1/:id', component: Categories1FormComponent }
    ]
  },

  //ADMIN
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'overview', component: OverviewPageComponent },
      { path: 'analitics', component: AnaliticsPageComponent },
      { path: 'report', component: HistoryPageComponent },
      {
        path: 'testdrive', component: TestdrivePageComponent, children: [
          { path: '', component: TestdriveMarksComponent },
          { path: ':id', component: TestdriveModelsComponent }
        ]
      },
      { path: 'marks', component: CategoriesPageComponent },
      { path: 'marks/new', component: CategoriesFormComponent },
      { path: 'marks/:id', component: CategoriesFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
