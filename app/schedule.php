<?php
	require_once 'parser.php';
	
	// Interval to recache schedule file
	$interval = 6 * 3600;
	
	/*
	 * CACHING
	 */

	$cache = "cache/schedule";
	// Re-cache every $interval hours
	if(filemtime($cache) < (time() - $interval)){
		// Get from server
		if ( !file_exists(dirname(__FILE__) . '/cache') ) {
			mkdir(dirname(__FILE__) . '/cache', 0777);
		}
		
		$parser = new ScheduleParser();
		$jsonEntries = $parser->getEntries($parser->getDom(@$_GET['search']));
			
		// If something was returned, cache
		if ( $jsonEntries ) {
			$cachefile = fopen($cache, 'wb');
			fwrite($cachefile, $jsonEntries);
			fclose($cachefile);
		}
	}	else {
		// We already have local cache. Use that instead.
		$jsonEntries = file_get_contents($cache);
	}

	echo $jsonEntries;
	
	
	