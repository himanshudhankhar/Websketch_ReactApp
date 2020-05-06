import React from 'react';
import {EditorInput, EditorButton, EditorLink} from './utils/EditorToolComponents';
import {commonUtil} from './tools/CommonUtils';
import {sdk} from './tools/EditorSDK';
import {validation} from './utils/InputValidation';

class ForgotApp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userName: "",
			validate: {'userName': true}
		}
		this.validation = {
			userName: ["Email"]
		}
		this.setUserName = this.setUserNameValue.bind(this);
		this.forgot = this.startForgotPasswordOnSubmit.bind(this);
	}

	setUserNameValue(event){
		var validateObj = this.state.validate;
		validateObj['userName'] = validation.validate(this.validation['userName'], event.target.value);
		this.setState({userName: event.target.value, validate: validateObj});
	}

	startForgotPasswordOnSubmit(){
		var userName = this.state.userName;
		if(validation.isValid(this.state.validate)){
			sdk.forgotPassword(userName, function(resp){
				if(resp.actionSuccess){
					commonUtil.redirect("login");
				}
			});
		}
	}

	render(){
		return(
			<div className="UserAppContainer zero-padd col-9 floatCenter">
				<div className="UserAppHead zero-padd col-12 floatCenter text-center">Forgot Password</div>

				<EditorInput classNames={""} type={"email"} width={"12"} validated={this.state.validate['userName']}
				errorMsg={"Please provide a valid email"}
				name={"username"} placeholder={"User Name/Email Address"} setValue={this.setUserName}/>

				<EditorButton classNames={""} width={"12"} text="Forgot Password" onClickAction={this.forgot} />

				<div className="UserAppLinks zero-padd col-12 floatLeft">
					<EditorLink classNames={"col-12"} linkText={"Remember Password? Login"} url="login"/>
				</div>
			</div>
		);
	}
}

export default ForgotApp;
