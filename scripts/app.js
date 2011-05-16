/*
 * MCI app
 * Author: Markus Bürgler (markus.buergler@solito.at)
 */

// Date formatting
Date.prototype.format=function(format){var returnStr='';var replace=Date.replaceChars;for(var i=0;i<format.length;i++){var curChar=format.charAt(i);if(i-1>=0&&format.charAt(i-1)=="\\"){returnStr+=curChar;}else if(replace[curChar]){returnStr+=replace[curChar].call(this);}else if(curChar!="\\"){returnStr+=curChar;}}return returnStr;};Date.replaceChars={shortMonths:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],longMonths:['January','February','March','April','May','June','July','August','September','October','November','December'],shortDays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],longDays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],d:function(){return(this.getDate()<10?'0':'')+this.getDate();},D:function(){return Date.replaceChars.shortDays[this.getDay()];},j:function(){return this.getDate();},l:function(){return Date.replaceChars.longDays[this.getDay()];},N:function(){return this.getDay()+1;},S:function(){return(this.getDate()%10==1&&this.getDate()!=11?'st':(this.getDate()%10==2&&this.getDate()!=12?'nd':(this.getDate()%10==3&&this.getDate()!=13?'rd':'th')));},w:function(){return this.getDay();},z:function(){var d=new Date(this.getFullYear(),0,1);return Math.ceil((this-d)/86400000);},W:function(){var d=new Date(this.getFullYear(),0,1);return Math.ceil((((this-d)/86400000)+d.getDay()+1)/7);},F:function(){return Date.replaceChars.longMonths[this.getMonth()];},m:function(){return(this.getMonth()<9?'0':'')+(this.getMonth()+1);},M:function(){return Date.replaceChars.shortMonths[this.getMonth()];},n:function(){return this.getMonth()+1;},t:function(){var d=new Date();return new Date(d.getFullYear(),d.getMonth(),0).getDate()},L:function(){var year=this.getFullYear();return(year%400==0||(year%100!=0&&year%4==0));},o:function(){var d=new Date(this.valueOf());d.setDate(d.getDate()-((this.getDay()+6)%7)+3);return d.getFullYear();},Y:function(){return this.getFullYear();},y:function(){return(''+this.getFullYear()).substr(2);},a:function(){return this.getHours()<12?'am':'pm';},A:function(){return this.getHours()<12?'AM':'PM';},B:function(){return Math.floor((((this.getUTCHours()+1)%24)+this.getUTCMinutes()/60+this.getUTCSeconds()/3600)*1000/24);},g:function(){return this.getHours()%12||12;},G:function(){return this.getHours();},h:function(){return((this.getHours()%12||12)<10?'0':'')+(this.getHours()%12||12);},H:function(){return(this.getHours()<10?'0':'')+this.getHours();},i:function(){return(this.getMinutes()<10?'0':'')+this.getMinutes();},s:function(){return(this.getSeconds()<10?'0':'')+this.getSeconds();},u:function(){var m=this.getMilliseconds();return(m<10?'00':(m<100?'0':''))+m;},e:function(){return"Not Yet Supported";},I:function(){return"Not Yet Supported";},O:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+'00';},P:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+':00';},T:function(){var m=this.getMonth();this.setMonth(0);var result=this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/,'$1');this.setMonth(m);return result;},Z:function(){return-this.getTimezoneOffset()*60;},c:function(){return this.format("Y-m-d\\TH:i:sP");},r:function(){return this.toString();},U:function(){return this.getTime()/1000;}};

