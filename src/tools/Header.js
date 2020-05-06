
import React from 'react';
import '../css/Header.css';
import LeftMenu from './LeftMenu';
import {FaLaptop, FaMobileAlt, FaBolt, FaGithub, FaCloudUploadAlt } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi'

class Header extends React.Component{

	constructor(props){
		super(props);
		this.state = {leftMenuShow: false, leftMenuCenter: 0};
		this.onLogoClick = this.onLogoClick.bind(this);
	}

	componentDidMount(){

	}

	onLogoClick(e){
		var centerOffset = e.target.offsetWidth/2;
		this.setState({leftMenuShow: !this.state.leftMenuShow, leftMenuCenter: centerOffset});
	}

	render(){
		return(
			<div className={"HeaderContainer zero-padd floatLeft col-12 back-mattblack "
			+(this.props.headerShow ? 'show' : 'hide')}>
				<div className="actionCursor HeaderLogo HeaderMenu white-opaque-border floatLeft col-2 text-center"
				onClick = {this.onLogoClick}>
					Webketch
				</div>
				<LeftMenu leftMenuShow={this.state.leftMenuShow} leftMenuCenter={this.state.leftMenuCenter}/>
				<div className="Resolution HeaderMenu white-opaque-border floatLeft col-2">
					<div className="actionCursor floatLeft col-6 zero-padd ScreenLaptop text-center"><FaLaptop /></div>
					<div className="actionCursor floatLeft col-6 zero-padd ScreenMobile text-center"><FaMobileAlt /></div>
				</div>
				<div className="CompileActions HeaderMenu white-opaque-border floatLeft col-3">
					<div className="actionCursor floatLeft col-4 zero-padd Compile text-center"><FaBolt /></div>
					<div className="actionCursor floatLeft col-4 zero-padd GitIntegration text-center"><FaGithub /></div>
					<div className="actionCursor floatLeft col-4 zero-padd Marketplace text-center"><FaCloudUploadAlt /></div>
				</div>
				<div className="Search HeaderMenu white-opaque-border col-2 zero-padd floatLeft text-center">
					<input className="winput" type="text" placeholder="Search Your Sheet"/>
				</div>
				<div className="User HeaderMenu white-opaque-border-left col-1 zero-padd floatRight text-center">
					<div className="actionCursor floatLeft col-6 zero-padd Settings text-center"><MdSettings /></div>
					<div className="actionCursor floatLeft col-6 zero-padd Logout text-center"><FiLogOut /></div>
				</div>
			</div>
		);
	}
}

export default Header;
