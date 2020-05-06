
import React from 'react';

import './css/UserApp.css';
import './css/fonts.css';

class UserApp extends React.Component{

	render(){
		return(
			<div className="UserApp zero-padd col-12 floatLeft">
				<div className="UserAppPromo zero-padd col-12 col-md-9 floatLeft">
					<div className="WebketchHeading col-12 col-md-6 floatCenter text-center">
						Webketch
					</div>
					<div className="UserAppSlogan col-12 col-md-6 floatCenter text-center">
						Design it your way
					</div>
				</div>
				<div className="UserAppWrap zero-padd col-12 col-md-3 floatLeft">
					{this.props.container}
				</div>
			</div>
		);
	}
}

export default UserApp;
