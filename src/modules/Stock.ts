import {observable} from 'mobx'

export abstract class Stock {

    @observable private _position: number;
    private _maxPos: number;

	constructor(position: number, maxPos: number) {
        this.position = position
        this.maxPos = maxPos
    }

    get value(){
        return this.getValueByPosition(this.position)
    }
    abstract getValueByPosition(position: number): number
    
    add(quantity = 1){
        if(!this.isFull()){
            this.position = this.position + quantity
        }
    }

    lose(quantity = 1){
        if(!this.isEmpty()){
            this.position = this.position - quantity
        }
    }

    isFull(){
        return this.position === this.maxPos
    }
    isEmpty(){
        return this.position === 0
    }

	public get position(): number {
		return this._position;
	}
	public set position(position: number) {
		this._position = position;
    }
	public get maxPos(): number {
		return this._maxPos;
	}
	public set maxPos(value: number) {
		this._maxPos = value;
	}
    
}

export class FoodStock extends Stock {
    constructor(position = 3){
        super(position, 15)
    }

    getValueByPosition(position: number){
        return position
    }
}

export abstract class ResourceStock extends Stock {
    constructor(position = 0, maxPos: number){
        super(position, maxPos)
    }

}

export class IronStock extends ResourceStock {
    constructor(position?: number){
        super(position, 4)
    }

    getValueByPosition(position: number){
        return 1
    }
}

export class WoodStock extends ResourceStock {
    constructor(position?: number){
        super(position, 4)
    }

    getValueByPosition(position: number){
        return 2
    }
}

export class LeatherStock extends ResourceStock {
    constructor(position?: number){
        super(position, 4)
    }

    getValueByPosition(position: number){
        return 3
    }
}

export class GoldStock extends ResourceStock {
    constructor(position?: number){
        super(position, 4)
    }

    getValueByPosition(position: number){
        return 4
    }
}