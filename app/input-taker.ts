
import {Component, Input, Output, EventEmitter} from 'angular2/core';
@Component({
  	selector: 'input-taker',
	template: `
		<div>
			<span class="text-left">Repo url: </span>
			<input class="repo-input" #repoUrlInput [value]="repoUrl" (keyup)="onRepoUrlChange(repoUrlInput)" />
		</div>
	    `
})

export class InputTaker {
	@Input() repoUrl:string;

	@Output() repoUrlChange  = new EventEmitter();
	
	urlChangeDetector : any;

	onRepoUrlChange(element){
		this.repoUrl = element.value;
		clearTimeout(this.urlChangeDetector);

		this.urlChangeDetector = setTimeout((function(urlChangeEventEmitter, value) {
			return function(){
				urlChangeEventEmitter.next(value);
			}
		} (this.repoUrlChange, this.repoUrl)), 500);
	}

}
