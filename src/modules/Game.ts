import {observable} from 'mobx'
import * as _ from 'lodash'

// imports
import {City} from './City'
import {Monuments} from './Monuments'
import {Developements} from './Developements'
import {GlobalStock} from './GlobalStock'
import {Stock} from './Stock'
import {RollOfDice} from './RollOfDice'
// -------

export class Game {

// 	Utilisez les règles de base ci-dessus avec les modifications suivantes :
// • Jouez 10 manches et essayez d’obtenir le plus de points que vous pouvez.
// • Utilisez tous les monuments.
// • La peste vous affecte si elle se produit (à moins que vous ayez la médecine).
// • La religion empêche les effets de la révolte.
// • Contrairement au jeu de base, vous pouvez relancer les dés avec des crânes sur eux (comme tout autre dé).


    @observable private _city: City;
    @observable private _monuments: Monuments;
    @observable private _developements: Developements;
    @observable private _disasterCounter: number;
	@observable private _stock: GlobalStock;
	@observable private _round: number;
    // @observable private _diceCollection: number;

	constructor(city = new City(), monuments = new Monuments(), developements = new Developements(), stock = new GlobalStock(), disasterCounter = 0, round = 1){
        this.city = city
        this.monuments = monuments
        this.developements = developements
		this.disasterCounter = disasterCounter
		this.stock = stock
	}

	getNbDices(){
		return this.city.getNbDiceAccessible()
	}

	getFoodAndResourcesFromRoll(roll: RollOfDice){
		let dices = roll.dices
		// let foodQuantity = dices.filter(d => d.isFood()).reduce( (sum, d) => sum + d.value, 0)
		let foodQuantity = 10
		this.stock.foodStock.add(foodQuantity)
		// TODO: Resources
		// let resourceQuantity = dices.filter(d => d.isResources()).reduce( (sum, d) => sum + d.value, 0)
		let resourceQuantity = 3
		this.stock.addResources(resourceQuantity)
	}

	nourrish(){
		let newStockValue = this.stock.foodStock.value - this.getNbDices()
		if(newStockValue >= 0){
			this.stock.foodStock.position = newStockValue
		}
		else {
			this.stock.foodStock.position = 0
			this.incrementDisaster(-newStockValue)
		}
	}

    incrementDisaster(quantity: number){
        this.disasterCounter += quantity
	}

	resolveRoll(roll){
		console.log('resolve roll', roll)
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
	public get round(): number {
		return this._round;
	}
	public set round(value: number) {
		this._round = value;
	}
	// public get diceCollection(): number {
	// 	return this._diceCollection;
	// }
	// public set diceCollection(value: number) {
	// 	this._diceCollection = value;
	// }
    
}