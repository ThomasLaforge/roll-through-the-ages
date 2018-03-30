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

export const NB_GAME_PHASE = 5
export enum GamePhase {
    Phase_1_Dices,
    Phase_2_Food_And_Disasters,
    Phase_3_City_And_Monuments,
    Phase_4_Developement,
    Phase_5_Disacard_Resources
}

export class Stringifier {

    static getGamePhaseName(gp: GamePhase){
        switch (gp) {
            case GamePhase.Phase_1_Dices:
                return 'Dices'
            case GamePhase.Phase_2_Food_And_Disasters:
                return 'Food and disasters'
            case GamePhase.Phase_3_City_And_Monuments:
                return 'City and monuments'
            case GamePhase.Phase_4_Developement:
                return 'Developement'
            case GamePhase.Phase_5_Disacard_Resources:
                return 'Disacard resources'
            default:
                throw "GamePhase has no name";
        }
    }

    static getGamePhaseDescription(gp: GamePhase){
        switch (gp) {
            case GamePhase.Phase_1_Dices:
                return 'Lancer les dés et récupérer les marchandises et la Nourriture'
            case GamePhase.Phase_2_Food_And_Disasters:
                return 'Alimenter les villes et résoudre les désastres'
            case GamePhase.Phase_3_City_And_Monuments:
                return 'Construire les villes et/ou les monuments'
            case GamePhase.Phase_4_Developement:
                return 'Acheter au maximum un développement'
            case GamePhase.Phase_5_Disacard_Resources:
                return 'Défausser les marchandises au-delà de six'
            default:
                throw "GamePhase has no description";
        }
    }
}