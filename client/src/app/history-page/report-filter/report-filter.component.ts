import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { Filter, TestDrive } from 'src/app/shared/interfaces';
import { MaterialDatepicker, MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.css']
})
export class ReportFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>()
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


    this.onFilter.emit(filter)
  }

  ngOnDestroy() {

  }

  applyFilter(filter:Filter){
    this.tests = []
  }

  ngAfterViewInit() {

  }

  validate() {
  }

}
