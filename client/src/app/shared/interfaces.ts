export interface User {
    email: string
    password: string
}

export interface Category {
    name: string
    imageSrc?: string
    user?: string
    _id?: string
}

export interface Message {
    message: string
}

export interface Car {
    name: string
    about?: string
    imageSrc?:string
    cost: number
    color?:string
    country?:string
    date?:string
    user?:string
    category:string
    _id?: string
    dat?: Date
}

export interface TestDrive {
    date?: Date
    test?: number
    user?: string
    list: TestDriveCar[]
    _id?: string
}

export interface TestDriveCar {
    name: string
    cost: number
    dat: Date
    _id?: string
}

export interface Filter {
    start?: Date
    end?:Date
    test?: number
}