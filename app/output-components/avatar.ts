/**
	The avatar component
	Just taked the userName and shows the avatar after calling the userDetails
*/
import {Component, View, Input, OnChanges} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Loader} from '../loader'
@Component({
  	selector: 'avatar',
	directives: [Loader, CORE_DIRECTIVES],
	template: `
		<div>
			<loader *ngIf="isDetailsFetchingInProfress"></loader>
			<img src="{{avatarUrl}}" class="avatar-img" *ngIf="!isDetailsFetchingInProfress && avatarUrl"/>
		</div>
	    `

})

export class Avatar implements OnChanges{
	@Input() userName:string;

	githubUserInfoApi = "https://api.github.com/users/:userName";
	avatarUrl: string;
	isDetailsFetchingInProfress: bool = false;

	//to be called on input changes
	ngOnChanges(inputChanges) {
		this.avatarUrl = null;
		if(this.userName)
			this.createAvatar();
	}

	//utils
	createAvatar(){
		var userDetailsPromise = this.fetchGithubUserDetails();
		userDetailsPromise.then(this.fetchAvatar.bind(this);
	}

	//fetch the user details 
	fetchGithubUserDetails(){
		this.isDetailsFetchingInProfress = true;
		return $.ajax(this.githubUserInfoApi.replace(':userName', this.userName));
	}

	//get the avatar image link from the fetched user details
	fetchAvatar(userInfo){
		this.isDetailsFetchingInProfress = false;
		this.avatarUrl = userInfo && userInfo.avatar_url;
	}
}
