
import React from 'react';
import {commonUtil} from '../tools/CommonUtils';
import {validation} from './InputValidation';

import '../css/inputs.css';

class EditorButton extends React.Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className={"Wbtn col-"+this.props.width+ " "+this.props.classNames} onClick={this.props.onClickAction}>
				{this.props.text}
			</div>
		);
	}
}

class EditorInput extends React.Component{

	constructor(props){
		super(props);
		this.state = {value: ""};
	}

	render(){
		let error;

		return(
			<div className={"WinputWrap zero-padd col-"+this.props.width+ " "+this.props.classNames}>
				<input className="Winput" name={this.props.name} type={this.props.type}
					placeholder={this.props.placeholder}
					onClick={this.props.setValue} onChange={this.props.setValue}/>
				<EditorError validated={this.props.validated} errorMsg={this.props.errorMsg}/>
			</div>
		);
	}
}

class EditorLink extends React.Component{

	constructor(props){
		super(props);
		this.onLinkClick = this.onClickAction.bind(this);
	}

	onClickAction(event){
		commonUtil.redirect(this.props.url);
	}

	render(){
		return(
			<div className={"Wlink zero-padd floatLeft text-center "+this.props.classNames}
				onClick={this.onLinkClick}>{this.props.linkText}</div>
		);
	}
}

class EditorError extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		if(this.props.validated){
			return null;
		}
		return(
			<>
				<div className="WErrorInput col-12 floatLeft">{this.props.errorMsg}</div>
				<div className="clearBoth"></div>
			</>
		);
	}
}

export {EditorInput, EditorButton, EditorLink, EditorError};
