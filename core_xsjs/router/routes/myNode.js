/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
"use strict";
var express = require("express");

module.exports = function() {
	var app = express.Router();

	//Hello Router
	app.get("/", function(req, res) {
		res.send("Hello World Node.js");
	});
	app.get("/select/corn", function(req, res) {
//	console.log(dataAcees.getTopDateFromTable(req.db,"TABLE"));      
		console.log("select corn start");
var client = req.db;
client.prepare(
	"SELECT * FROM \"LearnUI5.db.data::tables.mycorn\" ORDER BY \"_DATE\" ASC;" ,
	function(err, statement) {
		if (err) {			
			res.type("text/plain").status(500).send("ERROR: " + err.toString());	return;	}
	statement.exec([],
		function(err, results) {
			if (err) {			
				res.type("text/plain").status(500).send("ERROR: " + err.toString());	return;						

		} else {							
			var result = JSON.stringify({ Objects: results});					
			//console.log(result);
			res.type("application/json").status(200).send(result);
		}
		});
	});
});
	return app;
};


