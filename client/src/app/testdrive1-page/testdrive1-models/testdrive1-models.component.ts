import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/shared/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { CarsService } from 'src/app/shared/services/cars.servise';
import { TestDrive1Service } from '../testdrive1.service';
import { switchMap, map } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { TestDriveService } from 'src/app/testdrive-page/testdrive.service';

@Component({
  selector: 'app-testdrive1-models',
  templateUrl: './testdrive1-models.component.html',
  styleUrls: ['./testdrive1-models.component.css']
})
export class Testdrive1ModelsComponent implements OnInit {

  cars$: Observable<Car[]>

  constructor(private route: ActivatedRoute,
              private carsService: CarsService,
              private testDrive: TestDrive1Service) { }

  ngOnInit() {
   this.cars$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.carsService.fetch(params['id'])
          }
        ),
        map(
          (cars: Car[])=> {
            return cars.map(car => { 
              return car
            })
          }
        )
      )
  }

  addToTestDrive(car: Car){
    MaterialService.toast(`Выбран автомобиль ${car.name} по цене  ${car.cost} грн`)
    this.testDrive.add(car)
  }


}
