import {observable} from 'mobx'
import * as _ from 'lodash'

// imports
import {City} from './City'
import {Monuments, Building, BuildingType} from './Monuments'
import {Developements, DevelopementType} from './Developements'
import {GlobalStock} from './GlobalStock'
import {Stock} from './Stock'
import {RollOfDiceResult, RollOfDice} from './RollOfDice'
import {TasksInterface} from './RollTTAges'
// -------

export class Game {

// 	Utilisez les règles de base ci-dessus avec les modifications suivantes :
// • Jouez 10 manches et essayez d’obtenir le plus de points que vous pouvez.
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
		this.round = round
	}

	getNbDices(){
		return this.city.getNbDiceAccessible()
	}

	handleDisaster(nbDisaster: number){
		let loseResources = false
		if(nbDisaster === 2 && !this.developements.isValidate(DevelopementType.Irrigation)){
			this.incrementDisaster(2)
		}
		if(nbDisaster === 3 && !this.developements.isValidate(DevelopementType.Medecine)){
			this.incrementDisaster(3)
		}
		if(nbDisaster === 4 && !this.monuments.isBuilt(BuildingType.MurailleDeChine)){
			this.incrementDisaster(4)
		}
		if(nbDisaster >= 5 && !this.developements.isValidate(DevelopementType.Religion)){
			loseResources = true
			this.stock.loseAllResources()
		}
		return loseResources
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

	step1(res: RollOfDiceResult){
		this.stock.addResources(res.resources)
		this.stock.foodStock.add(res.food)		
	}

	step2(res: RollOfDiceResult){	
		this.nourrish()
		this.handleDisaster(res.disasters)
	}

	step3(tasks: TasksInterface, workerAmount: number){
		// test worker amount
		// build City
		// build Monuments
	}

	step4(devType: DevelopementType, money: any){
		// Pay : test money + resources

		// validate dev
		this.developements.getDev(devType).buy()
	}

	step5(resourceDiscard?: any){
	// 	if(this.stock.isLegalAtEndOfTurn(resourceDiscard)){
	// 		this.stock.discard(resourceDiscard)
	// 	}
	}

    incrementDisaster(quantity: number){
        this.disasterCounter += quantity
	}

	getBonusScore(){
		let bonus = 0
		return bonus
	}

	score(){
		let score = 0
		// developements
		score += this.developements.getDevelopmentsScore()
		// monuments
		score += this.monuments.getBuildingsScore()
		// bonus
		score += this.getBonusScore()
		// desastres
		score -= this.disasterCounter
		return score
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