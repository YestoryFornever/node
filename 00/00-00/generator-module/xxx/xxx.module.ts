import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CalendarModule,PickListModule, TreeModule,TreeNode,AutoCompleteModule,FileUploadModule} from 'primeng/primeng';
import { <%= upCaseName %>Routing } from './<%= name %>.routing';

import { <%= upCaseName %>Component } from './<%= name %>.component';
import { <%= upCaseName %>Service } from './<%= name %>.service';

import { ALL_MODULES } from 'common/vendor';
import { AppCommonModule } from 'common';
@NgModule({
	declarations: [
		<%= upCaseName %>Component,
	],
	imports: [
		AppCommonModule,
		...ALL_MODULES,

		CommonModule,
		FormsModule,
		HttpModule,
		RouterModule.forChild(<%= upCaseName %>Routing),
	],
	providers: [<%= upCaseName %>Service],
})
export class <%= upCaseName %>Module {}