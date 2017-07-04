import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { <%= upCaseName %>Component } from './<%= name %>.component';
// 如果从属于homepage模块，需在homepage.routing引入
export const <%= upCaseName %>Routing: Routes = [
	{
		path: '<%= name %>',
		component: <%= upCaseName %>Component
	},
];