import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-testdrive1-marks',
  templateUrl: './testdrive1-marks.component.html',
  styleUrls: ['./testdrive1-marks.component.css']
})
export class Testdrive1MarksComponent implements OnInit {

  categories$: Observable<Category[]>

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch()
  }

}
