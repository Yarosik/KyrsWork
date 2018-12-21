import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Filter, TestDrive } from 'src/app/shared/interfaces';
import { MaterialService, MaterialDatepicker } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-test-filter',
  templateUrl: './test-filter.component.html',
  styleUrls: ['./test-filter.component.css']
})
export class TestFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>()
  @ViewChild("start") startRef: ElementRef
  @ViewChild("end") endRef: ElementRef

  start: MaterialDatepicker
  end: MaterialDatepicker
  test: number
  tests: TestDrive[] = []

  isValid = true
  
  
  constructor() { }

  ngOnInit() {
  }

  submitFilter(){
    const filter: Filter = {}

    if (this.test) {
      filter.test = this.test
    }

    if(this.start.date) {
      filter.start = this.start.date
    }

    if(this.end.date) {
      filter.end = this.end.date
    }

    this.onFilter.emit(filter)
  }

  ngOnDestroy() {
    this.start.destroy()
    this.end.destroy()
  }

  applyFilter(filter:Filter){
    this.tests = []
  }

  ngAfterViewInit() {
   this.start =  MaterialService.initDatepicker(this.startRef, this.validate.bind(this))
   this.end =  MaterialService.initDatepicker(this.endRef, this.validate.bind(this))
  }

  validate() {
    if(!this.start.date || !this.end.date ) {
      this.isValid = true
      return 
    }
    this.isValid = this.start.date < this.end.date
  }

}
