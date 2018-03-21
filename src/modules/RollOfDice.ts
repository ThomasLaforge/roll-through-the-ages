import {observable, action} from 'mobx'

import {Dice} from './Dice'

export class RollOfDice {

    @observable private _dices: Dice[];
    @observable private _autoFinish: boolean;
	@observable private _finished: boolean;
	@observable private _turn: number;

    constructor(dices: Dice[] | number, autoFinish: boolean, turn = 0, finished = false){
		if(!Array.isArray(dices)){
			let i = dices
			dices = []
			while(i > 0){
				dices.push(new Dice())
				i--
			}
		}
        this.dices = dices 
		this.autoFinish = autoFinish
		this.turn = turn
        this.finished = finished
	}
	
	getResult(){
		return this.dices
	}

	stop(){
		this.finished = true
	}

	increment(){
		this.turn++
	}

    roll(){
		// • Contrairement au jeu de base, vous pouvez relancer les dés avec des crânes sur eux (comme tout autre dé).
		// this.dices.filter(d => !d.isDisaster())
		this.dices = this.dices.map(d => { d.roll(); return d })
		this.turn++
		if(this.turn === 2 && this.autoFinish){
			this.stop()
		}
	}
	
	freezeFirst(){
		this.freeze(this.dices[0])
	}
	freeze(dice: Dice){
		dice.freeze()
	}

    rollOneAgain(dice: Dice){
		dice.unFreeze()
		dice.roll()
	}
	
	// getFood(){
	// 	this.
	// }

	public get dices(): Dice[] {
		return this._dices;
	}
	public set dices(value: Dice[]) {
		this._dices = value;
	}
	public get autoFinish(): boolean {
		return this._autoFinish;
	}
	public set autoFinish(value: boolean) {
		this._autoFinish = value;
	}
	public get finished(): boolean {
		return this._finished;
	}
	public set finished(value: boolean) {
		this._finished = value;
	}
	public get turn(): number {
		return this._turn;
	}
	public set turn(value: number) {
		this._turn = value;
	}

}