import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements  AfterViewInit {

@ViewChild('floating') floatingRef: ElementRef

links = [
  {url: '/overview', name: 'О салоне'},
  {url: '/analitics', name: 'Аналитика'},
  {url: '/history', name: 'История'},
  {url: '/testdrive', name: 'Test-Drive'},
  {url: '/categories', name: 'Автомобили'}
]

  constructor(private auth: AuthService,
              private router: Router) { 
}
  ngAfterViewInit(){
    MaterialService.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event){
    event.preventDefault()
    this.auth.logOut()
    this.router.navigate(['/login'])
  }

}
