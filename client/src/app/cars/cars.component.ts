import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../shared/interfaces';
import { CategoriesService } from '../shared/services/categories.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  form: FormGroup;
  aSub: Subscription
  
  constructor(private auth: AuthService, 
              private router: Router,
              private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })

    this.route.queryParams.subscribe((params:Params) => {
      if(params['registered']){
        MaterialService.toast('Заходи!!')
      } else if (params['accessDenied']){
        MaterialService.toast('НЕ, ДАВАЙ РЕГАЙСЯ...')
      } else if (params['sessionFailed']) {
        MaterialService.toast('Пожалуйста, войдите в систему заного')
      }
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}
