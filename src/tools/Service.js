import axios from 'axios';

class Service {

	constructor(service, action, request) {
		this.service = process.env.REACT_APP_BACKENEDURL + (service + action);
		this.request = request;
	}

	call(resolve) {
		
		fetch(this.service, {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: {
					'Content-Type': 'application/json'
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				body: JSON.stringify(this.request) // body data type must match "Content-Type" header
			})
			.then(res => res.json())
			.then((result) => {
				if (result.responseStatus === 'OK') {
					resolve(result);
				} else {
					console.log("failed response");
					console.log(result);
				}
			}, (error) => {
				//handle error here
				console.log("errored response");
				console.log(error);
			});
	};
}

export {
	Service
};


class AnotherService {
	constructor(service, action, request) {
		this.service = process.env.REACT_APP_BACKENEDURL + (service + action);
		this.request = request;
	}

	call(resolve) {



		axios.post(this.service, this.request,{withCredentials:true})
			.then((result) => {
				//  console.log(result);
 
				if (result.statusText === 'OK') {
					resolve(result);
				} else {
					console.log("failed response");
					console.log(result);
				}
			}).catch((error) => {
				//handle error here
				console.log("errored response");
				console.log(error);
			});


	}
}

export {AnotherService};