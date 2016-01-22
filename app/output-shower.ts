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
	@Input() repoUrl: string;

	public userName: string;
	public repoName: string;

	ngOnChanges(inputChanges){
		this.reset();
		this.userName = this.findUserName();
		this.repoName = this.findRepoName();
	}

	//utility functions
	reset(){
		this.userName = null;
		this.repoName = null;
	}

	findUserName(){
		var repoUrl = this.repoUrl; 
		var userNameRegexp = /github.com[/,:](.*)\//;
		var match = userNameRegexp.exec(repoUrl);
		return match && match[1].split('/')[0];
	}

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
