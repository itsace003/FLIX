<?php

	$query = $_POST['query'];

	$urlContents = file_get_contents("https://api.themoviedb.org/3/search/movie?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&query=".$query);
				 
	$results = json_decode($urlContents, true);

	array_multisort( array_column($results['results'], "popularity"), SORT_DESC, $results['results']);

	$titles = array();

	$i = 0;

	while($i < 6) {
		
		array_push($titles, $results['results'][$i]['title']);
		
		$i++;
		
	}
				
	echo json_encode($titles);

?>