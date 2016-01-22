/**
	This component taked the input url from the user.
*/

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
	//repoUrl is an Input so that even the outer component can pass the value (in case of a default value)
	@Input() repoUrl:string;

	//Event emitter to notify the outer component about the taked repo url
	@Output() repoUrlChange  = new EventEmitter();
	
	//This is just to hold the setTimeout, so that I can put a delay on keyUp event
	urlChangeDetector : any;

	//this is called on keyUp. Set the repoUrl and also emit an event to notify the parent
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
