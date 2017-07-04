import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CalendarModule,PickListModule, TreeModule,TreeNode,AutoCompleteModule,FileUploadModule} from 'primeng/primeng';
import { <%= upCaseName %>Routing } from './<%= name %>.routing';

import { <%= upCaseName %>Component } from './<%= name %>.component';
import { <%= upCaseName %>Service } from './<%= name %>.service';

import { CmmnModule } from '../../../common/cmmn.module';
@NgModule({
	declarations: [
		<%= upCaseName %>Component,
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		RouterModule.forChild(<%= upCaseName %>Routing),
		CmmnModule
	],
	providers: [<%= upCaseName %>Service],
})
export class <%= upCaseName %>Module {}