/*
 * MCI app
 * Author: Markus Bürgler (markus.buergler@solito.at)
 */

(function($){
	$(function(){
		var url = "app/schedule.php",
				$timeTable = $('#timeTable'),
				theme = 'c',
				markup = {
					singleDay: '<li><span class="time">${from} - ${to}</span><span class="location">${location} ${room}</span><span class="title">${title}</span><span class="group">${group}</span></li>'
				};
		
		$.template('listEntry',markup.singleDay);

		function renderItems(data){
			$.tmpl('listEntry',data).appendTo($timeTable);
			$timeTable.listview({
				theme: theme,
				countTheme: theme,
				headerTheme: theme,
				dividerTheme: theme,
				splitTheme: theme
			});
		}
		
		$('#btnLectures').click(function(){
			$.getJSON(url, function(data){
				if( data.length > 0){
					renderItems(data);
				}
			});
		});
		
	});
})(jQuery);