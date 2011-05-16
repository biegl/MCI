<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<title> MCI Rooms&Lectures</title> 
		<link rel="apple-touch-icon" href="img/tutsTouchIcon.png" />
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.0a4.1/jquery.mobile-1.0a4.1.min.css" />
		<link rel="stylesheet" href="styles/screen.css" />
		<script src="http://code.jquery.com/jquery-1.5.2.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.0a4.1/jquery.mobile-1.0a4.1.min.js"></script>
		<script src="http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js"></script>
		<script src="scripts/storage.js"></script>
		<script src="scripts/app.js"></script>
</head>
<body>
	<div id="lectures" data-role="page" data-fullscreen="true">
		<header data-role="header" data-position="fixed">
			<h1>Rooms & Lectures</h1>
			<a href="#filter" data-icon="search" data-rel="dialog" class="btnFilter">Filter</a>
			<a href="#info" data-icon="info" data-iconpos="notext">Info</a>
			<a href="#prev" data-icon="arrow-l" data-iconpos="notext" class="ui-prev">Previous</a>
			<h2>Today</h2>
			<a href="#next" data-icon="arrow-r" data-iconpos="notext" class="ui-next">Next</a>
		</header>
		<div data-role="content">
			<ul id="timeTable" data-filter="true"></ul>
		</div>
		<footer data-role="footer" data-position="fixed">
			<div data-role="navbar">
				<ul>
					<li><a data-icon="custom" id="btnLectures" href="#lectures">Lectures</a></li>
					<li><a data-icon="custom" id="btnLocations" href="#locations">Locations</a></li>
				</ul>
			</div>
		</footer>
	</div><!-- end lectures -->
	<div id="filter" data-role="page">
		<header data-role="header" data-position="fixed">
			<h1>Filter</h1>
		</header>
		<div data-role="content">
			<p>Enter a term you would like to filter the schedule for. This can be a <strong>group</strong>, <strong>class</strong> or <strong>location</strong> name.</p>
			<input type="search" placeholder="filter" id="input_filter"/>
			<a href="#lectures" data-role="button" data-theme="b" class="btnFilter">Filter</a>
			<a href="#lectures" data-role="button" data-rel="back">Cancel</a>
		</div>
		<footer data-role="footer" data-position="fixed">
		</footer>
	</div><!-- end search -->
</body>
</html>