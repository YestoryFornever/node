export class Condition{
	constructor(){
		this.forAsync = '';
		this.endTime = new Date();
		this.startTime = new Date(Date.parse(String(this.endTime))-6*24*3600*1000);
	}
	forAsync:string;
	forSelect:string;
	
	startTime:Date;
	endTime:Date;

	orderBy:string;
	sortType:string;
}