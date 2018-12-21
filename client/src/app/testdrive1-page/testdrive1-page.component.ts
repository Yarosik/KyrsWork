import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { TestDriveService } from '../testdrive-page/testdrive.service';
import { TestsService } from '../shared/services/tests.service';
import { TestDrive1Service } from './testdrive1.service';
import { Filter, TestDriveCar, TestDrive } from '../shared/interfaces';

@Component({
  selector: 'app-testdrive1-page',
  templateUrl: './testdrive1-page.component.html',
  styleUrls: ['./testdrive1-page.component.css'],
  providers: [TestDrive1Service]
})
export class Testdrive1PageComponent implements OnInit {

  @ViewChild("modal") modalRef: ElementRef
  

 
  modal: MaterialInstance
  tSub: Subscription
  isRoot: boolean
  loading = false

  constructor(private router:Router,
              private testDrive: TestDrive1Service,
              private testsService: TestsService) { }

  ngOnInit() {
    this.isRoot = this.router.url === "/testdrive1"
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
      this.isRoot = this.router.url === "/testdrive1"
      }
    })
  }

  ngOnDestroy() {
    this.modal.destroy()
    if (this.tSub) {
      this.tSub.unsubscribe()
    }
  }

  applyFilter(filter:Filter){

  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)

  }

  removeCar(testDriveCar: TestDriveCar){
    this.testDrive.remove(testDriveCar)
  }

  open(){
    this.modal.open()
  }

  cancel(){
    this.modal.close()
  }

  submit(){
    this.loading = true
    const testDrive: TestDrive = {
      list: this.testDrive.list.map(item => {
        delete item._id
        return item
      })
    }

    this.tSub = this.testsService.create(testDrive).subscribe(
      newTest => {
        MaterialService.toast(`Запись осуществленна. Её номер ${newTest.test}. Приходите, ждем.`)
        this.testDrive.clear()
      },
      error => MaterialService.toast(error.error.message),
       () => {
        this.modal.close()
        this.loading = false
       }
    )
  }
}
