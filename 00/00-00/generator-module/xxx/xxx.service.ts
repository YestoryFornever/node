import GLOBAL = require('../../../../../../../public/in.config');
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
@Injectable()
export class <%= upCaseName %>Service {
	private IP:string = GLOBAL.INCONFIG.getIP()
	private JH:Headers = GLOBAL.INCONFIG.JsonHeaders;
	private FDH:Headers = GLOBAL.INCONFIG.FormDataHeaders;
	private ExtractData = GLOBAL.INCONFIG.extractData();
	private ExtractResult = GLOBAL.INCONFIG.extractResult();
	private HandleError = GLOBAL.INCONFIG.handleError();

	constructor (private http: Http) {}
	demo(body:any): Observable<any> {
		let url = this.IP+'demo';
		let options = new RequestOptions({ headers: this.JH });
		return this.http.post(url, body, options).map(this.ExtractData).catch(this.HandleError);
	}
}