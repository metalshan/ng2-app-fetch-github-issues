
import {Component, Input, OnChanges, NgIf} from 'angular2/core';
import {Loader} from '../loader'
@Component({
  	selector: 'avatar',
		directives: [Loader, NgIf],
		template: `
		<div>
			<loader></loader>
		<img src="{{avatarUrl}}" class="avatar-img" />
		</div>
	    `
})

export class Avatar implements OnChanges{
	@Input() userName:string;

	githubUserInfoApi = "https://api.github.com/users/:userName";
	avatarUrl: string;
	isDetailsFetchingInProfress: bool = false;
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
		this.isDetailsFetchingInProfress = true;
		return $.ajax(this.githubUserInfoApi.replace(':userName', this.userName));
	}

	fetchAvatar(userInfo){
		this.isDetailsFetchingInProfress = false;
		this.avatarUrl = userInfo && userInfo.avatar_url;
	}
}
