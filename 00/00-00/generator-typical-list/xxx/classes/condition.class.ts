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
	radio:string;
	checkbox:string;
	checkboxPattern:Array<object> = [
		{
			name:'有效',
			id:'1'
		},
		{
			name:'无效',
			id:'0'
		},
	];
}