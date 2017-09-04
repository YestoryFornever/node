import { Injectable } from "@angular/core";
import { ProxyRequestService } from 'common';

@Injectable()

export class <%= upCaseName %>Service {
	constructor(public proxy: ProxyRequestService) { }

	demo(data: any) {//demo
		return this.proxy.post('emanager/demo', data);
	}
}