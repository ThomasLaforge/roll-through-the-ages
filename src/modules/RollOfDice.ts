import {observable, action} from 'mobx'

import {Dice, DiceFace} from './Dice'

export interface RollOfDiceResult {
	food: number,
	workers: number,
	money: number,
	disasters: number,
	resources: number,
	dices: Dice[]
}

export class RollOfDice {

    @observable private _dices: Dice[];
    @observable private _autoFinish: boolean;
	@observable private _turn: number;
	@observable private _validated: boolean;
	@observable private _hasRollOneMore: boolean;

    constructor(dices: Dice[] | number, autoFinish: boolean, turn = 1, validated = false, hasRollOnMore = false){
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
		this.validated = validated
	}
	
	getResult() : RollOfDiceResult {
		return {
			food: this.dices.filter(d => d.isFood()).reduce( (sum, d) => sum + d.value, 0),
			workers: this.dices.filter(d => d.isWorker()).reduce( (sum, d) => sum + d.value, 0),
			money: this.dices.filter(d => d.isMoney()).length,
			disasters: this.dices.filter(d => d.isDisaster()).length,
			resources: this.dices.filter(d => d.isResource()).reduce( (sum, d) => sum + d.value, 0),
			dices: this.dices
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
		this.hasRollOneMore = true
	}
	
	isOver(){
		return this.turn === 3
	}

	needResolution(){
		return this.getDiceWhoNeedResolution().length > 0
	}

	getDiceWhoNeedResolution(){
		return this.dices.filter(d => d.needResolution())
	}

	validate(){
		this.validated = true
	}

	isValidate(){
		return this.validated
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
	public get validated(): boolean {
		return this._validated;
	}
	public set validated(value: boolean) {
		this._validated = value;
	}
	public get hasRollOneMore(): boolean {
		return this._hasRollOneMore;
	}
	public set hasRollOneMore(value: boolean) {
		this._hasRollOneMore = value;
	}
	
}