/**
This is the starting point of the app. The app component is here
*/

import {Component,View} from 'angular2/core';
import {InputTaker} from './input-taker.ts';
import {OutputShower} from './output-shower.ts';

@Component({
    selector: 'app',
	directives: [InputTaker, OutputShower]
	template: `
		<h1>Fetch github repo</h1>
		<hr /><br />
		<input-taker [(repoUrl)]="repoUrl"></input-taker>
		<output-shower [repoUrl]="repoUrl"></output-shower>
	`
})

export class App {
	public repoUrl = "https://github.com/Shippable/support/issues?utm_campaign=Recruiting&utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz--SbQcGSEyiJesLBuHKlNoCiOfIWDE3MsNYpP4X0mEzpX4kEN1gmdTmNVcEbXe3ZU_sedmI12OMNmG7Rp0n0p4wXOj-kQ&_hsmi=21670750";
}

