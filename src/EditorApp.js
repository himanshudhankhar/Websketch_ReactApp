
import React from 'react';
import logo from './logo.svg';
import './css/Editor.css';
import './css/common.css';
import './css/inputs.css';
import './css/color.css';
import Header from './tools/Header';
import Table from './tools/Table';
import EditorComponent from './editor/components/EditorComponent';

class EditorApp extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			headerShow : true,
			width: 0,
			height: 0};
		this.data = [
			{'ComponentName': 'u39482_somename', 'State': {'key': 'value'}, 'Props': {'propKey': 'propValue'}},
			{'ComponentName': 'u3943282_someothername', 'State': {'key': 'value'}, 'Props': {'propKey': 'propValue'}}
		];
		this.mouseMove = this.onMouseMoveEvent.bind(this);
		this.onClickHideMenus = this.onClickHideMenus.bind(this);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount(){
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	onMouseMoveEvent(e){
		if(e.nativeEvent.offsetY < 10){
			this.setState({headerShow: true});
		}
	}

	onClickHideMenus(e){
		if(e.target.id === 'SheetContainer'){
			this.setState({headerShow: false});
		}
	}

	// this should return an array of react elements
	renderSheetComponents(){
		let generatedComponents = [];
		for(var i=0; i<this.data.length; i++){
			generatedComponents.push(React.createElement(EditorComponent, {key: i, data:this.data[i]}, null));
		}
		return generatedComponents;
	}

	render(){
		let comps = this.renderSheetComponents();
	  	return (
		    <div className="Editor col-12 floatLeft zero-padd"
			onMouseMove={this.mouseMove}
			onClick = {this.onClickHideMenus}>

				<Header headerShow={this.state.headerShow}/>
				{/*<EditorComponent data={this.data}/>*/}
				<div className="clearBoth"></div>
				<div id="SheetContainer" className="SheetContainer zero-padd col-12 floatCenter"
				style={{'height': `${this.state.height}px`}}>
					{comps}
				</div>
		    </div>
	  	);
	}
}
export default EditorApp;
