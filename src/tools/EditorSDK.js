
import {Service , AnotherService} from './Service';

class EditorSDK{

	constructor(){
	}

	authenticate(userName, passText, callback){
		var service = new AnotherService("/user", "/authenticate", {'userName': userName, 'passText': passText});
		service.call(callback);
	}

	addUser(fullName, userName, passText, callback){
		var service = new Service("/user", "/add", {'fullName': fullName, 'userName': userName, 'passText': passText});
		service.call(callback);
	}

	forgotPassword(userName, callback){
		var service = new Service("/user", "/forgotPassword", {'userName': userName});
		service.call(callback);
	}

	resetPassword(userId, resetToken, resetCode, passText, callback){
		var service = new Service("/user", "/resetPassword", {'userId': userId, 'resetToken': resetToken,
			'resetCode': resetCode, 'passText': passText});
		service.call(callback);
	}

	activateUser(userId, activationCode, callback){
		var service = new Service("/user", "/activate", {'userId': userId, 'activationCode': activationCode});
		service.call(callback);
	}

	updatePassword(userId, currPass, updatedPass, callback){
		var service = new Service("/user", "/activate", {'userId': userId, 'currPass': currPass, 'updatedPass': updatedPass});
		service.call(callback);
	}
}

const sdk = new EditorSDK();

export {sdk};
