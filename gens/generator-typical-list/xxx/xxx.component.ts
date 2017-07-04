// import { INCONFIG } from '../../../../../public/in.config';
import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { <%= upCaseName %>Service } from './<%= name %>.service';

import { TypeAhead } from './classes/typeahead.class';
import { Condition } from './classes/condition.class';
import { Item } from './classes/item.class';

@Component({
	selector: '<%= name %>',
	templateUrl: './<%= name %>.component.html',
	styleUrls: [
		'./<%= name %>.component.scss',
		'../../../../../scss/typical-list/header.scss',
		'../../../../../scss/typical-list/table.scss',
		'../../../../../scss/typical-list/condition.scss',
		'../../../../../scss/typical-list/order.scss',
	],
})
export class <%= upCaseName %>Component implements OnInit{
	constructor(
		private <%= hump %>Service:<%= upCaseName %>Service,
		private changeDetectorRef:ChangeDetectorRef
	){}
	ngOnInit(){
		this.getList();
		this.asynForAsyn();
	}
	
	xxx:any;
	fn(){}
	errorMsg:string;
	calenderLocale:Object = {
		firstDayOfWeek: 0,
		dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
		dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
		dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
		monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
		monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
	};

	list:Item[]=[];

	forAsynTypeAhead:TypeAhead = new TypeAhead();
	asynForAsyn(){
		this.forAsynTypeAhead.source = Observable.create((observer:any) => {
			this.<%= hump %>Service
				.demo(this.condition.forAsync)
				.subscribe(
					data => {
						observer.next(data)
					},
					error => this.errorMsg = error
				);
		}).mergeMap((token:string) => this.forAsynTypeAhead.getStates(token));
	}

	condition:Condition = new Condition();
	pageParams:any={
		maxSize:5,
		totalItems:0,
		currentPage:1,
		itemsPerPage:10,
		totalPages:0,
	}
	getList(){
		let param:any = {
			pageNum:this.pageParams.currentPage,
			pageSize:this.pageParams.itemsPerPage,
			orderBy:null,
			sortType:'ASC',
			forAsync:this.condition.forAsync,
			startTime:this.condition.startTime.getTime(),
			endTime:this.condition.endTime.getTime(),
		};
		console.log(param);
		this.<%= hump %>Service.demo(param)
			.subscribe(
				res => {
					console.log(res);
					this.list = res.list;
					this.pageParams.totalItems = res.page["totalResult"];
					this.changeDetectorRef.detectChanges();
				},
				error => this.errorMsg = error
			);
	}

	forSelects:any[] = [];

	// 排序
	Order(ord:any,type:any){
		this.condition.orderBy = ord+' '+type;
		this.getList();
	}
}
