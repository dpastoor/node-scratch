// from https://github.com/getify/You-Dont-Know-JS/blob/master/kickstarter-survey-site/server.js
// goal in promise-style is to express code in a declarative way so you can understand control flow
// and if don't have that then you should be looking for a different set of abstractions

function doGetProfile(req,res) { // request and response stream
	// collectPostData generates and gives back ASQ sequence
	collectPostData(req)
	.val(processJSONPostData) // take that sequence and process it sync style and pass
	// along processed data
	.val(function(sessionData){
		return sessionData.session_id;
	}) // get session data and pass along the session ID
	.seq(validateSession) // now validate session ASYNC so use seq
	// which means fire off a function that will give back a sequence
	// validateSession gets a session_id and returns back a promised sequence
	// and returns back a sessionID if validated else error which would propogate to .or
	.val(function(sessionID){
		return sessions[sessionID].user_id;
	})  // in this case pull out user_id from session table 
	.seq(retrieveProfile) // async retrieval of user_id from redis etc
	// when it finishes it sends back profile data
	.val(function(profileData){
		res.end(JSON.stringify({
			profile: profileData
		}));
	}) // finally ready to send back profile data as JSON back to the server
	.or(function(err){
		res.end(jsonError(err));
	});
}

function processJSONPostData(data) {
	try {
		data = JSON.parse(data);
		return data;
	}
	catch (err) {
		throw "Invalid or missing data";
	}
}

function validateSession(sessionID) {
	return ASQ()
	.val(function(){
		if (checkSessionID(sessionID)) {
			return sessionID;
		}
		else {
			throw "Session invalid";
		}
	});
}

function retrieveProfile(userID) {
	return ASQ()
	.seq(
		getFromDB(
			/*key=*/"user:" + userID,
			/*fields=*/[
				"pick_shirt", "pick_game", "pick_shipping", "email",
				"name", "twitter", "phone", "credit", "pledge_amount",
				"reward_level", "shirt_size", "shipping"
			]
		)
	)
	.val(function(profileData){
		return {
			pick_shirt: (profileData.pick_shirt === "true"),
			pick_game: (profileData.pick_game === "true"),
			pick_shipping: (profileData.pick_shipping === "true"),
			profile_email: profileData.email || "",
			profile_name: profileData.name || "",
			profile_twitter: profileData.twitter || "",
			profile_phone: profileData.phone || "",
			profile_credit: profileData.credit || "",
			profile_pledge_amount: profileData.pledge_amount || "0.00",
			profile_reward_level: profileData.reward_level || "n/a",
			profile_shirt_size: profileData.shirt_size || "",
			profile_shipping: profileData.shipping ?
				profileData.shipping :
				{
					domestic: true,
					address: "",
					city: "",
					state: "",
					zip: ""
				}
		};
	});
}