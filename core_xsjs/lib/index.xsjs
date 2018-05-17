//$.response.contentType = "text/plain";

//$.response.setBody("Hello World");
"use strict";
var conn = $.hdb.getConnection();


var query = "SELECT * FROM \"LearnUI5.db.data::tables.mycorn\"";
var body = "";
try{
var rs = conn.executeQuery(query);



for(var i = 0; i < rs.length; i++){
body += rs[i]["_PRODUCT"];
}
}
catch (error) {
	console.log(error.message);
	body =error.message;
}


$.response.setBody(body);
$.response.contentType = "application/vnd.ms-excel; charset=utf-16le";
$.response.headers.set("Content-Disposition",
  "attachment; filename=Excel.xls");
$.response.status = $.net.http.OK;