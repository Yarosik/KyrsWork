import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Car } from 'src/app/shared/interfaces';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarsService } from 'src/app/shared/services/cars.servise';

@Component({
  selector: 'app-categories-car',
  templateUrl: './categories-car.component.html',
  styleUrls: ['./categories-car.component.css']
})
export class CategoriesCarComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef
  
  cars:Car[] = []
  loading = false
  modal: MaterialInstance
  form: FormGroup

  constructor(private carsService:CarsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
      /*color: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      about: new FormControl(null, Validators.required),
      imageSrc: new FormControl(null, Validators.required)*/
    })

    this.loading = true
    this.carsService.fetch(this.categoryId).subscribe(cars => {
      this.cars = cars
      this.loading = false
    })
  }

  ngOnDestroy(){
    this.modal.destroy()
  }

  ngAfterViewInit(){
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectCar(car:Car){
    this.modal.open()
  }

  onAddCar(){
   this.modal.open()
  }

  onDeleteCar(car:Car){

  }

  onCancel(){
    this.modal.close()
  }

  onSubmit(){
    this.form.disable()

    const newCar: Car = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    this.carsService.create(newCar).subscribe(
      car => {
        MaterialService.toast('Автомобиль создан')
        this.cars.push(car)
      },
      error =>
      MaterialService.toast(error.error.message),
      () => {
        this.modal.close()
        this.form.enable()
      }
    )
  }
}
