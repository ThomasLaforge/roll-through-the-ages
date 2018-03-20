export class Monument {
    private _points: number;
    private _nbWorker: number;
    private _nbNeededWorker: number;

    constructor(points: number, nbNeededWorker: number, nbWorker = 0){
        this.points = points
        this.nbWorker = nbWorker
        this.nbNeededWorker = nbNeededWorker 
    }

    getPercentBuilt(){
        return this.nbWorker / this.nbNeededWorker * 100
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
    
}

export class Monuments {
    // private _monuments: Monument[];

    // constructor(monument = [

    // ]){
    //     this.monuments = monuments
    // }

	// public get monuments(): Monument[] {
	// 	return this._monuments;
	// }
	// public set monuments(value: Monument[]) {
	// 	this._monuments = value;
	// }
    
}