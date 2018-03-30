import {observable} from 'mobx'

import {Game} from './Game'
import {RollOfDice} from './RollOfDice'
import { Developement, DevelopementType } from './Developements';
import {GamePhase} from './RollTTAges'
import {Building} from './Monuments'
import {City} from './City'


export class UIStore {
	@observable private _diceRoll: RollOfDice;
	@observable private _game: Game;
	@observable private _nbWorkerUsed: number;
	@observable private _nbMoneyUsed: number;
	
    constructor(game: Game){
		this.game = game
		this.diceRoll = new RollOfDice(game.getNbDices(), true/* game.developements.isValidate(DevelopementType.Conduite) */);
		this.nbWorkerUsed = 0
		this.nbMoneyUsed = 0
	}

	get result(){
		return this.game.getResult(this.diceRoll.getResult())
	}

	get currentMoney(){
		return this.result.money
	}

	get availableWorkers(){
		return this.result.workers - this.nbWorkerUsed
	}
	get availableMoney(){
		return this.result.money - this.nbMoneyUsed
	}

	buyBuilding(toBuild?: Building | City){
		if(this.availableWorkers > 0){
			if(!toBuild){
				toBuild = this.game.city
			}
			toBuild.build()
			this.nbWorkerUsed++
			if(this.availableWorkers === 0){
				this.game.step3(this.result)
			}
		}
		else {
			throw 'try to build but no more workers'
		}
	}

	resetWorkersUsed(){
		this.nbWorkerUsed = 0
	}
	resetMoneyUsed(){
		this.nbMoneyUsed = 0
	}
	
	public get diceRoll(): RollOfDice {
		return this._diceRoll;
	}
	public set diceRoll(value: RollOfDice) {
		this._diceRoll = value;
	}
	public get game(): Game {
		return this._game;
	}
	public set game(value: Game) {
		this._game = value;
	}
	public get nbWorkerUsed(): number {
		return this._nbWorkerUsed;
	}
	public set nbWorkerUsed(value: number) {
		this._nbWorkerUsed = value;
	}
	public get nbMoneyUsed(): number {
		return this._nbMoneyUsed;
	}
	public set nbMoneyUsed(value: number) {
		this._nbMoneyUsed = value;
	}	
	
}

export class Store {

    @observable private _uiStore: UIStore;
    @observable private _gameStore: Game;

    constructor(){
        this.gameStore = new Game()
        this.uiStore = new UIStore(this.gameStore)
    }

	public get uiStore(): UIStore {
		return this._uiStore;
	}
	public set uiStore(value: UIStore) {
		this._uiStore = value;
	}
	public get gameStore(): Game {
		return this._gameStore;
	}
	public set gameStore(value: Game) {
		this._gameStore = value;
	}
    

}