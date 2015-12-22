"use strict";
var 	iconv = require('iconv-lite'),
		fs = require("fs");

	var Encode=function(name){
		fs.createReadStream("./csv/"+name)
			.pipe(iconv.decodeStream('win1251'))
			.pipe(iconv.encodeStream('utf8'))
			.pipe(fs.createWriteStream("./csv/utf8/"+name));
	}
	
	var files=["NSIVIEW.MANAGEMENT.csv","NSIVIEW.STA.csv","NSIVIEW.STA_RESERVE.csv","NSIVIEW.ROAD.csv","IAS.csv"];
	
	files.map(function(name){
		Encode(name)
	})
	
