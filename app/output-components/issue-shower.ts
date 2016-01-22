/**
	Issue shower Deals with the menu links and displaying issues according to the 
	selected time frame from the menu


*/
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
				<span>Total number of issues: {{totalOpenIssues}}</span>
				<div class="menu">
					<a href=".#" (click)="selectionChanged($event)" start="0" end="1" class="mrl pointer">Last 24 hours</a>
					<a href=".#" (click)="selectionChanged($event)" start="1" end="7" class="mrl pointer">24 hrs to 1 week</a>
					<a href=".#" (click)="selectionChanged($event)" start="7" end="" class="mrl pointer">before 1 week</a>
				</div>
				<issue-list [issues]="issues" [start]="selectedStart" [end]="selectedEnd" [status]="displayIssueType"></issue-list>
			</div>
		</div>
	    `

})

export class IssueShower implements OnChanges{
	//general inputs to be taken from the parent
	@Input() userName:string;
	@Input() repoName: string;

	githubRepoInfoApi = "https://api.github.com/repos/:userName/:repoName/issues";

	//variables
	issues: string[];
	isDetailsFetchingInProfress: bool = false;
	selectedStart: string = "0";
	selectedEnd: string = "1";
	displayIssueType: string = "open";
	totalOpenIssues: number = 0;

	//on input change
	ngOnChanges(inputChanges) {
		this.issues = [];
		if(this.userName && this.repoName)
			this.fetchIssues();
	}

	//to be called on selected timeframe changed
	selectionChanged(event){
		var start = event.target.getAttribute('start');
		var end = event.target.getAttribute('end');
		this.selectedStart = start;
		this.selectedEnd = end;
	}

	//utils

	//to fetch the issues basing on repoUrl change (which actually end up as userName and repoName change)
	fetchIssues(){
		this.totalOpenIssues = 0;
		this.isDetailsFetchingInProfress = true;
		var apiUrl = this.githubRepoInfoApi.replace(":userName", this.userName);
		apiUrl = apiUrl.replace(":repoName", this.repoName);

		var issuesFetchingPromise = $.ajax(apiUrl);
		issuesFetchingPromise.then(function(data) {
			if(!data.message){
				this.issues = data;
			}
			this.isDetailsFetchingInProfress = false;
			this.calculateTotalIssues();
		}.bind(this), function () {
			this.isDetailsFetchingInProfress = false;
			this.issues = [];
		}.bind(this));
	}

	calculateTotalIssues(){
		var list = this.issues;
		if(list){
			list.forEach(function (issue) {
				if (issue.state.toLowerCase() === this.displayIssueType.toLowerCase()){
					this.totalOpenIssues++;
				}
			}.bind(this))
		}
	}
}
