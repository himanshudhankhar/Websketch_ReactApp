
class DateTimeFormatter{

	formatDateTime(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var sec = date.getSeconds();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ':' + sec + ' ' + ampm;
		return (date.getMonth()+1) + "-" + date.getDate() + "-" + date.getFullYear() + "  " + strTime;
	}
}

export {DateTimeFormatter};
