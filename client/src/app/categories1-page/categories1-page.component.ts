import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../shared/interfaces';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'app-categories1-page',
  templateUrl: './categories1-page.component.html',
  styleUrls: ['./categories1-page.component.css']
})
export class Categories1PageComponent implements OnInit {
  
  categories$: Observable<Category[]>
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch()
  }

}
