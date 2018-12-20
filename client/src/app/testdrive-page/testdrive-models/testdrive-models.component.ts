import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CarsService } from 'src/app/shared/services/cars.servise';
import { Observable } from 'rxjs';
import { Car } from 'src/app/shared/interfaces';
import { switchMap, map } from 'rxjs/operators';
import { TestDriveService } from '../testdrive.service';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-testdrive-models',
  templateUrl: './testdrive-models.component.html',
  styleUrls: ['./testdrive-models.component.css']
})
export class TestdriveModelsComponent implements OnInit {

  cars$: Observable<Car[]>

  constructor(private route: ActivatedRoute,
              private carsService: CarsService,
              private testDrive: TestDriveService) { }

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
