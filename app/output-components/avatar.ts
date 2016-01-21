
import {Component, Input, OnChanges} from 'angular2/core';
@Component({
  	selector: 'avatar',
	template: `
		<div>
		<img src="{{avatarUrl}}" class="avatar-img"/>
		</div>
	    `
})

export class Avatar implements OnChanges{
	@Input() userName:string;

	githubUserInfoApi = "https://api.github.com/users/:userName";
	avatarUrl: string;

	ngOnChanges(inputChanges) {
		if(this.userName)
			this.createAvatar();
	}

	//utils
	createAvatar(){
		var userDetailsPromise = this.fetchGithubUserDetails();
		userDetailsPromise.then(this.fetchAvatar.bind(this);
	}

	fetchGithubUserDetails(){
		return $.ajax(this.githubUserInfoApi.replace(':userName', this.userName));
	}

	fetchAvatar(userInfo){
		this.avatarUrl = userInfo && userInfo.avatar_url;
	}
}
