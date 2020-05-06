
import React from 'react';
import './css/Editor.css';
import './css/common.css';
import './css/inputs.css';
import './css/color.css';
import './css/Playground.css';
import {DropdownButton, Dropdown, Button} from 'react-bootstrap';
import {Service} from './tools/Service';
import {DateTimeFormatter} from './tools/DateTimeFormatter';

class Playground extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			services: [],
			selectedService: {},
			slectedSubServices: [],
			slectedSubServiceName: "",
			argsObj: {},
			serviceReponse: {},
			diff: 0
		};
		this.selectService = this.selectService.bind(this);
		this.selectSubService = this.selectSubService.bind(this);
		this.triggerService = this.triggerCurrentService.bind(this);
		this.handleArgsChange = this.handleArgsChange.bind(this);
	}

	loadServices(){
		let service = new Service("/services", "/getAll");
		var self = this;
		service.call(function(resp){
			self.setState({services: resp.services,
				selectedService: resp.services[0],
				slectedSubServices: Object.keys(resp.services[0].services),
				argsObj: {}});
			//console.log(self.state);
		});
	}

	componentDidMount(){
		this.loadServices();
	}

	selectService(val){
		let serv = {};
		for(var i=0; i < this.state.services.length; i++){
			if(this.state.services[i].serviceName === val){
				serv = this.state.services[i];
				break;
			}
		}
		var subservs = Object.keys(serv.services);
		this.setState({selectedService : serv, slectedSubServices : subservs, slectedSubServiceName: "", argsObj: {}});
		console.log(this.state.selectedService);
	}

	selectSubService(val){
		this.setState({slectedSubServiceName: val});
		if(this.state.slectedSubServiceName != ""){
			let argsVal = this.state.selectedService.services[val];
			let argsObject = {};
			for(var i=0; i<argsVal.length; i++){
				argsObject[argsVal[i]] = "";
			}
			this.setState({argsObj: argsObject});
		}
	}

	handleArgsChange(event){
		let obj = this.state.argsObj;
		obj[event.target.name] = event.target.value;
		this.setState({argsObj: obj});
	}

	triggerCurrentService(){
		let start = new Date().getTime();
		let serviceObj = {};
		serviceObj.service = this.state.selectedService.serviceName;
		serviceObj.subService = this.state.slectedSubServiceName;
		serviceObj.args = this.state.argsObj;
		console.log(serviceObj);
		let service = new Service(serviceObj.service, serviceObj.subService, serviceObj.args);
		var self = this;
		service.call(function(response){
			let end = new Date().getTime();
			self.setState({serviceReponse: response, diff: end-start});
		});
	}

	render(){
		let formatter = new DateTimeFormatter();
		return(
			<div className="PlaygroundApp col-12 floatLeft zero-padd">
				<div className="Services col-5 floatLeft zero-padd">
					<div className="col-12 floatLeft">
						<DropdownButton className="wdropdown" title="Service" onSelect={this.selectService}>
							{this.state.services.map((service) => <Dropdown.Item key={service.serviceName}
							eventKey={service.serviceName} value={service.serviceName}>{service.serviceName}</Dropdown.Item>)}
						</DropdownButton>
					</div>
					<div className="SelectedService col-12 floatLeft">
						<div className="ServiceName">{this.state.selectedService.serviceName}</div>
						<div className="subService">
							<DropdownButton className="wdropdown" title="Sub Service" onSelect={this.selectSubService}>
								{this.state.slectedSubServices.map((subservice) => <Dropdown.Item key={subservice}
								eventKey={subservice} value={subservice}>{subservice}</Dropdown.Item>)}
							</DropdownButton>
						</div>
					</div>

					<div className="SelectedSubServiceArgs col-12 floatLeft">
						<div className="SelectedSubServiceName col-12 floatLeft">{this.state.slectedSubServiceName}</div>
						<div className="selectedSubServiceArgInputs col-12 floatLeft">
							{this.state.slectedSubServiceName === "" ? "" : this.state.selectedService.services[this.state.slectedSubServiceName].map((argName) => <div
								key={argName} className="input-group input-group-sm mb-3"><div className="input-group-prepend"><span
								className="input-group-text">{argName}</span></div><input type="text"
								className="form-control" aria-label="argName" name={argName} onChange={this.handleArgsChange}
								aria-describedby="inputGroup-sizing-sm"/>
								</div>)}
						</div>
						<div className="TriggerService">
							{this.state.slectedSubServiceName === "" ? "" : <Button variant="warning" onClick={this.triggerService}>Send</Button>}
						</div>
					</div>
				</div>
				<div className="Output col-6 floatLeft zero-padd">
					<div className="TimeReceived floatLeft col-6">{formatter.formatDateTime(new Date())}</div>
					<div className="TimeDiff floatLeft col-6">{'took - '+this.state.diff + ' - millisec'}</div>
					<div className="JsonResponse floatLeft col-12"><pre>{JSON.stringify(this.state.serviceReponse, null, 2) }</pre></div>
				</div>
			</div>
		);
	}
}

export default Playground;
