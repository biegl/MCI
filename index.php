<!DOCTYPE html>
	<html manifest="cache.manifest">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
		<title> MCI Rooms&Lectures</title> 
		<link rel="apple-touch-startup-image" href="images/startup.png">
		<link rel="apple-touch-icon" href="images/favicon.png" />
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.0a4.1/jquery.mobile-1.0a4.1.min.css" />
		<link rel="stylesheet" href="styles/screen.css" />
		<link type="image/x-icon" rel="shortcut icon" href="favicon.ico">
		<script src="http://code.jquery.com/jquery-1.5.2.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.0a4.1/jquery.mobile-1.0a4.1.min.js"></script>
		<script src="http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js"></script>
		<script src="scripts/app.js"></script>
</head>
<body>
	<div id="lecturesToday" data-role="page">
		<!-- content today -->
		<header data-role="header" data-position="fixed" data-id="head">
			<h1>Rooms & Lectures</h1>
			<a href="#filter" data-icon="search" data-rel="dialog" class="btnFilter">Filter</a>
			<a href="#info" data-icon="info" data-iconpos="notext" data-rel="dialog">Info</a>
			<h2>Today</h2>
			<a href="#lecturesTomorrow" data-icon="arrow-r" data-iconpos="notext" class="ui-next" data-transition="slide">Next</a>
		</header>
		<div data-role="content" id="contentToday" data-url="#contentToday">
			<ul class="timeTable" data-filter="true"></ul>
		</div>
		<footer data-role="footer" data-position="fixed" data-id="foot">
			<div data-role="navbar">
				<ul>
					<li><a data-icon="custom" id="btnLectures" href="#lecturesToday" class="ui-btn-active">Lectures</a></li>
					<li><a data-icon="custom" id="btnLocations" href="#locations">Locations</a></li>
				</ul>
			</div>
		</footer>
	</div><!-- end lectures Today -->
	<div id="lecturesTomorrow" data-role="page" data-id="head">
		<header data-role="header">
			<h1>Rooms & Lectures</h1>
			<a href="#filter" data-icon="search" data-rel="dialog" class="btnFilter">Filter</a>
			<a href="#info" data-icon="info" data-iconpos="notext" data-rel="dialog">Info</a>
			<a href="#lecturesToday" data-icon="arrow-l" data-iconpos="notext" class="ui-prev" data-transition="reverse slide">Previous</a>
			<h2>Tomorrow</h2>
			<a href="#lecturesAll" data-icon="arrow-r" data-iconpos="notext" class="ui-next" data-transition="slide">Next</a>
		</header>
		<div data-role="content" id="contentToday" data-url="#contentToday">
			<ul class="timeTable" data-filter="true"></ul>
		</div>
		<footer data-role="footer" data-position="fixed" data-id="foot">
			<div data-role="navbar">
				<ul>
					<li><a data-icon="custom" id="btnLectures" href="#lecturesToday" class="ui-btn-active">Lectures</a></li>
					<li><a data-icon="custom" id="btnLocations" href="#locations">Locations</a></li>
				</ul>
			</div>
		</footer>
	</div><!-- end lectures Tomorrow -->
	<div id="lecturesAll" data-role="page" data-id="head">
		<header data-role="header">
			<h1>Rooms & Lectures</h1>
			<a href="#filter" data-icon="search" data-rel="dialog" class="btnFilter">Filter</a>
			<a href="#info" data-icon="info" data-iconpos="notext" data-rel="dialog">Info</a>
			<a href="#lecturesTomorrow" data-icon="arrow-l" data-iconpos="notext" class="ui-prev" data-transition="reverse slide">Previous</a>
			<h2>All</h2>
		</header>
		<div data-role="content" id="contentToday" data-url="#contentToday">
			<ul class="timeTable" data-filter="true"></ul>
		</div>
		<footer data-role="footer" data-position="fixed" data-id="foot">
			<div data-role="navbar">
				<ul>
					<li><a data-icon="custom" id="btnLectures" href="#lecturesToday" class="ui-btn-active">Lectures</a></li>
					<li><a data-icon="custom" id="btnLocations" href="#locations">Locations</a></li>
				</ul>
			</div>
		</footer>
	</div><!-- end lectures All -->	
	<div id="info" data-role="page">
		<header data-role="header">
			<h1>Information</h1>
		</header>
		<div data-role="content">
			<h2>MCI Application</h2>
			<ul class="no-bullets">
				<li><label>Version: </label>0.1</li>
				<li><label>Date: </label>May 17, 2011</li>
				<li><label>Author: </label>Markus Bürgler</li>
				<li><label>Mail: </label><a href="mailto:markus.buergler@solito.at">m.buergler@solito.at</a></li>
			</ul>
			<p>This application is a solito KG product.<br />
			<address>
				<strong>solito KG</strong><br />
				Adamgasse 7<br />
				6020 Innsbruck <br />
				Austria<br />
				<a href="http://www.solito.at">http://www.solito.at</a>
			</address>
			<blockquote>"ALL the web! The web for ALL!"</blockquote>
			</p>
		</div>
		<footer data-role="footer" data-position="fixed">
		</footer>
	</div>
	<div id="filter" data-role="page">
		<header data-role="header" data-position="fixed">
			<h1>Filter</h1>
		</header>
		<div data-role="content">
			<p>Enter a term you would like to filter the schedule for. This can be a <strong>group</strong>, <strong>class</strong> or <strong>location</strong> name.</p>
			<input type="search" placeholder="filter" id="input_filter" />
			<a href="#lecturesToday" data-role="button" data-theme="b" class="btnFilter">Filter</a>
			<a href="#lecturesToday" data-role="button" data-rel="back">Cancel</a>
		</div>
		<footer data-role="footer" data-position="fixed">
		</footer>
	</div><!-- end search -->
	<script id="listEntry" type="text/x-jquery-tmpl">
	    <li><span class="time">${from} - ${to}</span><span class="location">${location} ${room}</span><span class="title">${title}</span><span class="group">${group}</span></li>
	</script>
	<script id="listAll" type="text/x-jquery-tmpl">
				<li class="ui-li-divider ui-body-a">${date}</li>
			{{tmpl "#listEntry"}}
	</script>
</body>
</html>