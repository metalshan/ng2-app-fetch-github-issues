/**
	Issue shower Deals with the menu links and displaying issues according to the 
	selected time frame from the menu


*/
import {Component, Input, OnChanges} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Loader} from '../loader';
import{Utils} from '../utils/utils.ts'
import {IssueList} from './issue-list';
import {MenuLink} from './menu-link'

@Component({
  	selector: 'issue-shower',
	directives: [Loader, IssueList, CORE_DIRECTIVES, MenuLink],
	template: `
		<div class="whole-width mtl">
			<span  *ngIf="isDetailsFetchingInProfress">Retrieving issues...</span>
			<div *ngIf="!isDetailsFetchingInProfress && issues.length">
				<span>Total number of issues: {{totalOpenIssues}}</span>
				<div class="menu mtl">
					<menu-link href=".#" (click)="selectionChanged($event)" start="0" end="1" [status]="displayIssueType" class="mrl pointer"  [issues]="issues"></menu-link>
					<menu-link href=".#" (click)="selectionChanged($event)" start="1" end="7" [status]="displayIssueType" class="mrl pointer"  [issues]="issues"></menu-link>
					<menu-link href=".#" (click)="selectionChanged($event)" start="7" end="" [status]="displayIssueType" class="mrl pointer"  [issues]="issues"></menu-link>
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


	constructor() {
		this.utils = new Utils();
	}

	githubRepoInfoApi = "https://api.github.com/repos/:userName/:repoName/issues?state=:state&filter=all&per_page=:perPageItem&page=:pageNumber";

	//variables
	issues: string[];
	isDetailsFetchingInProfress: bool = false;
	selectedStart: string = "0";
	selectedEnd: string = "1";
	totalOpenIssues: number = 0;
	currentCallPage: number = 0;
	utils: Utils;
	
	//consts
	displayIssueType: string = "open";
	perPageItem: number = 100;

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


	//to fetch the issues basing on repoUrl change (which actually end up as userName and repoName change)
	fetchIssues(){
		this.totalOpenIssues = 0;
		this.currentCallPage = 0;
		this.isDetailsFetchingInProfress = true;

		//do all api param replacements
		var apiUrl = this.githubRepoInfoApi.replace(":userName", this.userName); //replacing userName
		apiUrl = apiUrl.replace(":repoName", this.repoName); //replacing repoName
		apiUrl = apiUrl.replace(":state", this.displayIssueType); //replacing issue type
		apiUrl = apiUrl.replace(":perPageItem", this.perPageItem); //replacing repoName

		//after makking the required api url, I can go ahead with call
		this.callGithubForIssuesAndContinue(apiUrl);	
	}

	//This calls the github apis again and again untill 
	//all the issues are fetched
	callGithubForIssuesAndContinue(apiUrl){
		//page number need to be updated
		this.currentCallPage++;

		//format url to add client_id and secret
		var modifiedApiUrl = apiUrl.replace(":pageNumber", this.currentCallPage);
		modifiedApiUrl = this.utils.formatUrl(modifiedApiUrl);

		//finally the actual call
		var issuesFetchingPromise = $.ajax(modifiedApiUrl);
		issuesFetchingPromise.then(function(data) {
			//if data has length (because it has issues) we need to append that
			if(data.length)
				this.issues = this.issues.concat(data);

			if(data.length && data.length===this.perPageItem){
				//you got a response with full pagination? 
				//Well, then you may have more in the pocket
				//let's call again
				this.callGithubForIssuesAndContinue.apply(this, [apiUrl]);
			}
			else{
				//lets calculate and set the in progress flag to false
				this.calculateTotalIssues();
				this.isDetailsFetchingInProfress = false;
			}
		}.bind(this), function () {
			//error in a call will end up making more calls
			//will do the final calculation
			this.calculateTotalIssues();
			this.isDetailsFetchingInProfress = false;
		}.bind(this));
	}

	//to calculate the number of issues
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
