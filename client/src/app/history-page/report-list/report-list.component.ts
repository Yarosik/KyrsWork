import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { TestDrive } from 'src/app/shared/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() tests: TestDrive[] 
  @ViewChild('modal') modalRef: ElementRef

  selectedTest:TestDrive
  modal:MaterialInstance

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.modal.destroy()

  }
  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)

  }

  computePrice(test:TestDrive): number{
    return test.list.reduce((total, item) =>  {
        return total = item.cost
    }, 0)
  }

  computeName(test:TestDrive): string{
    return test.list.toLocaleString.name
  }

  selectTest(test:TestDrive){
    this.selectedTest = test
    this.modal.open()
  }

  closeModal(){
    this.modal.close()
  }
}
