import React from 'react';
import {EditorInput, EditorButton, EditorLink} from './utils/EditorToolComponents';
import {commonUtil} from './tools/CommonUtils';
import {sdk} from './tools/EditorSDK';
import {validation} from './utils/InputValidation';

class ResetApp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userId: "",
			resetToken: "",
			resetCode: "",
			passText: "",
			confirmPassText: "",
			errorUrl: false,
			validate: {'userId' : true, 'resetToken': true, 'resetCode': true, 'passText': true, 'confirmPassText': true}
		}
		this.validation = {
			userId: ["NotBlank"],
			resetToken: ["NotBlank"],
			resetCode: ["NotBlank"],
			passText: ["NotBlank", "Password"],
			confirmPassText: ["NotBlank", "Password"]
		}
		this.setResetCode = this.setResetCodeValue.bind(this);
		this.setPassword = this.setPasswordValue.bind(this);
		this.setConfirmPassword = this.setConfirmPasswordValue.bind(this);
		this.resetPassword = this.resetPasswordOnSubmit.bind(this);
	}

	componentDidMount(){
		const urlParams = new URLSearchParams(window.location.search);
		if(!urlParams.has('x') && !urlParams.has('y')){
			this.setState({errorUrl: true});
		}else{
			var validateObj = this.state.validate;
			var x = urlParams.get('x');
			var y = urlParams.get('y');
			validateObj['userId'] = validation.validate(this.validation['userId'], x);
			validateObj['resetToken'] = validation.validate(this.validation['resetToken'], y);
			this.setState({userId: x, resetToken: y, validate: validateObj});
		}
	}

	setResetCodeValue(event){
		var validateObj = this.state.validate;
		validateObj['resetCode'] = validation.validate(this.validation['resetCode'], event.target.value);
		this.setState({resetCode: event.target.value, validate: validateObj});
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

	resetPasswordOnSubmit(){
		var userId = this.state.userId;
		var resetToken = this.state.resetToken;
		var resetCode = this.state.resetCode;
		var passText = this.state.passText;
		var confirmPass = this.state.confirmPassText;
		if(validation.isValid(this.state.validate) && passText === confirmPass){
			const passTextHashed = commonUtil.getHashedDigest(passText);

			sdk.resetPassword(userId, resetToken, resetCode, passTextHashed, function(resp){
				if(resp.actionSuccess){
					commonUtil.redirect("login");
				}
			});
		}
	}

	render(){
		var head = this.state.errorUrl ? 'Wrong URL' : 'Reset Password';
		return(
			<div className="UserAppContainer zero-padd col-9 floatCenter">
				<div className="UserAppHead zero-padd col-12 floatCenter text-center">{head}</div>

				<EditorInput classNames={""} type={"text"} width={"12"} validated={this.state.validate['resetCode']}
				errorMsg={"Please provide a valid code"}
				name={"resetCode"} placeholder={"Reset Code from Email"} setValue={this.setResetCode}/>

				<EditorInput classNames={""} type={"password"} width={"12"} validated={this.state.validate['passText']}
				errorMsg={"Please provide a valid password"}
				name={"password"} placeholder={"Password"} setValue={this.setPassword}/>

				<EditorInput classNames={""} type={"password"} width={"12"} validated={this.state.validate['confirmPassText']}
				errorMsg={"Please provide a valid password"}
				name={"confirmPassword"} placeholder={"Confirm Password"} setValue={this.setConfirmPassword}/>

				<EditorButton classNames={""} width={"12"} text="Reset Password" onClickAction={this.resetPassword} />

				<div className="UserAppLinks zero-padd col-12 floatLeft">

				</div>
			</div>
		);
	}
}

export default ResetApp;
