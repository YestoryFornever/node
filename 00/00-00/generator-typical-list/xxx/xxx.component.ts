// import { INCONFIG } from '../../../../../public/in.config';
import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { <%= upCaseName %>Service } from './<%= name %>.service';

import { TypeAhead } from './classes/typeahead.class';
import { Condition } from './classes/condition.class';
import { Item } from './classes/item.class';

@Component({
	selector: '<%= name %>',
	templateUrl: './<%= name %>.component.html',
	styleUrls: [
		'./<%= name %>.component.scss',
		'../../../../common/scss/typical-list/header.scss',
		'../../../../common/scss/typical-list/table.scss',
		'../../../../common/scss/typical-list/condition.scss',
		'../../../../common/scss/typical-list/order.scss',
	],
	providers: [<%= upCaseName %>Service]
})
export class <%= upCaseName %>Component implements OnInit{
	constructor(
		private <%= hump %>Service:<%= upCaseName %>Service,
		private changeDetectorRef:ChangeDetectorRef,
		private activatedRoute:ActivatedRoute,
        private router:Router
	){}
	ngOnInit(){
		this.getList();
		this.asynForAsyn();
		this.activatedRoute.params.forEach((params:Params)=>{
			//let id = +params['id'];
		});
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
				.demo(this.conditions.forAsync)
				.then(
					(data:any) => {
						observer.next(data)
					},
					error => this.errorMsg = error
				);
		}).mergeMap((token:string) => this.forAsynTypeAhead.getStates(token));
	}

	conditions:Condition = new Condition();
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
			forAsync:this.conditions.forAsync,
			startTime:this.conditions.startTime.getTime(),
			endTime:this.conditions.endTime.getTime(),
		};
		console.log(param);
		this.<%= hump %>Service.demo(param)
			.then(
				(res:any) => {
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
		this.conditions.orderBy = ord+' '+type;
		this.getList();
	}
}
