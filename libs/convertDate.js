function convertDate(date) {
		var arr;

		if(!date) {
			date = new Date();
		} else {
			arr = date.split(".");
			date = new Date(+arr[2], +arr[1] - 1, +arr[0]);
		}

		return date;
}

exports.convertDate = convertDate;