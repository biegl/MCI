<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title> MCI Rooms&Lectures</title> 
		<link rel="apple-touch-icon" href="img/tutsTouchIcon.png" />
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.0a4.1/jquery.mobile-1.0a4.1.min.css" />
		<link rel="stylesheet" href="styles/screen.css" />
		<script src="http://code.jquery.com/jquery-1.5.2.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.0a4.1/jquery.mobile-1.0a4.1.min.js"></script>
		<script src="http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js"></script>
		<script src="scripts/app.js"></script>
</head>
<body>
	<div id="lectures" data-role="page" data-fullscreen="true">
		<header data-role="header" data-position="fixed">
			<h1>Rooms & Lectures</h1>
			<a href="#search" data-icon="search" data-iconpos="notext">Filter</a>
			<div data-role="fieldcontain">
					<select name="select-choice-today" id="select-choice-today" data-inline="true">
						<option value="today">Today</option>
						<option value="tomorrow">Tomorrow</option>
					</select>
				</div>
		</header>
		<div data-role="content">
			
			<ul id="timeTable" data-filter="true"></ul>
		</div>
		<footer data-role="footer" data-position="fixed">
			<div data-role="navbar">
				<ul>
					<li><a data-icon="custom" id="btnLectures" href="#lectures">Lectures</a></li>
					<li><a data-icon="custom" id="btnSpeakers" href="#speakers">Speakers</a></li>
					<li><a data-icon="custom" id="btnLocations" href="#locations">Locations</a></li>
				</ul>
			</div>
		</footer>
	</div><!-- end lectures -->
</body>
</html>