import React from 'react';
import WebketchComponent from './WebketchComponent';

/*
a component on top of WebketchComponent that has additional features
to perform CRUD on WebketchComponent data.

This functionality will not be available in prod mode.

EditorApp works with this component not with WebketchComponent

*/
class EditorComponent extends React.Component{

	constructor(props){
		super(props);
	}

	componentDidMount(){

	}

	componentWillUnmount(){

	}

	componentDidUpdate(prevProps, prevState){

	}

	//used to get data from backend again to re-render
	//the component
	refreshComponent(){

	}

	render(){
		return(
			<WebketchComponent data={this.props.data}/>
		);
	}
}

export default EditorComponent;
