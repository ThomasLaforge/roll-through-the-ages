import {observable} from 'mobx'

export class City {

    @observable private _nbJobsDone: number;

	constructor(initalNbJobs = 0) {
        this.nbJobsDone = initalNbJobs
	}
    
    getNbDiceAccessible(){
        let nbDice = 3
        let nbJobsDone = this.nbJobsDone;

        while(nbJobsDone >= nbDice){
            nbJobsDone -= nbDice
            nbDice++
        }
        
        return nbDice
    }

	public get nbJobsDone(): number {
		return this._nbJobsDone;
	}
	public set nbJobsDone(value: number) {
		this._nbJobsDone = value;
	}
    
}