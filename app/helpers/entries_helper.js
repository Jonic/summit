exports.getEntryById = function (req, res, next) {

	var user = req.user;
	var entries = req.entries;
	var entryId = req.params.entryId;

	req.entry = entries.filter(function (entry) {
		return entry._id.toString() === entryId;
	})[0];

    next();

};