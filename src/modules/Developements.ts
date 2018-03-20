import { observable } from "mobx";

enum DevelopementType {
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
    @observable private _name: string;
    @observable private _type: DevelopementType;
    @observable private _validate: boolean;

    constructor(cost: number, points: number, definition: string, name: string, type: DevelopementType, validate = false){
        this.cost = cost
        this.points = points
        this.definition = definition
        this.name = name
        this.type = type
        this.validate = validate
    }
    
    buy(){
        this.validate = true
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
	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this._name = value;
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
    
}

export class Developements {

    constructor(){

    }

    get trueBool(){
        return true
    }
}