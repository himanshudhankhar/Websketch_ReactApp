

class InputValidation{

	constructor(){
	}

	validate(validRules, value){
		var valid = true;
		for(var i=0; i<validRules.length; i++){
			valid = valid && validationTypes[validRules[i]](value);
		}
		return valid;
	}

	isValid(validateObj){
		var val = false;
		for(val in Object.values(validateObj)){
			if(!val){
				return false;
			}
		}
		return true;
	}

}

const validationTypes = {
	"Email": function(val){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return val != undefined && val != null && val.length > 0 && re.test(val.toLowerCase());
	},
	"NotBlank": function(val){
		return val != undefined && val != null && val.length > 0;
	},
	"Number": function(val){
		return Number.isInteger(val);
	},
	"Decimal": function(val){
		return true;
	},
	"Password": function(val){
		return val.length > 8;
	}
}

const validation = new InputValidation();

export {validation};
