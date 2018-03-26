import {observable} from 'mobx'

export enum DiceFace {
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
    @observable private _specialFace: DiceFace;
    @observable private _frozen: boolean;

    constructor(faces = [
        DiceFace.Food,
        DiceFace.FoodOrWorker,
        DiceFace.Worker,
        DiceFace.Money,
        DiceFace.Resource,
        DiceFace.ResourceAndDisaster
    ], currentFaceIndex?: number, frozen = false, specialFace = DiceFace.FoodOrWorker_Food ){
        this.faces = faces
        if(!currentFaceIndex && currentFaceIndex !== 0){
            this.roll()
        }else {
            this.currentFaceIndex = currentFaceIndex
        }
        this.frozen = frozen
        this.specialFace = specialFace
    }

    roll(){
        if(!this.frozen){
            this.currentFaceIndex = Math.floor(Math.random() * this.faces.length)
        }
    }

    needResolution(){
        return this.currentFace === DiceFace.FoodOrWorker
    }

    isSwitchable(){
        return this.currentFace === DiceFace.FoodOrWorker || this.currentFace === DiceFace.FoodOrWorker_Food || this.currentFace === DiceFace.FoodOrWorker_Worker
    }

    chose(choseFood: boolean){
        if(this.isSwitchable()){
            this.specialFace = choseFood ? DiceFace.FoodOrWorker_Food : DiceFace.FoodOrWorker_Worker
        }
        else{
            throw new Error('chose for dice face who is not FoodOrWorker')
        }
    }

    switchSpecialFace(){
        this.chose(!this.specialFace || this.specialFace === DiceFace.FoodOrWorker_Worker)
    }

    freeze(){
        this.frozen = true
    }

    unFreeze(){
        this.frozen = false
    }

    isFood(){
        return this.currentFace === DiceFace.Food || this.currentFace === DiceFace.FoodOrWorker_Food
    }

    isWorker(){
        return this.currentFace === DiceFace.Worker || this.currentFace === DiceFace.FoodOrWorker_Worker
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
            case DiceFace.FoodOrWorker_Food:
            case DiceFace.FoodOrWorker_Worker:
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
        return this.faces[this.currentFaceIndex] === DiceFace.FoodOrWorker ? this.specialFace : this.faces[this.currentFaceIndex]
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
	public get specialFace(): DiceFace {
		return this._specialFace;
	}
	public set specialFace(value: DiceFace) {
		this._specialFace = value;
	}    
    
}