import { Injectable } from "@angular/core";
import { Car, TestDriveCar } from "../shared/interfaces";

@Injectable()
export class TestDriveService {

    public list: TestDriveCar[] = []
    public dat = Date.now()

    add(car: Car) {
        const testDriveCar: TestDriveCar = Object.assign({}, {
            name: car.name,
            cost: car.cost,
            dat: car.dat,
            _id: car._id
        })

        this.list.push(testDriveCar)
        
    }

    remove(testDriveCar:TestDriveCar) { 
        const idx = this.list.findIndex(c => c._id === testDriveCar._id)
        this.list.splice(idx,1)
    }

    clear() { 
        this.list = []
    }
}