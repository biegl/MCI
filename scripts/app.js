/*
 * MCI app
 * Author: Markus Bürgler (markus.buergler@solito.at)
 */

// Date formatting
Date.prototype.format=function(format){var returnStr='';var replace=Date.replaceChars;for(var i=0;i<format.length;i++){var curChar=format.charAt(i);if(i-1>=0&&format.charAt(i-1)=="\\"){returnStr+=curChar;}else if(replace[curChar]){returnStr+=replace[curChar].call(this);}else if(curChar!="\\"){returnStr+=curChar;}}return returnStr;};Date.replaceChars={shortMonths:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],longMonths:['January','February','March','April','May','June','July','August','September','October','November','December'],shortDays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],longDays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],d:function(){return(this.getDate()<10?'0':'')+this.getDate();},D:function(){return Date.replaceChars.shortDays[this.getDay()];},j:function(){return this.getDate();},l:function(){return Date.replaceChars.longDays[this.getDay()];},N:function(){return this.getDay()+1;},S:function(){return(this.getDate()%10==1&&this.getDate()!=11?'st':(this.getDate()%10==2&&this.getDate()!=12?'nd':(this.getDate()%10==3&&this.getDate()!=13?'rd':'th')));},w:function(){return this.getDay();},z:function(){var d=new Date(this.getFullYear(),0,1);return Math.ceil((this-d)/86400000);},W:function(){var d=new Date(this.getFullYear(),0,1);return Math.ceil((((this-d)/86400000)+d.getDay()+1)/7);},F:function(){return Date.replaceChars.longMonths[this.getMonth()];},m:function(){return(this.getMonth()<9?'0':'')+(this.getMonth()+1);},M:function(){return Date.replaceChars.shortMonths[this.getMonth()];},n:function(){return this.getMonth()+1;},t:function(){var d=new Date();return new Date(d.getFullYear(),d.getMonth(),0).getDate()},L:function(){var year=this.getFullYear();return(year%400==0||(year%100!=0&&year%4==0));},o:function(){var d=new Date(this.valueOf());d.setDate(d.getDate()-((this.getDay()+6)%7)+3);return d.getFullYear();},Y:function(){return this.getFullYear();},y:function(){return(''+this.getFullYear()).substr(2);},a:function(){return this.getHours()<12?'am':'pm';},A:function(){return this.getHours()<12?'AM':'PM';},B:function(){return Math.floor((((this.getUTCHours()+1)%24)+this.getUTCMinutes()/60+this.getUTCSeconds()/3600)*1000/24);},g:function(){return this.getHours()%12||12;},G:function(){return this.getHours();},h:function(){return((this.getHours()%12||12)<10?'0':'')+(this.getHours()%12||12);},H:function(){return(this.getHours()<10?'0':'')+this.getHours();},i:function(){return(this.getMinutes()<10?'0':'')+this.getMinutes();},s:function(){return(this.getSeconds()<10?'0':'')+this.getSeconds();},u:function(){var m=this.getMilliseconds();return(m<10?'00':(m<100?'0':''))+m;},e:function(){return"Not Yet Supported";},I:function(){return"Not Yet Supported";},O:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+'00';},P:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+':00';},T:function(){var m=this.getMonth();this.setMonth(0);var result=this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/,'$1');this.setMonth(m);return result;},Z:function(){return-this.getTimezoneOffset()*60;},c:function(){return this.format("Y-m-d\\TH:i:sP");},r:function(){return this.toString();},U:function(){return this.getTime()/1000;}};

