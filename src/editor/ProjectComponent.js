
import React from 'react';

class ProjectComponent extends React.Component{

	projectName = '';
	owner = {};

	constructor(props){
		super(props);
		this.state = this.props.data;
	}
}