(function($){
	$(function(){
		var url = 'app/schedule.php',
				$timeTable = $('#timeTable'),
				theme = 'c',
				markup = {
					singleDay: '<li><span class="time">${from} - ${to}</span><span class="location">${location} ${room}</span><span class="title">${title}</span><span class="group">${group}</span></li>'
				};
				
		var settings = {
			filter: ['Today','Tomorrow','All'],
			curFilter: 0,	// 0 => Today, 1 => Tomorrow, 2 => All
			filterDay: '',
			filterText: ''
		};		
		
		var app = {
			init: function(){
				var _self = this;
				if(localStorage.getItem('filterDay')){
					settings.curFilter = parseInt(localStorage.getItem('filterDay'),10);
				}
				// Cache template file
				$.template('listEntry',markup.singleDay);
				
				// Bind lecture button click
				$('#btnLectures').click(function(){
					_self.loadSchedule();
				}).click();
				
				// Bind next/prev button click
				$('.ui-prev, .ui-next').click(function(e){
					e.preventDefault();
					var action = "";
					if($(this).hasClass('ui-prev')){
						action = -1;
					} else {
						action = 1;
					}
					
					settings.curFilter = settings.curFilter + action;
					if(settings.curFilter < 0){
						settings.curFilter = 0;
					} else if(settings.curFilter>settings.filter.length){
						settings.curFilter = settings.filter.length;
					}
					
					localStorage.setItem('filterDay',settings.curFilter);
					_self.updateFilterDay(settings.curFilter);
					
					return false;
				});
				
				$timeTable.listview({
					theme: theme,
					countTheme: theme,
					headerTheme: theme,
					dividerTheme: theme,
					splitTheme: theme
				});
				
				// Filter
				$('#filter').delegate('.btnFilter','click',function(){
					var val = $('#input_filter').val();
					localStorage.setItem('filterText',val);
					_self.updateFilterText(val);
				});
				
				// Load settings
				_self.updateFilterText(localStorage.getItem('filterText'));
				_self.updateFilterDay(localStorage.getItem('filterDay'));
			},
			updateFilterText: function(filter){
				settings.filterText = filter;
				var label = '';
				if(filter != ''){
					label = filter;
				} else {
					label = 'Filter';
				}
				
				$('header .btnFilter .ui-btn-text').text(label);
				this.renderItems();
			},
			updateFilterDay: function(curFilter){
				$('.ui-prev,.ui-next').show();
				if(curFilter < 1){
					$('.ui-prev').hide();
				} else if(curFilter >= settings.filter.length - 1 ) {
					$('.ui-next').hide();
				}

				$('#lectures header h2').text(settings.filter[curFilter]);
				this.renderItems();
			},
			returnDate: function(addDays){
				var date = new Date();
				addDays = parseInt(addDays,10);
				
				if(addDays){
					date.setDate(date.getDate()+1)
				}
				return date.format('d.m.');
			},
			loadSchedule: function(){
				var curTime = new Date(),
						_self = this;
						
				curTime = curTime.getTime();
				var storage = localStorage.getItem('schedule'),
						schedule = $.parseJSON(storage);
				
				if(!schedule || schedule.timeStamp < (curTime - 21600)) {
					$.getJSON(url, function(data){
						if(data){
							var schedule = {
								'timeStamp': curTime,
								'classes': data
							}
							localStorage.setItem('schedule',JSON.stringify(schedule));
							return schedule.classes;	
						}
					});
				} else {
					return schedule.classes;
				}				
			},
			
			/**
			 * Render items to display
			 * @param data
			 */
			renderItems: function(){
				var day = localStorage.getItem('filterDay'),
						data = this.loadSchedule(),
						f = settings.filterText,
						check = false,
						_self = this;
				
				if(day == 0 || day == 1 || f != ''){
					data = $.map(data,function(value,index){
						if(day == 0){
							check = (value.date === _self.returnDate()) ? true : false;
						}else if(day == 1){
							check = (value.date === _self.returnDate(1)) ? true : false;
						} else {
							check = true;
						}
						return (check === true && (value.title.indexOf(f) > -1 || value.group.indexOf(f) > -1 || value.location.indexOf(f) > -1 )) ? value : null
					});	
				}
				
				if(data.length == 0){
					var obj = {
						title: "No class available for requested date!",
						location: "MCI",
						group: settings.filterText,
						from: "00:00",
						to: "24:00"
					}
					data.push(obj);
				}
				
				$timeTable.html($.tmpl('listEntry',data));
			} 
		};
		
		app.init();
	});
})(jQuery);