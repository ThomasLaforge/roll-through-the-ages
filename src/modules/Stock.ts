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
        this.position = this.position + quantity
        if(this.position > this.maxPos){
            this.position = this.maxPos
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
    public valueMap: number[];

    constructor(position = 0, maxPos: number, valueMap: number[]){
        super(position, maxPos)
        this.valueMap = valueMap
    }

    getValueByPosition(position: number){
        return position - 1 < 0 ? 0 : this.valueMap[position - 1]
    }
}

export class GoldStock extends ResourceStock {
    constructor(position?: number){
        super(position, 4, [5, 15, 30, 50])
    }
}

export class IronStock extends ResourceStock {
    constructor(position?: number){
        super(position, 5, [4, 12, 24, 40, 60])
    }
}


export class LeatherStock extends ResourceStock {
    constructor(position?: number){
        super(position, 6, [3, 9, 18, 30, 45, 63])
    }
}

export class StoneStock extends ResourceStock {
    constructor(position?: number){
        super(position, 7, [2, 6, 12, 20, 30, 42, 56])
    }
}


export class WoodStock extends ResourceStock {
    constructor(position?: number){
        super(position, 8, [1, 3, 6, 10, 15, 21, 28, 36])
    }
}