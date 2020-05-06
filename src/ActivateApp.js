import React from 'react';
import {EditorInput, EditorButton, EditorLink} from './utils/EditorToolComponents';
import {commonUtil} from './tools/CommonUtils';
import {sdk} from './tools/EditorSDK';
import {validation} from './utils/InputValidation';

class ActivateApp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userId: "",
			activationCode: "",
			errorUrl: false,
			validate: {'userId': true, 'activationCode': true}
		}
		this.validation = {
			userId: ["NotBlank"],
			activationCode: ["NotBlank"]
		}
	}

	componentDidMount(){
		const urlParams = new URLSearchParams(window.location.search);
		if(!urlParams.has('x') && !urlParams.has('y')){
			this.setState({errorUrl: true});
		}else{
			var validateObj = this.state.validate;
			let userId = urlParams.get('x');
			let activationCode = urlParams.get('y');
			validateObj['userId'] = validation.validate(this.validation['userId'], userId);
			validateObj['activationCode'] = validation.validate(this.validation['activationCode'], activationCode);
			if(validation.isValid(validateObj)){
				sdk.activateUser(userId, activationCode, function(resp){
					if(resp.actionSuccess){
						commonUtil.redirect("login");
					}else{
						this.setState({errorUrl: true});
					}
				});
			}else{
				this.setState({errorUrl: true});
			}
		}
	}

	setUserNameValue(event){
		this.setState({userName: event.target.value});
	}

	render(){
		var head = this.state.errorUrl ? 'Wrong URL' : 'Activate User';
		return(
			<div className="UserAppContainer zero-padd col-9 floatCenter">
				<div className="UserAppHead zero-padd col-12 floatCenter text-center">{head}</div>
			</div>
		);
	}
}

export default ActivateApp;
