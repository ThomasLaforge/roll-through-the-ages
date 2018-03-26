import {observable, action} from 'mobx'

import {Dice, DiceFace} from './Dice'

export interface RollOfDiceResult {
	food: number,
	workers: number,
	money: number,
	disasters: number,
	resources: number
}

export class RollOfDice {

    @observable private _dices: Dice[];
    @observable private _autoFinish: boolean;
	@observable private _turn: number;

    constructor(dices: Dice[] | number, autoFinish: boolean, turn = 1, finished = false){
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
	}
	
	getResult() : RollOfDiceResult {
		return {
			food: this.dices.filter(d => d.isFood()).reduce( (sum, d) => sum + d.value, 0),
			workers: this.dices.filter(d => d.isWorker()).reduce( (sum, d) => sum + d.value, 0),
			money: this.dices.filter(d => d.isMoney()).reduce( (sum, d) => sum + d.value, 0),
			disasters: this.dices.filter(d => d.isDisaster()).length,
			resources: this.dices.filter(d => d.isResource()).reduce( (sum, d) => sum + d.value, 0),
		}
	}

	increment(){
		this.turn++
	}

    roll(){
		// • Contrairement au jeu de base, vous pouvez relancer les dés avec des crânes sur eux (comme tout autre dé).
		// this.dices.filter(d => !d.isDisaster())
		this.dices = this.dices.map(d => { d.roll(); return d })
		this.turn++
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
	
	isOver(){
		return this.turn === 3 && this.autoFinish || this.turn === 4
	}

	needResolution(){
		return this.getDiceWhoNeedResolution().length > 0
	}

	getDiceWhoNeedResolution(){
		return this.dices.filter(d => d.currentFace === DiceFace.FoodOrWorker)
	}

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
	public get turn(): number {
		return this._turn;
	}
	public set turn(value: number) {
		this._turn = value;
	}

}