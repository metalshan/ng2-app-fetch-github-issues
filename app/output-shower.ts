/**
	This is the output shower component; to show the output basing on the repo url, given
	This contains an avatar component to show the avatar of the repo owner
	This also contains an issue shower which shows the issue list
*/

import {Component, Input, OnChanges} from 'angular2/core';
import {Avatar} from './output-components/avatar';
import {IssueShower} from './output-components/issue-shower';

@Component({
	directives: [Avatar, IssueShower],
  	selector: 'output-shower',
	template: `
		<div class="whole-width mtl">
			<avatar [userName]="userName"></avatar>
			<issue-shower [repoName]="repoName" [userName]="userName"></issue-shower>
		</div>
	    `
})

export class OutputShower implements OnChanges {
	//repoUrl is taken from the parent
	@Input() repoUrl: string;

	//userName and repoName, which are extracted by operations
	userName: string;
	repoName: string;


	//This is called whenevr the input or repoUrl is changed
	ngOnChanges(inputChanges){
		this.reset();
		this.userName = this.findUserName();
		this.repoName = this.findRepoName();
	}

	//utility functions

	//reset the properties
	reset(){
		this.userName = null;
		this.repoName = null;
	}

	//to get the userName from repoUrl
	findUserName(){
		var repoUrl = this.repoUrl; 
		var userNameRegexp = /github.com[/,:](.*)\//;
		var match = userNameRegexp.exec(repoUrl);
		return match && match[1].split('/')[0];
	}

	//get the repoName
	findRepoName(){
		var repoUrl = this.repoUrl; 
		var userName = this.userName || this.findUserName();
		//without username we can't find the repo name
		if (!userName)
			return null;

		var repoNameRegexp = new RegExp("github.com[/,:]" + userName + "/(.*)($/?)?");
		var match = repoNameRegexp.exec(repoUrl);
		return match && match[1] && match[1].replace('.git','').split('/')[0];
	}
}
