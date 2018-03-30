import {observable} from 'mobx'

interface jsonMonument {
	cost: number,
	pointsFirst: number,
	pointsThen: number,
	name: string,
	type: number
	power?: BuildingPower
}

export enum BuildingType {
	PyramideduLouvre,
	Accropole,
	EgliseDeRome,
	MurailleDeChine,
	Obelisque,
	Cathédrale,
	PyramideEgypte
}

export enum BuildingPower {
	CounterEvasion
}

export class Building {
    @observable private _points: number;
    @observable private _nbWorker: number;
	@observable private _nbNeededWorker: number;
	@observable private _type: BuildingType;
	@observable private _power: BuildingPower;

// Solo: Utilisez tous les Buildings.

    constructor(type: BuildingType, points: number, nbNeededWorker: number, power?: BuildingPower, nbWorker = 0){
        this.points = points
        this.nbWorker = nbWorker
		this.nbNeededWorker = nbNeededWorker
		this.type = type
		this.power = power
    }

    getPercentBuilt(){
        return this.nbWorker / this.nbNeededWorker * 100
	}
	
	isBuilt(){
		return this.nbWorker === this.nbNeededWorker
	}

	build(nbPartsBuilt: number = 1){
		// console.log('build', this.nbWorker, nbPartsBuilt)
		this.nbWorker += nbPartsBuilt
		if(this.nbWorker > this.nbNeededWorker){
			this.nbWorker = this.nbNeededWorker
		}
	}
	
	get name(){
		switch (this.type) {
			case BuildingType.Accropole:
				return "Accropole"
			case BuildingType.PyramideduLouvre:
				return "Pyramide du Louvre"
			case BuildingType.EgliseDeRome:
				return "Eglise de Rome"
			case BuildingType.MurailleDeChine:
				return "Muraille de Chine"
			case BuildingType.Obelisque:
				return "Obelisque"
			case BuildingType.Cathédrale:
				return "Cathédrale"
			case BuildingType.PyramideEgypte:
				return "Pyramide d'Egypte"		
			default:
				throw Error('type correspond to any name')
		}
	}

	public get points(): number {
		return this._points;
	}
	public set points(value: number) {
		this._points = value;
	}
	public get nbWorker(): number {
		return this._nbWorker;
	}
	public set nbWorker(value: number) {
		this._nbWorker = value;
	}
	public get nbNeededWorker(): number {
		return this._nbNeededWorker;
	}
	public set nbNeededWorker(value: number) {
		this._nbNeededWorker = value;
	}
	public get type(): BuildingType {
		return this._type;
	}
	public set type(value: BuildingType) {
		this._type = value;
	}
	public get power(): BuildingPower {
		return this._power;
	}
	public set power(value: BuildingPower) {
		this._power = value;
	}
    
}

export class Monuments {
    @observable private _buildings: Building[];

    constructor(buildings?: Building[]){
		if(!buildings){
			let arrDatas = require( '../datas/monuments.json' );
			buildings = arrDatas.map( (obj: jsonMonument) => {
				// console.log('obj', obj)
				return new Building(obj.type, obj.pointsFirst, obj.cost, obj.power)
			});
		}
		this.buildings = buildings
    }

	getBuildingIndex(buildingType: BuildingType){
		let i = 0
		while(i < this.buildings.length && this.buildings[i].type === buildingType){
			i++
		}
		return i
	}
	
	getBuilding(buildingType: BuildingType){
		return this.buildings[this.getBuildingIndex(buildingType)]
	}

	isBuilt(buildingType: BuildingType){
		return this.getBuilding(buildingType).isBuilt()
	}

	getBuildingsValidate(){
		return this.buildings.filter(m => m.isBuilt())
	}

	getBuildingsScore(){
		return this.getBuildingsValidate().reduce( (sum, dev) => sum + dev.points, 0)
	}

	public get buildings(): Building[] {
		return this._buildings;
	}
	public set buildings(value: Building[]) {
		this._buildings = value;
	}

}