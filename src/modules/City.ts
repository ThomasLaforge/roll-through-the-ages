import {observable} from 'mobx'

export class City {

    @observable private _nbJobsDone: number;
    @observable private _maxDices: number;
    @observable private _freeDices: number;

	constructor(initalNbJobs = 0, maxDices = 7, freeDices = 3) {
        this.nbJobsDone = initalNbJobs
        this.maxDices = maxDices
        this.freeDices = freeDices
	}
    
    getNbDiceAccessible(){
        let nbDice = this.freeDices
        let nbJobsDone = this.nbJobsDone;

        while(nbJobsDone >= nbDice && nbDice <= this.maxDices){
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
	public get maxDices(): number {
		return this._maxDices;
	}
    public set maxDices(value: number) {
		this._maxDices = value;
	}
	public get freeDices(): number {
		return this._freeDices;
	}
	public set freeDices(value: number) {
		this._freeDices = value;
	}
    
    
}