
class CommonUtils{

	constructor(){
	}

	redirect(url){
		window.location.href = url;
	}

	getHashedDigest(plainText){
		const crypto = require('crypto');
		const hash = crypto.createHash('sha512');
		hash.update(plainText);
		return hash.digest('hex');
	}
}

const commonUtil = new CommonUtils();

export {commonUtil};
