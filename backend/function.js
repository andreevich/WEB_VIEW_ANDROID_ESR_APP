"use strict";

var 	fs = require("fs")
/*
	Вставка данных в таблицу
*/
exports.prePare=function(db,t,tableName,colNames){
		var nameOfelem =Object.keys(t)
		var colNames_=colNames.split(',').map(function(){return "?"}).toString()
		var stmt = db.prepare("insert into "+tableName+" ("+colNames+") values ("+colNames_+") ");
		
		for (var i=0; i< t[nameOfelem[0]].length;i++){
			var temp=""
			for (var j=0;j<nameOfelem.length;j++){
					if (nameOfelem[j]=="ROAD_NO"){                       // Проверка на "пустую дорогу"
							temp+= (t[nameOfelem[j]][i] || "0")+"?";
					}
					else
						temp+= t[nameOfelem[j]][i]+"?";
			}
			stmt.run(temp.split('?').slice(0,-1))
		}
		stmt.finalize();
}

/*
	Разбираю NSIVIEW.MANAGEMENT.csv
*/
exports.getData = function(obj){
	var file_name ="./csv/utf8/"+obj.filename;
	var obj_={}
	
	if (fs.existsSync(file_name)){
		var data = fs.readFileSync(file_name);
		var arr=[]
		var temp = data.toString().split("\r\n")
		var temp_1 = temp[0].split(";")							 // Строка с заголовками елементов таблицы
		for (var i=1;  i<temp.length-1;i++){
			var temp_= temp[i].split(";")
			for (var j=0;j<obj.columnNames.length;j++){
				if (!obj_[obj.columnNames[j]]) 
					obj_[obj.columnNames[j]]=[]
				obj_[obj.columnNames[j]].push(
							(temp_[temp_1.indexOf(obj.columnNames[j])]+"").replace(/"/g, "").trim()
						)
			}
		}
	}
		return obj_;
};


