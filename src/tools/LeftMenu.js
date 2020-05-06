
import React from 'react';
import '../css/LeftMenu.css';
import { Button } from 'react-bootstrap';

class LeftMenu extends React.Component{

	constructor(props){
		super(props);
		this.state = {width: 230};
	}

	componentDidMount(){
		//get all projects and sheets
	}

	render(){
		return (
			<div className={"LeftMenuContainer floatLeft back-mattblack "
			+(this.props.leftMenuShow ? 'show' : 'hide')}
			style={{'left': `${this.props.leftMenuCenter - this.state.width/2 - 2}px`, 'width': `${this.state.width}px`}}>
				<div className="LeftMenuDiv col-12 floatLeft">

					<div className="ProjectHeader">
						<input className="ProjectName winput" type="text"
						placeholder="Project Name"/>
						{/*<Button className="AddProject wbtn" variant="outline-primary" size="sm">Add Project</Button>*/}
					</div>
				</div>
			</div>
		);
	}
}

export default LeftMenu;
