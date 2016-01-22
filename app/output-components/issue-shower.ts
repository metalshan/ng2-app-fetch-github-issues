
import {Component, Input, OnChanges} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Loader} from '../loader';
import {IssueList} from './issue-list';

@Component({
  	selector: 'issue-shower',
		directives: [Loader, IssueList, CORE_DIRECTIVES],
	template: `
		<div class="whole-width mtl">
			<span  *ngIf="isDetailsFetchingInProfress">Retrieving issues...</span>
			<div *ngIf="!isDetailsFetchingInProfress && issues.length">

				<div class="menu">
					<span (click)="selectionChanged($event)" start="0" end="1" class="mrl pointer">Last 24 hours</span>
					<span (click)="selectionChanged($event)" start="1" end="7" class="mrl pointer">24 hrs to 1 week</span>
					<span (click)="selectionChanged($event)" start="7" end="" class="mrl pointer">before 1 week</span>
				</div>
				<issue-list [issues]="issues" [start]="selectedStart" [end]="selectedEnd" [status]="displayIssueType"></issue-list>
			</div>
		</div>
	    `

})

export class IssueShower implements OnChanges{
	@Input() userName:string;
	@Input() repoName: string;

	githubRepoInfoApi = "https://api.github.com/repos/:userName/:repoName/issues";

	issues: string[];
	isDetailsFetchingInProfress: bool = false;
	selectedStart: string = "0";
	selectedEnd: string = "1";
	displayIssueType: string = "open";

	ngOnChanges(inputChanges) {
		this.issues = [];
		if(this.userName && this.repoName)
			this.fetchIssues();
	}

	selectionChanged(event){
		var start = event.target.getAttribute('start');
		var end = event.target.getAttribute('end');
		this.selectedStart = start;
		this.selectedEnd = end;
	}

	//utils
	fetchIssues(){
		this.isDetailsFetchingInProfress = true;
		var apiUrl = this.githubRepoInfoApi.replace(":userName", this.userName);
		apiUrl = apiUrl.replace(":repoName", this.repoName);

		var issuesFetchingPromise = $.ajax(apiUrl);
		issuesFetchingPromise.then(function(data) {
			//console.log(response)
			//var data = JSON.parse(response);
			//message property comes only for error
			if(!data.message){
				this.issues = data;
			}
			this.isDetailsFetchingInProfress = false;

		}.bind(this), function () {
			this.isDetailsFetchingInProfress = false;
			this.issues = [];
		}.bind(this));
	}
}
