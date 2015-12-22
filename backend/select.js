"use strict";

var sqlite3 = require('sqlite3').verbose()
var express = require('express')

var app = express()

    app.use('/stylesheets', express.static(__dirname + '/stylesheets'));
    app.use('/javascripts',  express.static(__dirname + '/javascripts'));
    app.use(express.static(__dirname + '/'));		

	var dbPath = './db/esr_2015_12_12.s3db';

	app.get('/report1',function(req,res){
		var db = new sqlite3.Database(dbPath);
		let name = req.query.name
		let manag = req.query.manag
		let query =`
			select 
				st.esr,
				st.name,
				st.manag,
				st.road,
				st.div,
				mg.name as mg_name,
				mg.name2 as mg_name2,
				mg.name3 as mg_name3,
				rd.name as rd_name,
				rd.name2 as rd_name2,
				ias.ias_id as ias
			from station as st
			 LEFT JOIN manag as mg
			 ON st.manag = mg.manag
			  LEFT JOIN road as rd
			 ON st.road=rd.road
			  LEFT JOIN ias as ias
			 ON ias.ias_esr = st.esr
			where	(st.esr like $esr or st.name like $name or st.name like $name2) and
			 ${!manag ? ` st.div<>$manag`: ` st.manag=$manag`}  
		`
		db.all(query,{
			$esr:`%${name}%`,
			$name:`%${name[0].toUpperCase()+name.substr(1)}%`,
			$name2:`%${name[0].toLowerCase()+name.substr(1)}%`,
			$manag:`${manag}`
		},function(err, rows) {
				var temp=[]
				if (!err){
					rows.forEach((row)=> {
						temp.push(row)
					});
				}
				else{
					temp=[{err}]
				}
				res.send(temp) 
				db.close();
			});
	
	})	  
	
var server = app.listen(3111, function () {

  var host = server.address().address
  var port = server.address().port

  console.log(`Web-сервер ЕСР-справочник, Порт:${port}`)
  console.log('т. : 2254577')
  console.log('email: d_semchenko@upr.mnsk.rw')
 
})	
/*
SQLITE_ERROR         1   // SQL//error or missing database  
SQLITE_INTERNAL     2   // Internal logic error in SQLite  
SQLITE_PERM           3   // Access permission denied  
SQLITE_ABORT          4   // Callback routine requested an abort  
SQLITE_BUSY           5   // The database file is locked  
SQLITE_LOCKED        6   // A table in the database is locked  
SQLITE_NOMEM         7   // A malloc() failed  
SQLITE_READONLY     8   // Attempt to write a readonly database  
SQLITE_INTERRUPT    9   // Operation terminated by sqlite3_interrupt() 
SQLITE_IOERR         10   // Some kind of disk I/O error occurred  
SQLITE_CORRUPT     11   // The database disk image is malformed  
SQLITE_NOTFOUND  12   // Unknown opcode in sqlite3_file_control()  
SQLITE_FULL           13   // Insertion failed because database is full  
SQLITE_CANTOPEN  14   // Unable to open the database file  
SQLITE_PROTOCOL  15   // Database lock protocol error  
SQLITE_EMPTY        16   // Database is empty  
SQLITE_SCHEMA      17   // The database schema changed  
SQLITE_TOOBIG      18   // String or BLOB exceeds size limit  
SQLITE_CONSTRAINT  19   // Abort due to constraint violation  
SQLITE_MISMATCH    20   // Data type mismatch  
SQLITE_MISUSE      21   // Library used incorrectly  
SQLITE_NOLFS        22   // Uses OS features not supported on host  
SQLITE_AUTH         23   // Authorization denied  
SQLITE_FORMAT     24   // Auxiliary database format error  
SQLITE_RANGE       25   // 2nd parameter to sqlite3_bind out of range  
SQLITE_NOTADB     26   // File opened that is not a database file  
SQLITE_ROW         100  // sqlite3_step() has another row ready  
SQLITE_DONE        101  // sqlite3_step() has finished executing  
*/