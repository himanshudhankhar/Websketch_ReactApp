import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Website from './Website';
import Playground from './Playground'
import EditorApp from './EditorApp';
import UserApp from './UserApp';
import LoginApp from './LoginApp';
import RegisterApp from './RegisterApp';
import ForgotApp from './ForgotApp';
import ResetApp from './ResetApp';
import ActivateApp from './ActivateApp';
import dotenv from 'dotenv';
import {ProtectedComponent} from './ProtectedComponent';
import {logOut} from './AuthenticationService';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	useParams,
	useHistory
  } from "react-router-dom";
  
  dotenv.config();
function getUrlVars() {
	var url = window.location.href.split(/[?#]/)[0]
	var parts = url.split('/');
	var part = parts.length > 3 ? parts[3] : "";
	return part;
}

ReactDOM.render(
	<Router>
	  <Switch>
		  
		<Route exact path="/home"  component={()=>{return <ProtectedComponent component={EditorApp} />}}   />

		 
		<Route exact path="/service">
<ProtectedComponent component={Playground} />
		</Route>
		 
		<Route exact path="/login"  component={()=>{return <UserApp container={<LoginApp />} /> }}/>
		
	 

		<Route exact path="/register">
		<UserApp container={<RegisterApp />} />
		</Route>


		<Route exact path="/forgot">
		<UserApp container={<ForgotApp />} />
		</Route>

<Route exact path="/reset"  component={()=>{return <ProtectedComponent component={ ()=>   {return  <UserApp container={<ResetApp />} /> }}  /> }}/> 
		{/* <UserApp container={<ResetApp />} />
		</Route> */}

		<Route exact path="/activate">
		<ProtectedComponent component={()=>{return ActivatedUserApp()} }/>
		</Route>

		<Route exact path="/logout"  component={Logout} />
		 

		<Route exact path="/">
		<Website />
		</Route>

		</Switch>
	</Router>,
	document.getElementById('root')
  );


  function Logout(){
	logOut();
return <Website />

  }

    

  function ActivatedUserApp(){

return (<UserApp container={<ActivateApp />} />);

  }