import { observable } from "mobx";

export interface HistoryLine {
    total: number, 
    developements: number,
    monuments: number, 
    bonus: number,
    disasters: number, 
    date: number
}

export class History {
    @observable public lines: HistoryLine[];

    constructor(){
        this.load()
    }

    load(){
        this.lines = localStorage.getItem('historyLines') ? JSON.parse(localStorage.getItem('historyLines')) : []
    }

    add(newLine: HistoryLine){
        localStorage.setItem('historyLines', JSON.stringify(this.lines.concat(newLine)))
        this.load()
    }

    reset(){
        localStorage.clear()
        this.load()
    }

    getLinesOrderedByScore(){
        return this.lines.sort( (a, b) => b.total - a.total)
    }

    getFiveBests(){
        return this.getLinesOrderedByScore().slice(0, 5)
    }
}