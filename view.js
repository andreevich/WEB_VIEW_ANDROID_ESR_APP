var arr=[
	{manag_name:'БЧ',manag_no:'21',esr:'140009',sta_name:'Минск-Сортировочный',nod:'1',as:'АСУС', road_name:'Бел',road_no:'13'},
	{manag_name:'БЧ',manag_no:'21',esr:'150208',sta_name:'Новобелицкая',nod:'4',as:'АСУС-Р', road_name:'Бел',road_no:'13'},
	{manag_name:'XX',manag_no:'XX',esr:'YYYYYY',sta_name:'bla-bla-bla',nod:'X',as:'', road_name:'ZZZ',road_no:'ZZ'},
	{manag_name:'XX',manag_no:'XX',esr:'YYYYYY',sta_name:'bla-bla-bla',nod:'X',as:'', road_name:'ZZZ',road_no:'ZZ'},
	{manag_name:'XX',manag_no:'XX',esr:'YYYYYY',sta_name:'bla-bla-bla',nod:'X',as:'', road_name:'ZZZ',road_no:'ZZ'},
	{manag_name:'XX',manag_no:'XX',esr:'YYYYYY',sta_name:'bla-bla-bla',nod:'X',as:'', road_name:'ZZZ',road_no:'ZZ'},
	{manag_name:'XX',manag_no:'XX',esr:'YYYYYY',sta_name:'bla-bla-bla',nod:'X',as:'', road_name:'ZZZ',road_no:'ZZ'}
];
/*
//es2015 version
function f(val){
	return `<div  class='item_tbl_1'>
			<div class='item_td c1 b' >${val.manag_name}<span>(${val.manag_no})</span></div>
			<div class='item_td c2 esr'>${val.esr}</div>
			<div class='item_td c1 i'>НОД-${val.nod}</div>
			<div class='item_td c2 r'>${val.as}</div>
		</div>
		<div  class='item_tbl_2'>
			<div class='item_td c1 g'>${val.road_name}<span>(${val.road_no})</span></div>
			<div class='item_td b'>${val.sta_name}</div>
		</div>`;
}
*/
function f(val){
	return 	"<div  class='item_tbl_1'>"
			+"	<div class='item_td c1 b' >"+val.manag_name+"<span>("+val.manag_no+")</span></div>"
			+"	<div class='item_td c2 esr'>"+val.esr+"</div>                                    "
			+"	<div class='item_td c1 i'>НОД-"+val.nod+"</div>                                  "
			+"	<div class='item_td c2 r'>"+val.as+"</div>                                       "
			+"</div>                                                                            "
			+"<div  class='item_tbl_2'>                                                         "
			+"	<div class='item_td c1 g'>"+val.road_name+"<span>("+val.road_no+")</span></div>   "
			+"	<div class='item_td b'>"+val.sta_name+"</div>                                    "
			+"</div>";
}
var items_el = document.getElementById('itemsID');
for (var i=0; i<arr.length;i++){
	var div = document.createElement('div')
	div.className='item'
	div.innerHTML=f(arr[i]);
	items_el.appendChild(div)
}	