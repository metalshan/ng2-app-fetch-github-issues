import {Component,View} from 'angular2/core';
import {InputTaker} from './input-taker.ts';
import {OutputShower} from './output-shower.ts';

@Component({
    selector: 'app',
	directives: [InputTaker, OutputShower]
	template: `<h1>Fetch github repo</h1>
		<hr /><br />
		<input-taker [(repoUrl)]="repoUrl"></input-taker>
		<output-shower [repoUrl]="repoUrl"></output-shower>
	`
})

export class App {
	public repoUrl = "https://github.com/metalshan/smartjax";
}

