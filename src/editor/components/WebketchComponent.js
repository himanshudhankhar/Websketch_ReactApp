
import React from 'react';
import '../../css/components/WebketchComponent.css';

class WebketchComponent extends React.Component{

	name = '';
	userDefinedName = '';

	constructor(props){
		super(props);
		this.state = this.props.data.State;
		this.Props = this.props.data.Props;
		this.name = this.props.data.ComponentName;
		this.userDefinedName = this.props.data.ComponentName.split("_")[1];
	}

	componentDidMount(){

	}

	componentWillUnmount(){

	}

	componentDidUpdate(prevProps, prevState){

	}
/*
	shouldComponentUpdate(nextProps, nextState){

		return true;
	}
*/
	render(){
		return(
			<div className={"WebketchComponent"}>
				<div>{"Component Actual Name - "+this.name}</div>
				<div>{"Component Name - "+this.userDefinedName}</div>
			</div>
		);
	}
}

export default WebketchComponent;
