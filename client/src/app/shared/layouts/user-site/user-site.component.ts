import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-site',
  templateUrl: './user-site.component.html',
  styleUrls: ['./user-site.component.css']
})
export class UserSiteComponent  {

  links = [
    {url: '/overview1', name: 'О салоне'},
    {url: '/testdrive1', name: 'Test-Drive'},
    {url: '/categories1', name: 'Автомобили'}
  ]
  
    constructor(private auth: AuthService,
                private router: Router) { 
  }
    
  
    logout(event: Event){
      event.preventDefault()
      this.auth.logOut()
      this.router.navigate(['/login'])
    }

}
