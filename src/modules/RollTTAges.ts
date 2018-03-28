import {BuildingType} from './Monuments'

export const NB_ROUND_TO_PLAY = 10

export interface MonumentTasksInterface {
    type: BuildingType,
    quantity: number
}

export interface TasksInterface {
    city: number,
    monuments: MonumentTasksInterface[] 
}

export enum GamePhase {
    Phase_1_Dices,
    Phase_2_Food_And_Disasters,
    Phase_3_City_And_Monuments,
    Phase_4_Developement,
    Phase_5_Disacard_Resources
}