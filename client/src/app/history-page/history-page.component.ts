import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Filter, TestDrive } from '../shared/interfaces';
import { TestsService } from '../shared/services/tests.service';
import { Subscription } from 'rxjs';

const STEP = 2

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("tooltip") tooltipRef: ElementRef
  tooltip: MaterialInstance
  oSub: Subscription
  isFilterVisible = false
  tests: TestDrive[] = []
  filter: Filter = {}

  offset = 0
  limit = STEP
  loading = false
  reloading = false
  noMore = false

  constructor(private testsService: TestsService) { }

  ngOnInit() {
    this.reloading = true
    this.fetch()
  }

  private fetch(){
   
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    })
    this.oSub = this.testsService.fetch(params).subscribe(tests => {
      this.tests = this.tests.concat(tests)
      this.noMore = tests.length < STEP
      this.loading = false
      this.reloading = false
    })
  }

  ngOnDestroy() {
    this.tooltip.destroy()
    this.oSub.unsubscribe()
  }

  applyFilter(filter:Filter){
    this.tests = []
    this.offset = 0
    this.filter = filter
    this.reloading = true
    this.fetch()
  }

  loadMore(){
    this.offset += STEP
    this.fetch()
    this.loading = true
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

}
