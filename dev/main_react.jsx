'use strict';

	let StationItem = React.createClass({
		goodbye: function(event) {
			alert(JSON.stringify(this.state))
			alert(JSON.stringify(this.props))
			//alert(JSON.stringify(this.props.items))
		},

		getInitialState: function() {
			//console.log(this.props)
			return {test:123};
		},

		render:function() {
			
			let ias=``;
			switch(this.props.data.ias){
				case '0' :ias =`ОСТЦ`;	break;
				case '1' :ias =`АСУС`;	break;
				case '2' :ias =`АСУС-Р`;	break;
				default  :ias =``;		break;
			}
			
			
			return(
				<div className='item'>
					<div  className='item_tbl_1'>
						<div className='item_td c1 b' title={this.props.data.mg_name} >{this.props.data.mg_name2} {`(${this.props.data.manag})`}</div>
						<div className='item_td c2 esr'>{this.props.data.esr}</div>
						<div className='item_td c1 i'>{ (this.props.data.div) ? `НОД-${this.props.data.div.substr(1)}`:`` }</div>
						<div className='item_td c2 r b'>{ias}</div>
					</div>
					<div  className='item_tbl_2'>
						<div className='item_td c1 g' title={this.props.data.rd_name}>{this.props.data.rd_name2} {`(${this.props.data.road})`}</div>
						<div className='item_td b'>{this.props.data.name}</div>
					</div>
				</div>
			)
		}
	});
	
	let StationMenu = React.createClass({
		render:function() {
			return(
				<div>Результаты: <span>{this.props.count}</span> из <span>{this.props.all}</span> <span>от {this.props.date} г.</span></div>
			)
		}
	});

	var StationBlock = React.createClass({
		getStation:function(val) {
			let serchVal = val.srcElement.value;
			if (serchVal.indexOf('___')>-1 || serchVal.indexOf('%%')>-1){
				val.srcElement.value='';
			}
			else{
				if (serchVal.length>3){
					this.setState({arr: [{esr:'Загрузка...',manag:'загрузка',road:'загрузка',rd_name2:'загрузка'}]});
					$.ajax({
						dataType: "jsonp",
						url:  "http://127.0.0.1:3111/report1",
						data:{name:serchVal},
						success: (d)=>{
							this.setState({arr: d});
						},
						error:(err)=>{
							alert(err)
						}
					})
				}
				else{
					this.setState({arr: []});	
				}
			}
		},
		getInitialState: function() {
			let obj={
				arr: []
			}
			obj.temp_arr=obj.arr.slice()
			return obj;
		},

		componentDidMount:function(){
			//console.log('Отрисовали: ', this.state)
				let input = document.getElementsByTagName('input');
			//	input.addEventListener("keyup", this.getStation, false);
				input[0].attachEvent("onkeyup",this.getStation);
		
		},
		render:function(){
			let self = this;
			
			return(
				<div>
					 <StationMenu count={this.state.arr.length} all={22602} date={'13.12.2015'}/>
					 <br/>
				{
					
					this.state.arr.map(function(result) {
						
						return <StationItem data={result} items={self.state}/>;
					})
				}
				</div>
			
			)
			
		}
	})
	React.render(
		<StationBlock />, document.getElementById('itemsID')
	);
