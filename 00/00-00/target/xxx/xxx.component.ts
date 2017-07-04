import GLOBAL = require('../../../../../../../public/in.config');
import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { <%= upCaseName %>Service } from './<%= name %>.service';
@Component({
	selector: '<%= name %>',
	templateUrl: './<%= name %>.component.html',
	styleUrls: ['./<%= name %>.component.css'],
})
export class <%= upCaseName %>Component implements OnInit{
	constructor(
		private <%= hump %>Service:<%= upCaseName %>Service,
		private changeDetectorRef:ChangeDetectorRef
	){}
	userInfo:any;
	errorMsg:any;
	ngOnInit(){
	}
}