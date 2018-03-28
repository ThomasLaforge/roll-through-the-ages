import { observable } from "mobx";

interface jsonDevelopement {
    cost: number,
    type: number,
    points: number,
    name: string,
    description: string,
    shortDescription: string
}

export enum DevelopementType {
    Conduite,
    Irrigation,
    Agriculture,
    Carrieres,
    Medecine,
    Invention,
    Caravanes,
    Religion,
    Greniers,
    Maçonnerie,
    Ingénierie,
    Architecture,
    Empire
}

export class Developement {
    @observable private _cost: number;
    @observable private _points: number;
    @observable private _definition: string;
    @observable private _shortDescription: string;
    @observable private _type: DevelopementType;
    @observable private _validate: boolean;

    constructor(cost: number, points: number, definition: string, shortDescription: string, type: DevelopementType, validate = true){
        this.cost = cost
        this.points = points
        this.definition = definition
        this.shortDescription = shortDescription
        this.type = type
        this.validate = validate
    }
    
    buy(){
        this.validate = true
    }

    get name(){
        switch (this.type) {
            case DevelopementType.Agriculture:
                return "Agriculture"
            case DevelopementType.Conduite:
                return "Conduite"
            case DevelopementType.Irrigation:
                return "Irrigation"
            case DevelopementType.Carrieres:
                return "Carrieres"
            case DevelopementType.Medecine:
                return "Medecine"
            case DevelopementType.Invention:
                return "Invention"
            case DevelopementType.Caravanes:
                return "Caravanes"
            case DevelopementType.Religion:
                return "Religion"
            case DevelopementType.Greniers:
                return "Greniers"
            case DevelopementType.Maçonnerie:
                return "Maçonnerie"
            case DevelopementType.Ingénierie:
                return "Ingénierie"
            case DevelopementType.Architecture:
                return "Architecture"
            case DevelopementType.Empire:
                return "Empire"
            default:
                throw Error('no name for dev type')
        }
    }

	public get cost(): number {
		return this._cost;
	}
	public set cost(value: number) {
		this._cost = value;
	}
	public get points(): number {
		return this._points;
	}
	public set points(value: number) {
		this._points = value;
	}
	public get definition(): string {
		return this._definition;
	}
	public set definition(value: string) {
		this._definition = value;
	}
	public get type(): DevelopementType {
		return this._type;
	}
	public set type(value: DevelopementType) {
		this._type = value;
    }
	public get validate(): boolean {
		return this._validate;
	}
	public set validate(value: boolean) {
		this._validate = value;
    }
	public get shortDescription(): string {
		return this._shortDescription;
	}
	public set shortDescription(value: string) {
		this._shortDescription = value;
	}
    
}

export class Developements {

    @observable private _developements: Developement[];

    constructor(developements?: Developement[], validate: number[] = []){
        if(!developements){
            let arrDatas = require( '../datas/developements.json' );
            developements = arrDatas.map( (obj: jsonDevelopement) => new Developement(obj.cost, obj.points, obj.description, obj.shortDescription, obj.type))
        }
        this.developements = developements
    }

    getDevIndex(type: DevelopementType){
        let i = 0;
        while(i < this.developements.length && this.developements[i].type !== type){
            i++
        }
        return i
    }

    getDev(type: DevelopementType){
        return this.developements[this.getDevIndex(type)]
    }

    isValidate(type: DevelopementType){
        return this.getDev(type).validate
    }

    getDevelopmentsValidate(){
        return this.developements.filter(d => d.validate)
    }

    getDevelopmentsScore(){
        return this.getDevelopmentsValidate().reduce( (sum, dev) => sum + dev.points, 0)
    }    

	public get developements(): Developement[] {
		return this._developements;
	}
	public set developements(value: Developement[]) {
		this._developements = value;
	}

}