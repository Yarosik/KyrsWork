import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Car } from 'src/app/shared/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarsService } from 'src/app/shared/services/cars.servise';

@Component({
  selector: 'app-categories1-car',
  templateUrl: './categories1-car.component.html',
  styleUrls: ['./categories1-car.component.css']
})
export class Categories1CarComponent implements OnInit {

  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef

  cars: Car[] = []
  loading = false
  modal: MaterialInstance
  form: FormGroup
  carId = null

  constructor(private carsService: CarsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)]),
      color: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      about: new FormControl(null, Validators.required)
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

  ngOnDestroy() {
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectCar(car: Car) {
    this.carId = car._id
    this.form.patchValue({
      name: car.name,
      cost: car.cost,
      color: car.color,
      country: car.country,
      date: car.date,
      about: car.about,
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onAddCar() {
    this.carId = null
    this.form.reset({
      name: null,
      cost: 1,
      color: null,
      country: null,
      date: null,
      about: null
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onDeleteCar(event: Event, car: Car) {
    event.stopPropagation()

    const decision = window.confirm(`Удалить модель "${car.name}"?`)

    if (decision) {
      this.carsService.delete(car).subscribe(
        response => {
          const idx = this.cars.findIndex(c => c._id === car._id)
          this.cars.splice(idx, 1)
          MaterialService.toast(response.message)
        },
        error =>
          MaterialService.toast(error.error.message)
      )
    }
  }

  onCancel() {
    this.modal.close()
  }

  onSubmit() {
    this.form.disable()

    const newCar: Car = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      color: this.form.value.color,
      country: this.form.value.country,
      date: this.form.value.date,
      about: this.form.value.about,
      category: this.categoryId
    }

    const completed = () => {
      this.modal.close()
      this.form.reset({ name: '', cost: 1 })
      this.form.enable()
    }

    if (this.carId) {
      newCar._id = this.carId
      this.carsService.update(newCar).subscribe(
        car => {
          const idx = this.cars.findIndex(c => c._id === car._id)
          this.cars[idx] = car
          MaterialService.toast('Автомобиль изменён')
        },
        error =>
          MaterialService.toast(error.error.message),
        completed
      )
    } else {
      this.carsService.create(newCar).subscribe(
        car => {
          MaterialService.toast('Автомобиль создан')
          this.cars.push(car)
        },
        error =>
          MaterialService.toast(error.error.message),
        completed
      )

    }
  }

}
