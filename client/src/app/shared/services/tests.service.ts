import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TestDrive } from "../interfaces";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class TestsService {
    constructor(private http: HttpClient) {

    }

    create(testDrive: TestDrive) : Observable<TestDrive>{
        return this.http.post<TestDrive>('/api/testDrive', testDrive)
    }
}