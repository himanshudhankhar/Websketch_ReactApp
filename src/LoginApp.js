
import React from 'react';
import {EditorInput, EditorButton, EditorLink} from './utils/EditorToolComponents';
import {commonUtil} from './tools/CommonUtils';
import {sdk} from './tools/EditorSDK';
import {validation} from './utils/InputValidation';
import {useHistory , useLocation} from 'react-router-dom';
class LoginApp extends React.Component{
	
	constructor(props){
		super(props);
	 
		this.state = {
			userName: "",
			passText: "",
			validate: {'userName' : true, 'passText': true}
		}
	
		this.validation = {
			userName: ["Email"],
			passText: ["NotBlank", "Password"]
		}
		this.setUserName = this.setUserNameValue.bind(this);
		this.setPassword = this.setPasswordValue.bind(this);
		this.login = this.authOnSubmit.bind(this);
	}

	setUserNameValue(event){
		var validateObj = this.state.validate;
		validateObj['userName'] = validation.validate(this.validation['userName'], event.target.value);
		this.setState({userName: event.target.value, validate: validateObj});
	}

	setPasswordValue(event){
		var validateObj = this.state.validate;
		validateObj['passText'] = validation.validate(this.validation['passText'], event.target.value);
		this.setState({passText: event.target.value, validate: validateObj});
	}

	authOnSubmit(){
		console.log(process.env);
		var userName = this.state.userName;
		var passText = this.state.passText;
		var self =this;
		if(validation.isValid(this.state.validate)){
			const passTextHashed = commonUtil.getHashedDigest(passText);

			sdk.authenticate(userName, passTextHashed, function(resp){
				console.log(resp);
				var data = resp.data;
				if(data.actionSuccess && ('authenticated' in data) && data.authenticated){
					 commonUtil.redirect("home");
					//  self.setState({redirectTohome:true});
					 
   
				}else{
					console.log("stay here");
					//   commonUtil.redirect("login");
				}
			});
		}
	}

	render(){
		return(
			<div className="UserAppContainer zero-padd col-9 floatCenter">
				<div className="UserAppHead zero-padd col-12 floatCenter text-center">Login</div>

				<EditorInput classNames={""} type={"email"} width={"12"} validated={this.state.validate['userName']}
				errorMsg={"Please provide a valid email"}
				name={"username"} placeholder={"User Name/Email Address"} setValue={this.setUserName}/>

				<EditorInput classNames={""} type={"password"} width={"12"} validated={this.state.validate['passText']}
				errorMsg={"Please provide a valid password"}
				name={"password"} placeholder={"Password"} setValue={this.setPassword}/>

				<EditorButton classNames={""} width={"12"} text="Login" onClickAction={this.login} />

				<div className="UserAppLinks zero-padd col-12 floatLeft">
					<EditorLink classNames={"col-12 col-md-6"} linkText={"Forgot Password?"} url="forgot"/>
					<EditorLink classNames={"col-12 col-md-6"} linkText={"Register"} url="register"/>
				</div>
			</div>
		);
	}
}

export default LoginApp;
