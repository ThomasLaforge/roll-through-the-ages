import {observable} from 'mobx'

import {
    FoodStock,
    IronStock,
    GoldStock,
    LeatherStock,
    StoneStock,
    WoodStock
} from './Stock'

export class GlobalStock {

    @observable private _woodStock: WoodStock;
    @observable private _foodStock: FoodStock;
    @observable private _ironStock: IronStock;
    @observable private _goldStock: GoldStock;
    @observable private _leatherStock: LeatherStock;
    @observable private _stoneStock: StoneStock;
    
    constructor(
		woodStock = new WoodStock(), 
		foodStock = new FoodStock(), 
		ironStock = new IronStock(), 
		goldStock = new GoldStock(), 
		stoneStock = new StoneStock(), 
		leatherStock = new LeatherStock()
	){
        this.woodStock = woodStock
        this.foodStock = foodStock
        this.ironStock = ironStock
        this.goldStock = goldStock
        this.leatherStock = leatherStock
        this.stoneStock = stoneStock
	}

	get orderedResourcesStocks(){
		return [this.woodStock, this.stoneStock, this.leatherStock, this.ironStock, this.goldStock]
	}
	
	addResources(quantity: number){
		let i = 0
		while(quantity > 0){
			this.orderedResourcesStocks[i % this.orderedResourcesStocks.length].position++
			quantity--
			i++
		}
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
	public get stoneStock(): StoneStock {
		return this._stoneStock;
	}
	public set stoneStock(value: StoneStock) {
		this._stoneStock = value;
	}
    

}