/**
	it creates the menu link and also calculate the number or open issues
*/

/**
	This displayed the selected list
*/

import {Component, Input, OnChanges, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
	selector: 'menu-link',
	directives: [CORE_DIRECTIVES],
	template: `
			{{displayText}} ({{totalOpenIssuesNumber}})
	    `
})

export class MenuLink implements OnChanges, OnInit {
	//all inputs
	@Input() start: string;
	@Input() end: string;
	@Input() status: string;
	@Input() issues: string[];


	//variables
	displayText: string[];
	startDate: Date;
	endDate: Date;
	totalOpenIssuesNumber: number = 0;

	//setting up start and end dates
	ngOnInit(){
		this.setupStartEndDate();
		this.setupDisplayText();
	}


	//on input changes
	ngOnChanges(inputChanges) {
		//this check is because ngOnInit is not working as it should be.
		//ngOnInit is being called after the ngOnChanges.
		//Once the bug is fixed, we can ermove the following check
		if(!this.startDate || !this.endDate){
			this.setupStartEndDate();
			this.setupDisplayText();
		}
		this.refresh();
	}

	//refreshed on input changes
	//this filters the issues
	refresh() {
		this.totalOpenIssuesNumber = 0;
		var list = this.issues;
		if (list) {
			list.forEach(function(issue) {
				var issueOpeningDate = new Date(issue.created_at)
				if (issue.state.toLowerCase() === this.status.toLowerCase()) {
					if (issueOpeningDate > this.endDate && issueOpeningDate <= this.startDate)
						this.totalOpenIssuesNumber++;
				}
			}.bind(this))
		}
	}


	//sets up the date bounderies
	setupStartEndDate() {
		var start = this.start;
		var end = this.end;

		var startDate = new Date();
		var endDate = new Date();

		startDate.setDate(startDate.getDate() - start); //setting the startDate as JS Date object
		this.startDate = startDate;

		if (!end)
			this.endDate = new Date(-8640000000000000); //The oldest possible date in JavaScript
		else {
			endDate.setDate(endDate.getDate() - end)
			this.endDate = endDate;
		}
	}

	setupDisplayText(){
		if (this.start == 0 && this.end == "1")
			this.displayText = "Past 24 hours"
		else
			if (!this.end)
				this.displayText = "before " + this.start + " days";
			else
				this.displayText = "from day " + this.start + " to day" + this.end;
	}

}
