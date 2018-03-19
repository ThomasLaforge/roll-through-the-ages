import {observable} from 'mobx'

import {
    FoodStock,
    IronStock,
    GoldStock,
    LeatherStock,
    WoodStock
} from './Stock'

export class GlobalStock {

    @observable private _woodStock: WoodStock;
    @observable private _foodStock: FoodStock;
    @observable private _ironStock: IronStock;
    @observable private _goldStock: GoldStock;
    @observable private _leatherStock: LeatherStock;
    
    constructor(woodStock = new WoodStock(), foodStock = new FoodStock(), ironStock = new IronStock(), goldStock = new GoldStock(), leatherStock = new LeatherStock()){
        this.woodStock = woodStock
        this.foodStock = foodStock
        this.ironStock = ironStock
        this.goldStock = goldStock
        this.leatherStock = leatherStock
        this.woodStock = woodStock
    }

	public get woodStock(): WoodStock {
		return this._woodStock;
	}
	public set woodStock(value: WoodStock) {
		this._woodStock = value;
	}
	public get foodStock(): FoodStock {
		return this._foodStock;
	}
	public set foodStock(value: FoodStock) {
		this._foodStock = value;
	}
	public get ironStock(): IronStock {
		return this._ironStock;
	}
	public set ironStock(value: IronStock) {
		this._ironStock = value;
	}
	public get goldStock(): GoldStock {
		return this._goldStock;
	}
	public set goldStock(value: GoldStock) {
		this._goldStock = value;
	}
	public get leatherStock(): LeatherStock {
		return this._leatherStock;
	}
	public set leatherStock(value: LeatherStock) {
		this._leatherStock = value;
	}
    

}