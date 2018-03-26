import {observable} from 'mobx'

import {Game} from './Game'
import {RollOfDice} from './RollOfDice'
import { Developement, DevelopementType } from './Developements';

export class UIStore {
    @observable private _diceRoll: RollOfDice;
    
    constructor(game: Game){
        this.diceRoll = new RollOfDice(game.getNbDices(), true/* game.developements.isValidate(DevelopementType.Conduite) */);
	}
	
	public get diceRoll(): RollOfDice {
		return this._diceRoll;
	}
	public set diceRoll(value: RollOfDice) {
		this._diceRoll = value;
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