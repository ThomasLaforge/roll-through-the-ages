import {observable} from 'mobx'
import * as _ from 'lodash'

// imports
import {City} from './City'
import {Monuments} from './Monuments'
import {Developements} from './Developements'
import {GlobalStock} from './GlobalStock'
import {RollOfDice} from './RollOfDice'
// -------

export class Game {

    @observable private _city: City;
    @observable private _monuments: Monuments;
    @observable private _developements: Developements;
    @observable private _disasterCounter: number;
    @observable private _stock: GlobalStock;
    // @observable private _diceCollection: number;

	constructor(city = new City(), monuments = new Monuments(), developements = new Developements(), stock = new GlobalStock(), disasterCounter = 0){
        this.city = city
        this.monuments = monuments
        this.developements = developements
		this.disasterCounter = disasterCounter
		this.stock = stock
    }

    incrementDisaster(quantity){
        this.disasterCounter
	}

    // Getters / Setters
	public get city(): City {
		return this._city;
	}
	public set city(value: City) {
		this._city = value;
	}
	public get monuments(): Monuments {
		return this._monuments;
	}
	public set monuments(value: Monuments) {
		this._monuments = value;
	}
	public get developements(): Developements {
		return this._developements;
	}
	public set developements(value: Developements) {
		this._developements = value;
	}
	public get disasterCounter(): number {
		return this._disasterCounter;
	}
	public set disasterCounter(value: number) {
		this._disasterCounter = value;
	}
	public get stock(): GlobalStock {
		return this._stock;
	}
	public set stock(value: GlobalStock) {
		this._stock = value;
	}
	// public get diceCollection(): number {
	// 	return this._diceCollection;
	// }
	// public set diceCollection(value: number) {
	// 	this._diceCollection = value;
	// }
    
}