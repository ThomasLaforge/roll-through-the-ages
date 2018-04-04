import {observable} from 'mobx'
import * as _ from 'lodash'

// imports
import {City} from './City'
import {Monuments, Building, BuildingType} from './Monuments'
import {Developements, DevelopementType, Developement} from './Developements'
import {GlobalStock} from './GlobalStock'
import {Stock} from './Stock'
import {RollOfDiceResult, RollOfDice} from './RollOfDice'
import {TasksInterface, GamePhase, NB_GAME_PHASE, NB_ROUND_TO_PLAY} from './RollTTAges'
import { DiceFace } from './Dice';
import {UIStore} from './Store'
// -------

export interface RollOfDiceGameResult extends RollOfDiceResult {}

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
	@observable private _phase: GamePhase;
	@observable public ui: UIStore;
    // @observable private _diceCollection: number;

	constructor(city = new City(), monuments = new Monuments(), developements = new Developements(), stock = new GlobalStock(), disasterCounter = 0, round = 1, phase = GamePhase.Phase_1_Dices){
        this.init(city, monuments, developements, stock, disasterCounter, round, phase)
	}

	init(city = new City(), monuments = new Monuments(), developements = new Developements(), stock = new GlobalStock(), disasterCounter = 0, round = 1, phase = GamePhase.Phase_1_Dices){
		this.city = city
        this.monuments = monuments
        this.developements = developements
		this.disasterCounter = disasterCounter
		this.stock = stock
		this.round = round
		this.phase = phase
	}
	reset(){
		this.init()
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

	goToNextPhase(){
		this.phase++
		if(this.phase >= NB_GAME_PHASE){
			this.phase = 0
			this.round++
		}
	}

	step1(res: RollOfDiceGameResult){
		this.stock.addResources(res.resources)
		if(this.developements.isValidate(DevelopementType.Carrieres) && res.resources > 1 && !this.stock.stoneStock.isFull()){
			this.stock.stoneStock.add()
		}
		
		this.stock.foodStock.add(res.food)
		this.goToNextPhase()
		this.step2(res)
	}

	step2(res: RollOfDiceGameResult){	
		this.nourrish()
		this.handleDisaster(res.disasters)
		this.goToNextPhase()
		let workerAccessible = res.workers
		if(this.developements.isValidate(DevelopementType.Ingénierie)){
			workerAccessible += this.stock.stoneStock.position * 3
		}
		if(workerAccessible === 0){
			this.step3(res)
		}
	}

	step3(res: RollOfDiceGameResult){
		// test worker amount
		// build City
		// build Monuments
		this.goToNextPhase()
		// console.log('after build phase', this.developements.hasAtLeastOneDevBuyable(res.money + this.stock.maxGoldAccessible), res.money + this.stock.maxGoldAccessible)
		let moneyAccessible = res.money + this.stock.maxGoldAccessible
		if(this.developements.isValidate(DevelopementType.Greniers)){
			moneyAccessible += this.stock.foodStock.position * 4 
		}
		
		if(!this.developements.hasAtLeastOneDevBuyable(moneyAccessible)){
			this.step4()
		}
	}
	step4(moneyAccessible?: any, dev?: Developement){
		// Pay : test money + resources
		if(moneyAccessible && dev && moneyAccessible >= dev.cost){
			dev.buy()
		}
		this.goToNextPhase()			
		if(this.developements.isValidate(DevelopementType.Caravanes) || this.stock.isLegalAtEndOfTurn()){
			this.step5()
		}
		
	}

	step5(resourceDiscard?: any){
	// 	if(this.stock.isLegalAtEndOfTurn(resourceDiscard)){
	// 		this.stock.discard(resourceDiscard)
	// 	}
		this.goToNextPhase()
		this.ui.reset()
	}

	getAmountOfMoneyFromDiceResult(res: RollOfDiceResult){
		let multiplicator = this.developements.isValidate(DevelopementType.Invention) ? 12 : 7
		return res.money * multiplicator
	}

	getAmountOfWorkerFromDiceResult(res: RollOfDiceResult){
		let workerAmount = res.workers
		if(this.developements.isValidate(DevelopementType.Maçonnerie)){
			workerAmount +=  + res.dices.filter(d => d.currentFace === DiceFace.Worker || d.currentFace === DiceFace.FoodOrWorker_Worker).length 
		}
		return workerAmount
	}

	getAmountOfFoodFromDiceResult(res: RollOfDiceResult){
		let food = res.food
		if(this.developements.isValidate(DevelopementType.Agriculture)){
			food += res.dices.filter( d => d.currentFace === DiceFace.Food || d.currentFace === DiceFace.FoodOrWorker_Food).length
		}
		return food
	}

    incrementDisaster(quantity: number){
        this.disasterCounter += quantity
	}

	getBonusScore(){
		let bonus = 0
		if(this.developements.isValidate(DevelopementType.Empire)){
			bonus += this.city.getNbDiceAccessible() * 1
		}
		if(this.developements.isValidate(DevelopementType.Architecture)){
			bonus += this.monuments.getBuildingsValidate().length * 1
		}
		return bonus
	}

	getResult(res: RollOfDiceResult): RollOfDiceGameResult {
		return Object.assign(res, {
			food: this.getAmountOfFoodFromDiceResult(res),
			money: this.getAmountOfMoneyFromDiceResult(res),
			workers: this.getAmountOfWorkerFromDiceResult(res)
		})
	}

	getDevelopmentsScore(){
		return this.developements.getDevelopmentsScore()
	}

	getMonumentsScore(){
		return this.monuments.getBuildingsScore()
	}

	get score(){
		let score = 0
		// developements
		score += this.getDevelopmentsScore()
		// monuments
		score += this.getMonumentsScore()
		// bonus
		score += this.getBonusScore()
		// desastres
		score -= this.disasterCounter
		return score
	}

	isOver(){
		return this.round > NB_ROUND_TO_PLAY
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
	public get phase(): GamePhase {
		return this._phase;
	}
	public set phase(value: GamePhase) {
		this._phase = value;
	}
    
}