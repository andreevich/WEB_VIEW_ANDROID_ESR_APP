"use strict";

var 	fs = require("fs"),
		sqlite3 = require('sqlite3').verbose(),
		func=require("./function.js");
		
	var date = new Date();
	var newNameDb = date.getFullYear()+"_"+(date.getMonth()+1)+"_"+date.getDate()
	fs.createReadStream('./db/esr_empty_.s3db').pipe(fs.createWriteStream('./db/esr_'+newNameDb+'.s3db'));	
	console.log("Создал базу "+newNameDb+'.s3db')
	
	

var t = func.getData({
		filename:"NSIVIEW.MANAGEMENT.csv",
		columnNames:[
			"MANAG_NO",
			"COUNTRY_NO",
			"MANAG_NAME",
			"M_NAME_RUS",
			"M_NAME_LAT"
		]
		})
var t2 = func.getData({
		filename:"NSIVIEW.STA.csv",
		columnNames:[
			"STA_NO",
			"STA_NAME",
			"MANAG_NO",
			"ROAD_NO",
			"DIV_NO"
		]
		})
var t3 = func.getData({
		filename:"NSIVIEW.STA_RESERVE.csv",
		columnNames:[
			"STA_NO",
			"STA_NAME",
			"MANAG_NO",
			"ROAD_NO",
			"DIV_NO"
		]
		})
var t4 = func.getData({
		filename:"NSIVIEW.ROAD.csv",
		columnNames:[
			"MANAG_NO",
			"ROAD_NO",
			"ROAD_NAME",
			"ROAD_SNAME"
		]
		})

var t5 = func.getData({
		filename:"IAS.csv",
		columnNames:[
			"IAS_ESR",
			"IAS_ID"
		]
		})

	
		
		
var db = new sqlite3.Database('./db/esr_'+newNameDb+'.s3db');	
db.serialize(function() {
		  db.run("BEGIN TRANSACTION");
		 
		  db.run("delete from manag");
		  db.run("DELETE FROM sqlite_sequence WHERE name = 'manag'");
		  db.run("delete from road");
		  db.run("DELETE FROM sqlite_sequence WHERE name = 'road'");
		  db.run("delete from station");
		  db.run("DELETE FROM sqlite_sequence WHERE name = 'station'");
		  db.run("delete from ias");
		
			func.prePare(db,t  ,"manag","manag, country,name,name2,name3")
			func.prePare(db,t2,"station","esr,name,manag,road,div")
			func.prePare(db,t3,"station","esr,name,manag,road,div")
			func.prePare(db,t4,"road","manag,road,name,name2")
			func.prePare(db,t5,"ias","ias_esr,ias_id")

		  db.run("COMMIT TRANSACTION");
		  db.run("VACUUM");
 
		  db.each("Select count(*) as count from station", function(err, row) {
			  console.log("  Загружено станций: "+row.count);
		  });
		  db.each("Select count(*) as count from manag", function(err, row) {
			  console.log("      Администраций: "+row.count);
		  });
		  db.each("Select count(*) as count from road", function(err, row) {
			  console.log("              Дорог: "+row.count+"\n");
		  });
		 db.each("Select count(*) as count from station where manag='21'", function(err, row) {
			  console.log("  Cтанций БЧ: "+row.count);
		  });
		    db.each("Select div, count(*) as count from station where manag='21' group by div", function(err, row) {
			  console.log("     НОД-"+row.div.substr(1)+": "+row.count);
		  });
		 
});
 
db.close();
