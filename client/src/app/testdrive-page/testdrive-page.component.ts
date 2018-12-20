import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { TestDriveService } from './testdrive.service';
import { TestDriveCar, TestDrive } from '../shared/interfaces';
import { TestsService } from '../shared/services/tests.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-testdrive-page',
  templateUrl: './testdrive-page.component.html',
  styleUrls: ['./testdrive-page.component.css'],
  providers: [TestDriveService]
})
export class TestdrivePageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("modal") modalRef: ElementRef
  modal: MaterialInstance
  tSub: Subscription
  isRoot: boolean
  loading = false

  constructor(private router:Router,
              private testDrive: TestDriveService,
              private testsService: TestsService) { }

  ngOnInit() {
    this.isRoot = this.router.url === "/testdrive"
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
      this.isRoot = this.router.url === "/testdrive"
      }
    })
  }

  ngOnDestroy() {
    this.modal.destroy()
    if (this.tSub) {
      this.tSub.unsubscribe()
    }
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
