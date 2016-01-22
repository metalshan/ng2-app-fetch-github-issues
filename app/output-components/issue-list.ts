/**
	This displayed the selected list
*/

import {Component, Input, OnChanges} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
  	selector: 'issue-list',
	directives: [CORE_DIRECTIVES],
	template: `
		<div class="whole-width mtl">
			<ul>
				<li *ngFor="#issue of displayList">{{issue.title}}</li>
			</ul>
			<span *ngIf="!displayList.length">No filtered issue found</span>
		</div>
	    `
})

export class IssueList implements OnChanges{
	//all inputs
	@Input() start: string;
	@Input() end:string;
	@Input() status: string;
	@Input() issues: string[];


	//variables
	displayList: string[];
	startDate: Date;
	endDate: Date;


	//on input changes
	ngOnChanges(inputChanges) {
		this.setupStartEndDate();
		this.refresh();
	}

	//refreshed on input changes
	//this filters the issues
	refresh(){
		var list = this.issues;
		if(list){
			var filteredIssues = [];
			list.forEach(function (issue) {
				var issueOpeningDate = new Date(issue.created_at)
				if (issue.state.toLowerCase() === this.status.toLowerCase()){
					if (issueOpeningDate > this.endDate && issueOpeningDate <= this.startDate)
						filteredIssues.push(issue);
				}
			}.bind(this))
			this.displayList = filteredIssues;
		}
		else{
			this.displayList = [];
		}
	}


	//sets up the date bounderies
	setupStartEndDate(){
		var start = this.start;
		var end = this.end;
		
		var startDate = new Date();
		var endDate = new Date();

		startDate.setDate(startDate.getDate() - start); //setting the startDate as JS Date object
		this.startDate = startDate;

		if (!end)
			this.endDate = new Date(-8640000000000000); //The oldest possible date in JavaScript
		else{
			endDate.setDate(endDate.getDate() - end)
			this.endDate = endDate;
		}
	}

}
