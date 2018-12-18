import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Category } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-testdrive-marks',
  templateUrl: './testdrive-marks.component.html',
  styleUrls: ['./testdrive-marks.component.css']
})
export class TestdriveMarksComponent implements OnInit {

  categories$: Observable<Category[]>

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch()
  }

}
