import React from 'react';
import {EditorInput, EditorButton, EditorLink} from './utils/EditorToolComponents';
import {commonUtil} from './tools/CommonUtils';
import {sdk} from './tools/EditorSDK';
import {validation} from './utils/InputValidation';

class RegisterApp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			fullName: "",
			userName: "",
			passText: "",
			confirmPassText: "",
			validate: {'fullName' : true, 'userName': true, 'passText': true, 'confirmPassText': true}
		}
		this.validation = {
			fullName: ["NotBlank"],
			userName: ["Email"],
			passText: ["NotBlank", "Password"],
			confirmPassText: ["NotBlank", "Password"]
		}
		this.setFullName = this.setFullNameValue.bind(this);
		this.setUserName = this.setUserNameValue.bind(this);
		this.setPassword = this.setPasswordValue.bind(this);
		this.setConfirmPassword = this.setConfirmPasswordValue.bind(this);
		this.register = this.addUserOnSubmit.bind(this);
	}

	setFullNameValue(event){
		var validateObj = this.state.validate;
		validateObj['fullName'] = validation.validate(this.validation['fullName'], event.target.value);
		this.setState({fullName: event.target.value, validate: validateObj});
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

	setConfirmPasswordValue(event){
		var validateObj = this.state.validate;
		validateObj['confirmPassText'] = validation.validate(this.validation['confirmPassText'], event.target.value);
		this.setState({confirmPassText: event.target.value, validate: validateObj});
	}

	addUserOnSubmit(){
		var fullName = this.state.fullName;
		var userName = this.state.userName;
		var passText = this.state.passText;
		var confirmPass = this.state.confirmPassText;
		if(validation.isValid(this.state.validate) && passText === confirmPass){
			const passTextHashed = commonUtil.getHashedDigest(passText);

			sdk.addUser(fullName, userName, passTextHashed, function(resp){
				if(resp.actionSuccess){
					commonUtil.redirect("login");
				}
			});
		}
	}

	render(){
		return(
			<div className="UserAppContainer zero-padd col-9 floatCenter">
				<div className="UserAppHead zero-padd col-12 floatCenter text-center">Register</div>

				<EditorInput classNames={""} type={"text"} width={"12"} validated={this.state.validate['fullName']}
				errorMsg={"Please provide a valid name"}
				name={"fullName"} placeholder={"Full Name"} setValue={this.setFullName}/>

				<EditorInput classNames={""} type={"email"} width={"12"} validated={this.state.validate['userName']}
				errorMsg={"Please provide a valid email"}
				name={"username"} placeholder={"User Name/Email Address"} setValue={this.setUserName}/>

				<EditorInput classNames={""} type={"password"} width={"12"} validated={this.state.validate['passText']}
				errorMsg={"Please provide a valid password"}
				name={"password"} placeholder={"Password"} setValue={this.setPassword}/>

				<EditorInput classNames={""} type={"password"} width={"12"} validated={this.state.validate['confirmPassText']}
				errorMsg={"Please provide a valid password"}
				name={"confirmPassword"} placeholder={"Confirm Password"} setValue={this.setConfirmPassword}/>

				<EditorButton classNames={""} width={"12"} text="Register" onClickAction={this.register} />

				<div className="UserAppLinks zero-padd col-12 floatLeft">
					<EditorLink classNames={"col-12"} linkText={"Already a member? Login"} url="login"/>
				</div>
			</div>
		);
	}
}

export default RegisterApp;
