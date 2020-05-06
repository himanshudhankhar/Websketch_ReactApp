import React from 'react';
import './css/Website.css';

import {EditorLink} from './utils/EditorToolComponents';

class Website extends React.Component{

	constructor(props){
		super(props);
	}

	render(){
		return (
		    <div>
				<header>
				This is my website!
				</header>

				<main>
					<EditorLink classNames={"col-2"} linkText={"Home"} url="home"/>
					<EditorLink classNames={"col-2"} linkText={"Service"} url="service"/>
					<EditorLink classNames={"col-2"} linkText={"Login"} url="login"/>
					<EditorLink classNames={"col-2"} linkText={"Forgot"} url="forgot"/>
					<EditorLink classNames={"col-2"} linkText={"Reset"} url="reset"/>
					<EditorLink classNames={"col-2"} linkText={"Activate"} url="activate"/>
					<EditorLink classNames={"col-2"} linkText={"Logout"} url="logout"/>
					<EditorLink classNames={"col-2"} linkText={"Website"} url=""/>
				</main>

				<footer>
				Your copyright message
				</footer>
		    </div>
		  	);
		}
}

export default Website;
