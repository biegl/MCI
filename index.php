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
			<a href="#filter" data-icon="search" data-rel="dialog" class="btnFilter piwik_link">Filter</a>
			<a href="#info" data-icon="info" data-iconpos="notext" data-rel="dialog" class="piwik_link">Info</a>
			<h2>Today</h2>
			<a href="#lecturesTomorrow" data-icon="arrow-r" data-iconpos="notext" class="ui-next piwik_link" data-transition="slide">Next</a>
		</header>
		<div data-role="content">
			<ul class="timeTable" data-filter="true"></ul>
		</div>
		<footer data-role="footer" data-position="fixed" data-id="foot">
			<div data-role="navbar">
				<ul>
					<li><a data-icon="custom" id="btnLectures" href="#lecturesToday" class="ui-btn-active piwik_link">Lectures</a></li>
					<li><a data-icon="custom" id="btnLocations" href="#locations" class=" piwik_link">Locations</a></li>
				</ul>
			</div>
		</footer>
	</div><!-- end lectures Today -->
	<div id="lecturesTomorrow" data-role="page" data-id="head">
		<header data-role="header">
			<h1>Rooms & Lectures</h1>
			<a href="#filter" data-icon="search" data-rel="dialog" class="btnFilter piwik_link">Filter</a>
			<a href="#info" data-icon="info" data-iconpos="notext" data-rel="dialog" class="piwik_link">Info</a>
			<a href="#lecturesToday" data-icon="arrow-l" data-iconpos="notext" class="ui-prev" data-transition="reverse slide" class="piwik_link">Previous</a>
			<h2>Tomorrow</h2>
			<a href="#lecturesAll" data-icon="arrow-r" data-iconpos="notext" class="ui-next piwik_link" data-transition="slide">Next</a>
		</header>
		<div data-role="content">
			<ul class="timeTable" data-filter="true"></ul>
		</div>
		<footer data-role="footer" data-position="fixed" data-id="foot">
			<div data-role="navbar">
				<ul>
					<li><a data-icon="custom" id="btnLectures" href="#lecturesToday" class="piwik_link">Lectures</a></li>
					<li><a data-icon="custom" id="btnLocations" href="#locations" class="piwik_link">Locations</a></li>
				</ul>
			</div>
		</footer>
	</div><!-- end lectures Tomorrow -->
	<div id="lecturesAll" data-role="page" data-id="head">
		<header data-role="header">
			<h1>Rooms & Lectures</h1>
			<a href="#filter" data-icon="search" data-rel="dialog" class="btnFilter piwik_link">Filter</a>
			<a href="#info" data-icon="info" data-iconpos="notext" data-rel="dialog" class="piwik_link">Info</a>
			<a href="#lecturesTomorrow" data-icon="arrow-l" data-iconpos="notext" class="ui-prev piwik_link" data-transition="reverse slide">Previous</a>
			<h2>All</h2>
		</header>
		<div data-role="content">
			<ul class="timeTable" data-filter="true"></ul>
		</div>
		<footer data-role="footer" data-position="fixed" data-id="foot">
			<div data-role="navbar">
				<ul>
					<li><a data-icon="custom" id="btnLectures" href="#lecturesToday" class="piwik_link">Lectures</a></li>
					<li><a data-icon="custom" id="btnLocations" href="#locations" class="piwik_link">Locations</a></li>
				</ul>
			</div>
		</footer>
	</div><!-- end lectures All -->	
	<div id="locations" data-role="page" style="width:100%; height: 100%;">
		<!-- content today -->
		<header data-role="header" data-position="fixed" data-id="head">
			<h1>Locations</h1>
			<select id="selectLocation" data-inline="true" data-icon="search" data-theme="b">
				<option value="all">All</option>
				<option value="0">MCI 1</option>
				<option value="1">MCI 2</option>
				<option value="2">MCI 3</option>
				<option value="3">MCI 4</option>
				<option value="4">MCI 5</option>
			</select>
			<a href="#info" data-icon="info" data-iconpos="notext" data-rel="dialog" data-pos="right" class="piwik_link">Info</a>	
		</header>
		<div data-role="content" style="padding:0;height:100%;width:100%;">
			<div id="map_canvas"></div>
			<div id="results"></div>
		</div>
		<footer data-role="footer" data-position="fixed" data-id="foot">
			<div data-role="navbar">
				<ul>
					<li><a data-icon="custom" id="btnLectures" href="#lecturesToday" data-transition="reverse slide" class="piwik_link">Lectures</a></li>
					<li><a data-icon="custom" id="btnLocations" href="#locations" class="piwik_link">Locations</a></li>
				</ul>
			</div>
		</footer>
	</div><!-- end page locations -->
	<div id="info" data-role="page">
		<header data-role="header">
			<h1>Information</h1>
		</header>
		<div data-role="content">
			<h2>MCI Application</h2>
			<ul class="no-bullets">
				<li><label>Version: </label>0.4</li>
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
				<a href="http://www.solito.at" class="piwik_link external">http://www.solito.at</a>
			</address>
			<blockquote>"ALL the web! The web for ALL!"</blockquote>
			</p>
		</div>
		<footer data-role="footer" data-position="fixed">
		</footer>
	</div><!-- end page info -->
	
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
	<script id="infoWindow" type="text/x-jquery-tmpl">
			<div id="googleInfoWindow">
				<div id="siteNotice"></div>
				<h2 id="firstHeading" class="firstHeading">${name}</h2>
				<div id="bodyContent">
					<img src="images/locations/img0${id}.jpg" />
					<address>${address}<br/>${tel}</address>
				</div>
				<a data-id="${id}" onClick="app.getDirections(this)" class="ui-btn ui-btn-inline ui-btn-corner-all ui-shadow ui-btn-up-b"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Get directions!</span></span></a>
			</div>
	</script>
	<script src="http://maps.google.com/maps/api/js?sensor=true" type="text/javascript"></script>
	<!-- Piwik --> 
	<script>
		var pkBaseURL = (("https:" == document.location.protocol) ? "https://easyadmin.at/piwik/" : "http://easyadmin.at/piwik/");
		document.write(unescape("%3Cscript src='" + pkBaseURL + "piwik.js' type='text/javascript'%3E%3C/script%3E"));
	</script>
	<script>
		try {
			var piwikTracker = Piwik.getTracker(pkBaseURL + "piwik.php", 1);
			piwikTracker.trackPageView();
			piwikTracker.enableLinkTracking();
		} catch( err ) {}
	</script>
	<!-- End Piwik Tracking Code -->
</body>
</html>