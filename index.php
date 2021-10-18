<html>

	<head>
	
		<title> Search your favourite movies. </title>
		
		<link rel="icon" href="images/media.png">

		<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		
		<!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
		
		<!-- Own CSS -->
		<link rel="stylesheet" type="text/css" href="css/main.css">
		 
		<!-- Fonts -->
		<link href="https://fonts.googleapis.com/css?family=Bungee|Pacifico|Roboto" rel="stylesheet">
		
	</head>
	
	<body>
		
		
		<div class="container">
			
			<h1 class="text-center head-name"><a class="link" href="index.php">FLIX!</a></h1>
			<h3 class="text-center head-sub" id="headSub">May the force be with you!</h3>
			
			<form action="" method="get" onsubmit="validate(event)" id="search" class="search-form">
			
			<div class="input-group input-group-lg search-div">
				
				<input type="text" class="form-control search" placeholder="Search..." name="search" id="searchbox" autofocus>
				
				<div class="input-group-append">
					
					<button type="submit" class="btn btn-lg btn-primary" name="btn" type="button" id="btn">Shoot</button>
					
				</div>
				
			</div>
				
			</form>
			
			<div id="sugg" class="sugg">
			
				<ul class="sugg-li">
				
					<li id="li-1" class="list" onclick="gotoSearch(this.id)"></li>
					<li id="li-2" class="list" onclick="gotoSearch(this.id)"></li>
					<li id="li-3" class="list" onclick="gotoSearch(this.id)"></li>
					<li id="li-4" class="list" onclick="gotoSearch(this.id)"></li>
					<li id="li-5" class="list" onclick="gotoSearch(this.id)"></li>
					
				</ul>
				
			</div>
			 
			<div class="alert alert-primary" id="alert" role="alert">
  			
				Enter something to search or YOU SHALL NOT PROCEED!
			
			</div>
			
			<div class="container-fluid" id="pop">
	<?php
				
			 if(isset($_GET['btn'])) { 
				 
				$query = $_GET['search']; 
				 
				$urlContents = file_get_contents("https://api.themoviedb.org/3/search/movie?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&query=".rawurlencode($query));
				$results = json_decode($urlContents, true);
				 
				print_r($results);
				
				array_multisort( array_column($results['results'], "popularity"), SORT_DESC, $results['results']);
				 
				$val = $results['total_results'] / $results['total_pages'];
				
			 $i = 0;
			
			 $j = 1;
			
			 $k = 2;
		
			 while($i<$val && $j<$val && $k<$val) {
				
			 echo "
			 
			 	<div class='card-deck' id='deck'>
			 
			 	<div class='card'>
			 
    		<img class='card-img-top' onerror=this.src='images/def.jpg' src='http://image.tmdb.org/t/p/w342/".$results['results'][$i]['poster_path']."'>
				
    		<div class='card-body'>
				
      	<h5 class='card-title' onclick='redirect(".$results['results'][$i]['id'].")'>".$results['results'][$i]['title']."</h5>
				
    		</div>
				
				<div class='card-footer'>
				
				<small class='text-muted'>".$results['results'][$i]['release_date']."</small>
				
				</div>
				
				</div>
				
				<div class='card'>
			 
    		<img class='card-img-top' onerror=this.src='images/def.jpg' src='http://image.tmdb.org/t/p/w342/".$results['results'][$j]['poster_path']."'>
				
    		<div class='card-body'>
				
      	<h5 class='card-title' onclick='redirect(".$results['results'][$j]['id'].")'>".$results['results'][$j]['title']."</h5>
				
    		</div>
				
				<div class='card-footer'>
				
				<small class='text-muted'>".$results['results'][$j]['release_date']."</small>
				
				</div>
				
				</div>
				
				<div class='card'>
			 
    		<img class='card-img-top' onerror=this.src='images/def.jpg' src='http://image.tmdb.org/t/p/w342/".$results['results'][$k]['poster_path']."'>
				
    		<div class='card-body'>
				
      	<h5 class='card-title' onclick='redirect(".$results['results'][$k]['id'].")'>".$results['results'][$k]['title']."</h5>
				
    		</div>
				
				<div class='card-footer'>
				
				<small class='text-muted'>".$results['results'][$k]['release_date']."</small>
				
				</div>
				
				</div>
				
				</div>";
				 
				$i = $i + 3; 
				 
				$j = $j + 3;
				 
				$k = $k + 3; 
				 
			 }
				 
			 } 
				
			 ?>
				
			 <?php
				
			 if(isset($_GET['btn'])) {
				 
				 exit;
				 
			 } else {
        
			 $urlContents = file_get_contents("https://api.themoviedb.org/3/movie/popular?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=1");

			 $movie = json_decode($urlContents, true);

			 array_multisort( array_column($movie['results'], "popularity"), SORT_DESC, $movie['results']);
				
			 $i = 0;
			
			 $j = 1;
			
			 $k = 2;
		
			 echo "<h1 class='pop' id='pop'>POPULAR MOVIES</h1>";
				 
			 while($i<20 && $j<20 && $k<20) {
				
			 echo "
			 
			 	<div class='card-deck' id='deck'>
			 
			 	<div class='card'>
			 
    		<img class='card-img-top' onerror=this.src='images/def.jpg' src='http://image.tmdb.org/t/p/w342/".$movie['results'][$i]['poster_path']."'>
				
    		<div class='card-body'>
				
      	<h5 class='card-title' onclick='redirect(".$movie['results'][$i]['id'].")'>".$movie['results'][$i]['title']."</h5>
				
    		</div>
				
				<div class='card-footer'>
				
				<small class='text-muted'>".$movie['results'][$i]['release_date']."</small>
				
				</div>
				
				</div>
				
				<div class='card'>
			 
    		<img class='card-img-top' onerror=this.src='images/def.jpg' src='http://image.tmdb.org/t/p/w342/".$movie['results'][$j]['poster_path']."'>
				
    		<div class='card-body'>
				
      	<h5 class='card-title' onclick='redirect(".$movie['results'][$j]['id'].")'>".$movie['results'][$j]['title']."</h5>
				
    		</div>
				
				<div class='card-footer'>
				
				<small class='text-muted'>".$movie['results'][$j]['release_date']."</small>
				
				</div>
				
				</div>
				
				<div class='card'>
			 
    		<img class='card-img-top' onerror=this.src='images/def.jpg' src='http://image.tmdb.org/t/p/w342/".$movie['results'][$k]['poster_path']."'>
				
    		<div class='card-body'>
				
      	<h5 class='card-title' onclick='redirect(".$movie['results'][$k]['id'].")'>".$movie['results'][$k]['title']."</h5>
				
    		</div>
				
				<div class='card-footer'>
				
				<small class='text-muted'>".$movie['results'][$k]['release_date']."</small>
				
				</div>
				
				</div>
				
				</div>";
				 
				$i = $i + 3; 
				 
				$j = $j + 3;
				 
				$k = $k + 3; 
				 
			 }
				 
			 }

		?>
				

			</div>
			
		</div>
	
	</body>

	<script src="js/index-page.js">
	</script>
	
</html>