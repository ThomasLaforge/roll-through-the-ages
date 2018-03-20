import {observable} from 'mobx'

import {Dice} from './Dice'

export class RollOfDice {

    @observable private _dices: Dice[];
    @observable private _autoFinished: boolean;
    @observable private _finished: boolean;

    constructor(dices: Dice[], autoFinished: boolean, finished = false){
        this.dices = dices
        this.autoFinished = autoFinished
        this.finished = finished
    }

    roll(){
        
    }

    rollOneAgain(indexOfDice: number){

    }

	public get dices(): Dice[] {
		return this._dices;
	}
	public set dices(value: Dice[]) {
		this._dices = value;
	}
	public get autoFinished(): boolean {
		return this._autoFinished;
	}
	public set autoFinished(value: boolean) {
		this._autoFinished = value;
	}
	public get finished(): boolean {
		return this._finished;
	}
	public set finished(value: boolean) {
		this._finished = value;
	}

}