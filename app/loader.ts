/**
	This is a simple loader component.
	This has not been used multiple times due to a bug in Angular beta.
	CSS is taken from ./styles/loader.css
*/

import {Component} from 'angular2/core';
@Component({
	selector: 'loader',
	template: `

		<ul class="loader">
			<li></li>
			<li></li>
			<li></li>
		</ul>
	    `
})

export class Loader {

}
