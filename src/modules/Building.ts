import {observable} from 'mobx'

export class Building {

    private _name: string;
    private _nbParts: number;
    @observable private _nbPartsBuilt: number;

    constructor(name: string, nbParts: number, nbPartsBuilt = 0){
        this.name = name
        this.nbParts = nbParts
        this.nbPartsBuilt = nbPartsBuilt
    }

    build(nbPartsBuilt: number){
        this.nbPartsBuilt += nbPartsBuilt
    }

    buildDone(){
        return this.nbParts === this.nbPartsBuilt
    }

    get imgPath(){
        return this.name + '.png'
    }

	public get nbParts(): number {
		return this._nbParts;
	}
	public set nbParts(value: number) {
		this._nbParts = value;
	}
	public get nbPartsBuilt(): number {
		return this._nbPartsBuilt;
	}
	public set nbPartsBuilt(value: number) {
		this._nbPartsBuilt = value;
	}
	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this._name = value;
	}
    
}