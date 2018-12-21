import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarsComponent } from './cars/cars.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AnaliticsPageComponent } from './analitics-page/analitics-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { TestdrivePageComponent } from './testdrive-page/testdrive-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import { CategoriesCarComponent } from './categories-page/categories-form/categories-car/categories-car.component';
import { TestdriveMarksComponent } from './testdrive-page/testdrive-marks/testdrive-marks.component';
import { TestdriveModelsComponent } from './testdrive-page/testdrive-models/testdrive-models.component';
import { TestFilterComponent } from './testdrive-page/test-filter/test-filter.component';
import { ReportListComponent } from './history-page/report-list/report-list.component';
import { ReportFilterComponent } from './history-page/report-filter/report-filter.component';




@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    PageNotFoundComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    AnaliticsPageComponent,
    HistoryPageComponent,
    TestdrivePageComponent,
    CategoriesPageComponent,
    LoaderComponent,
    CategoriesFormComponent,
    CategoriesCarComponent,
    TestdriveMarksComponent,
    TestdriveModelsComponent,
    TestFilterComponent,
    ReportListComponent,
    ReportFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
