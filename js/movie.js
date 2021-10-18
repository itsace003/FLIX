function movies() { 
	
			var id = window.location.search.substring(4);
	
			var movie = new XMLHttpRequest();
	
			var url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&append_to_response=videos,credits";
			
			movie.open('GET', url);
	
			movie.onload = function() {
				
				var mov = JSON.parse(movie.responseText);
				
				console.log(mov);
				
				document.title = mov.title;
				
				if(window.innerWidth > 450) {
				
					document.getElementById("poster").src = "http://image.tmdb.org/t/p/w342/" + mov.poster_path;
					
				} else {
					
					document.getElementById("poster").src = "http://image.tmdb.org/t/p/w185/" + mov.poster_path;
					
				}
				
				document.getElementById("title").innerHTML = mov.title;
				
				document.getElementById("youtube-trailer").src = "https://www.youtube.com/embed/" + mov.videos.results[0].key;
				
				document.getElementById("info").innerHTML = "Synopsis, <br>" + mov.overview;
				
				document.getElementById("director").innerHTML = "Directed by, " + mov.credits.crew[0].name;
				
				document.getElementById("producer").innerHTML = "Produced by, " + mov.production_companies[0].name;
				
				document.getElementById("cast").innerHTML = "<table class=table table-dark> \
  <tbody> \
    <tr> \
      <th scope=row>" + "<img src =http://image.tmdb.org/t/p/w45/" + mov.credits.cast[0].profile_path + ">" + "</th> \
      <td>" + mov.credits.cast[0].name + "</td> \
      <td>" + mov.credits.cast[0].character + "</td> \
    </tr> \
    <tr> \
      <th scope=row>" + "<img src =http://image.tmdb.org/t/p/w45/" + mov.credits.cast[1].profile_path + ">" + "</th> \
      <td>" + mov.credits.cast[1].name + "</td> \
      <td>" + mov.credits.cast[1].character + "</td> \
    </tr> \
    <tr> \
      <th scope=row>" + "<img src =http://image.tmdb.org/t/p/w45/" + mov.credits.cast[2].profile_path + ">" + "</th> \
      <td>" + mov.credits.cast[2].name + "</td> \
      <td>" + mov.credits.cast[2].character + "</td> \
    </tr> \
		<tr> \
      <th scope=row>" + "<img src =http://image.tmdb.org/t/p/w45/" + mov.credits.cast[3].profile_path + ">" + "</th> \
      <td>" + mov.credits.cast[3].name + "</td> \
      <td>" + mov.credits.cast[3].character + "</td> \
    </tr> \
		<tr> \
      <th scope=row>" + "<img src =http://image.tmdb.org/t/p/w45/" + mov.credits.cast[4].profile_path + ">" + "</th> \
      <td>" + mov.credits.cast[4].name + "</td> \
      <td>" + mov.credits.cast[4].character + "</td> \
    </tr> \
  </tbody> \
</table>";
				
				
			}
			
			movie.send();
	
		};

window.onload = function () { 
	
			var dialogue = [];
			
			dialogue.push("May the Force be with you.");
			dialogue.push("You talking to me?");
			dialogue.push("I see dead people.");
			dialogue.push("Here's Johnny!");
			dialogue.push("Hasta la vista, baby.");
			dialogue.push("I'm the king of the world!");
			dialogue.push("My precious.");
			dialogue.push("Why so serious?");
			dialogue.push("Elementary, my dear Watson.");
			dialogue.push("Where we're going, we don't need roads");
			
			document.getElementById("headSub").innerHTML = dialogue[Math.floor(Math.random() * 10)];

			movies();
	
			$(window).bind('resize', function() {
			
				search();
			
			});
	
			var input = document.getElementById("searchbox");
	
				input.addEventListener("keyup", function(event) {
						event.preventDefault();
						if (event.keyCode === 13) {
								document.getElementById("btn").click();
						}
					
				});
	
				input.addEventListener("keyup", function(event) {
					
					document.getElementById("sugg").style.display = "block";
					
					var queryString = document.getElementById("searchbox").value;
					
					var titles = [];
					
					var search = new XMLHttpRequest();
			
					var URL = "https://api.themoviedb.org/3/search/movie?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&query=" +queryString;

					search.open('GET', URL);

					search.onload = function() {
				
					var ans = JSON.parse(search.responseText);
						
					ans.results.sort(function(a,b) {

						return b.popularity - a.popularity
					
					});
						
					for( var i in ans.results) {
					
						titles.push(ans.results[i].title);
					
					}
						
						console.log(titles);	
					
						document.getElementById("li-1").innerHTML = titles[0];
						document.getElementById("li-2").innerHTML = titles[1];
						document.getElementById("li-3").innerHTML = titles[2];
						document.getElementById("li-4").innerHTML = titles[3];
						document.getElementById("li-5").innerHTML = titles[4];
						
					}
					
					search.send();

				});
	
};
		