(function($){
	$(function(){
		var url = 'app/schedule.php',
				$lToday = $('#lecturesToday .timeTable'),
				$lTomorrow = $('#lecturesTomorrow .timeTable'),
				$lAll = $('#lecturesAll .timeTable'),
				theme = 'c',
				directionsDisplay = new google.maps.DirectionsRenderer(),
				directionsService = new google.maps.DirectionsService(),
				iw = [];
				
		 settings = {
			displayGroup: ['Today','Tomorrow','All'],
			day: 0,	// 0 => Today, 1 => Tomorrow, 2 => All
			filter: '',
			locations: [
			  {
					'id': 0,
					'name': 'MCI 1',
					'lat': 47.269208,
					'lng': 11.398152,
					'address': 'Universitätsstraße 15',
					'tel': '0043 512 2070'
				},
				{
					'id': 1,
					'name': 'MCI 2',
					'lat': 47.269379,
					'lng': 11.397084,
					'address': 'Universitätsstraße 15',
					'tel': '0043 512 2070'
				},
				{
					'id': 2,
					'name': 'MCI 3',
					'lat': 47.279148,
					'lng': 11.397728,
					'address': 'Weiherburggasse 8',
					'tel': '0043 512 2070 3301'
				},
				{
					'id': 3,
					'name': 'MCI 4',
					'lat': 47.255031,
					'lng': 11.37935,
					'address': 'Egger-Lienz-Straße 120',
					'tel': '0043 512 2070 3200'
				},
				{
					'id': 4,
					'name': 'MCI 5',
					'lat': 47.2703,
					'lng': 11.402942,
					'address': 'Kapuzinergasse 9',
					'tel': '0043 512 2070 1005'
				}
			]
		};		
		
		app = {
			init: function(){
				var _self = this,
						savedSettings = $.parseJSON(localStorage.getItem('settings'));
				
				// Load settings
				if(savedSettings){
					$.extend(settings, savedSettings);
				}				
			
				// Filter schedule
				$('#filter').delegate('.btnFilter','click',function(){
					var val = $('#input_filter').val();
					_self.updateFilter(val);					
					_self.refreshSchedule();
				});
				
				// Insert current filter as placeholder in input field
				$('header .btnFilter').bind('click',function(){
					var text = (settings.filter != '') ? settings.filter : 'filter';
					$('#input_filter').attr('placeholder',text);
				});
				
				// Render initial schedule
				$('body').delegate('div[data-role*="page"]', 'pageshow', function(){
					if(!$(this).is('#locations')){
						_self.updateFilter(settings.filter);
					} else {
						var val = $('#locations header select').val();
						_self.initMap(val);
					}
				});
				
				$('body').delegate('div[data-role*="page"]','pagebeforeshow',function(){
					var id = ($(this).attr('id') == 'locations') ? 'locations' : 'lecturesToday';
					var button = $('footer a[href="#'+id+'"]',$(this)).addClass('ui-btn-active');
				});
				
				// Swipe event for Rooms & lectures
				$('body').delegate('div[data-role*="page"]:not("#locations")','swipeleft swiperight',function(e){
					var direction = e.type;
					if(direction == 'swiperight'){
						$('header .ui-prev',$(this)).click();
					} else {
						$('header .ui-next',$(this)).click();
					}
				});
								
				// Filter locations
				$('#locations select').change(function(){
					directionsDisplay.setDirections({'routes':[]})
					var val = $(this).val();
					_self.initMap(val);
				});
				
				this.updateFilter(settings.filter);
				this.refreshSchedule();
			},
			/**
			 * Refreshes the schedule.
			 * Waits until data is loaded before schedule is rendered.
			 */
			refreshSchedule: function(){
				var _self = this;
				$.when(_self.loadSchedule()).then(function(data){
					_self.renderItems($lToday,'#listEntry',_self.filterItems(data,0));
					_self.renderItems($lTomorrow,'#listEntry',_self.filterItems(data,1));
					_self.renderItems($lAll,'#listAll',_self.filterItems(data,2));
				});
			},
			/**
			 * Updates the setting filter and replaces the label of the filter button
			 * @param filter: String Text to filter for
			 **/
			updateFilter: function(filter){
				var label = '';
				settings.filter = filter;
				
				if(filter != ''){
					label = filter;
				} else {
					label = 'Filter';
				}
				
				// Save settings
				localStorage.setItem('settings',JSON.stringify(settings));
				
				// Change label of filter button
				$('header .btnFilter .ui-btn-text').text(label);
				return settings.filter;
			},
			/**
			 * Returns the current Day in the format ('dd.mm').
			 * @param addDays: Integer Add days to current date.
			 **/
			returnDate: function(addDays){
				var date = new Date();
				addDays = parseInt(addDays,10);
				
				if(addDays){
					date.setDate(date.getDate()+1)
				}
				return date.format('d.m.');
			},
			/**
			 * Checks whether an offline version of the schedule is available.
			 * If so, the cached data is returned, otherwise an AJAX call is made.
			 */
			loadSchedule: function(){
				var curTime = new Date(),
						_self = this;
						
				curTime = curTime.getTime();
				var storage = localStorage.getItem('schedule'),
						schedule = $.parseJSON(storage);
						
				return (schedule && schedule.timeStamp > (curTime - 21600)) ? schedule.classes : $.getJSON(url,function(data){
					var schedule = {
						'timeStamp': curTime,
						'classes': data
					};
					localStorage.setItem('schedule',JSON.stringify(schedule));
					return data;
				});
			},
			/**
			 * Filters the schedule according to the adjusted day and filter values
			 * Returns a new Array with filtered items.
			 * @param data: Array Array with all classes as JSON Objects
			 **/
			filterItems: function(data,day){
				var f = settings.filter,
						date = '',
						checkFilter = true,
						checkDate = true,
						_self = this;
				
				if(day == 0 || day == 1){
					date = _self.returnDate(day);
				}
				
				
				data = $.map(data, function(value,index){
					if(day != 2){
						checkDate = (value.date === date) ? true : false;
					}
					
					if(f != null){
						f = f.toLowerCase();
						checkFilter = (value.title.toLowerCase().indexOf(f) > -1 || value.group.toLowerCase().indexOf(f) > -1 || value.lecturer.toLowerCase().indexOf(f) > -1 || value.location.toLowerCase().indexOf(f) > -1 ) ? true : false;
					} else {
						checkFilter = true;
					}
					
					return (checkDate === true && checkFilter === true) ? value : null;
				});
				
				// Notify the user in case no classes are available on specified date.
				if(data.length == 0){
					var obj = {
						title: "No classes available for requested date!",
						location: "MCI",
						group: settings.filter,
						from: "00:00",
						to: "24:00"
					}
					data.push(obj);
				}
				
				return data;
			},
			/**
			 * Render items to display.
			 * @param data
			 */
			renderItems: function(target,template,data){
				$.when(target.html($(template).tmpl(data))).then(function(resp){
					var $divider = $('#lecturesAll li.ui-li-divider'),
							date = '',
							today = new Date();
							
					if ($divider.length){
						$divider.each(function(){
							if(date == $(this).text()){
								$(this).remove();
							} else {
								var text = $(this).text(),
										day = text.substr(0,2);
										month = text.substr(3,2);
										
								date = text;
								today.setMonth(month-1,day);
								$(this).text(today.format('l') + ' ' + text);
							}
						});
					}
				});
			},
			/**
			 * Initialize google maps
			 * @param locations: Array Location objects
			 */
			initMap: function(locationKey) {
				var ow = null;
				var markers = [];
				var map = null;
				var image = new google.maps.MarkerImage(
					'images/marker.png',
					new google.maps.Size(25,25),
					new google.maps.Point(0,0),
					new google.maps.Point(12,12)
					);
				 
				var shadow = new google.maps.MarkerImage(
					'images/marker_shadow.png',
					new google.maps.Size(78,50),
					new google.maps.Point(0,0),
					new google.maps.Point(12,12)
					);
				
				var options = {
					'zoom': 13,
					'center': new google.maps.LatLng(47.26215,11.39180),
					'mapTypeId': google.maps.MapTypeId.ROADMAP
				};
				
				if(navigator.geolocation){
					navigator.geolocation.getCurrentPosition(function(pos){
						var loc = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
						$.extend(options,{
							'center': loc
						});
						map = new google.maps.Map(document.getElementById('map_canvas'), options);
						setMarkers(loc);
						directionsDisplay.setMap(map);
					},function(){});
				} else {
						map = new google.maps.Map(document.getElementById('map_canvas'), options);
						setMarkers();
				}
				
				function setMarkers(myLoc){
					if(locationKey === 'all' || locationKey === null){
						locations = settings.locations;
					} else {
						locations = [];
						locations.push(settings.locations[locationKey]);
					}
				
					$.each(locations,function(i,loc){
						var text = $('#infoWindow').tmpl(loc).html();
						var pos = new google.maps.LatLng(loc.lat,loc.lng);
						
						markers[loc.id] = new google.maps.Marker({
							'position': pos,
							'map': map,
							'animation': google.maps.Animation.DROP,
							'icon': image,
							'shadow': shadow,
							'title': loc.name
							});
						
						iw[loc.id] = new google.maps.InfoWindow({
							'content': text
						});
					
						google.maps.event.addListener(markers[loc.id],'click',function(){
							$.each(iw,function(i,item){
								this.close();
							});
							iw[loc.id].open(map,markers[loc.id]);
						});
					});
					
					if (myLoc){
						markers.push(new google.maps.Marker({
							'position': myLoc,
							'map': map,
							'animation': google.maps.Animation.DROP,
							'title': 'My location'
						}));
					}
				}		
			},
			getDirections: function(dest){
				if(navigator.geolocation){
					var key = parseInt($(dest).attr('data-id'),10);
					iw[key].close();
					$.mobile.pageLoading();
					var destination = settings.locations[key];
									
					navigator.geolocation.getCurrentPosition(function(pos){
						var request = {
							'origin': new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude),
							'destination': new google.maps.LatLng(destination.lat,destination.lng),
							travelMode: google.maps.DirectionsTravelMode.WALKING
						};
						
						directionsService.route(request, function(response,status){
							if (status == google.maps.DirectionsStatus.OK) {
								directionsDisplay.setDirections(response);
								$.mobile.pageLoading(true);
							}
						});
					},function(){
						alert('Geolocation not supported');
					});
				}
			}
		};
		
		app.init();
	});
})(jQuery);