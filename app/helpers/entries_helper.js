exports.getEntryById = function (req, res, next) {

	var diaryUser = req.user;
	var entryId = req.params.entryId;

	var entry = diaryUser.diary[0].entries.filter(function (entry) {
		return entry._id.toString() === entryId;
	})[0];

    req.diaryEntry = entry;

    next();

}
