import {BuildingType} from './Monuments'

const NB_ROUND_TO_PLAY = 10

export interface MonumentTasksInterface {
    type: BuildingType,
    quantity: number
}

export interface TasksInterface {
    city: number,
    monuments: MonumentTasksInterface[] 
}