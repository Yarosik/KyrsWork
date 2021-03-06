import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Car, Message } from "../interfaces";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CarsService {
    constructor(private http: HttpClient) {
    }

    fetch(categoryId: string): Observable<Car[]> {
        return this.http.get<Car[]>(`/api/cars/${categoryId}`)
    }

    create(car: Car): Observable<Car> {
        return this.http.post<Car>('/api/cars', car)
    }

    update(car: Car): Observable<Car> {
        return this.http.patch<Car>(`/api/cars/${car._id}`, car)
    }

    delete(car: Car): Observable<Message> {
        return this.http.delete<Message>(`/api/cars/${car._id}`)
    }
}