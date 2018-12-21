import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Car, Message } from "../interfaces";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CarsService {
    constructor(private http:HttpClient){
    }

    fetch(categoryId:string): Observable<Car[]>{ 
       return this.http.get<Car[]>(`/api/cars/${categoryId}`)
    }

    getById(id:string) : Observable<Car> {
        return this.http.get<Car>(`/api/cars/${id}`)
    }

    create(car:Car):Observable<Car> {
    return this.http.post<Car>('/api/cars', car)
    }

    update(id: string, name: string, image: File): Observable<Car> {

        const fd = new FormData()

        if(image) {
            fd.append('image', image, image.name)
        }
        fd.append('name', name)

       return this.http.patch<Car>(`/api/cars/${id}`, fd)
    }

    delete(id: string): Observable<Message>{
        return this.http.delete<Message>(`/api/cars/${id}`)
    }
}