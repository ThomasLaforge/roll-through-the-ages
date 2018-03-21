import {observable} from 'mobx'

enum DiceFace {
    Food,
    FoodOrWorker,
    FoodOrWorker_Food,
    FoodOrWorker_Worker,
    Worker,
    Money,
    Resource,
    ResourceAndDisaster
}

export class Dice {
    @observable private _faces: DiceFace[];
    @observable private _currentFaceIndex: number;
    @observable private _frozen: boolean;

    constructor(faces = [
        DiceFace.Food,
        DiceFace.FoodOrWorker,
        DiceFace.Worker,
        DiceFace.Money,
        DiceFace.Resource,
        DiceFace.ResourceAndDisaster
    ], currentFace?: number, frozen = false){
        this.faces = faces
        if(!currentFace && currentFace !== 0){
            this.roll()
        }else {
            this.currentFaceIndex = currentFace
        }
        this.frozen = frozen
    }

    roll(){
        if(!this.frozen){
            this.currentFaceIndex = Math.floor(Math.random() * this.faces.length)
        }
    }

    freeze(){
        this.frozen = true
    }

    unFreeze(){
        this.frozen = false
    }

    isFood(){
        return this.currentFace === DiceFace.Food || this.currentFace === DiceFace.FoodOrWorker
    }

    isWorker(){
        return this.currentFace === DiceFace.Worker || this.currentFace === DiceFace.FoodOrWorker
    }

    isResource(){
        return this.currentFace === DiceFace.Resource || this.currentFace === DiceFace.ResourceAndDisaster
    }

    isDisaster(){
        return this.currentFace === DiceFace.ResourceAndDisaster
    }

    isMoney(){
        return this.currentFace === DiceFace.Money
    }

    get value(){
        switch (this.currentFace) {
            case DiceFace.Food:
                return 3
            case DiceFace.FoodOrWorker:
                return 2
            case DiceFace.Resource:
                return 1
            case DiceFace.ResourceAndDisaster:
                return 2
            case DiceFace.Worker:
                return 3
            case DiceFace.Money:
                return 7
            default:
                return 0
        }
    }

    get currentFaceName(){
        console.log('current face', this.currentFace)        
        switch (this.currentFace) {
            case DiceFace.Food:
                return 'Food x3'
            case DiceFace.FoodOrWorker:
                return 'Food x2 / Worker x2'
            case DiceFace.Resource:
                return 'Resource'
            case DiceFace.ResourceAndDisaster:
                return 'Resource x2 + Disaster'
            case DiceFace.Worker:
                return 'Worker x3'
            case DiceFace.Money:
                return 'Money x7'
            default:
                return 'unknown'
        }
    }

    get currentFace(){
        return this.faces[this.currentFaceIndex]
    }

	public get currentFaceIndex(): number {
		return this._currentFaceIndex;
	}
	public set currentFaceIndex(value: number) {
		this._currentFaceIndex = value;
    }
	public get faces(): DiceFace[] {
		return this._faces;
	}
	public set faces(value: DiceFace[]) {
		this._faces = value;
	}
	public get frozen(): boolean {
		return this._frozen;
	}
	public set frozen(value: boolean) {
		this._frozen = value;
	}
    
}