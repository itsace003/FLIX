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
	
			$(window).bind('resize', function() {
				
				popularmovies();
				search();
			
			});
	
			popularmovies();
	
};

			function gotoSearch(val) {
				
				var query = document.getElementById(val).innerHTML;
				
				document.getElementById("searchbox").value = query;
				
				search();
				
				document.getElementById("sugg").style.display = "none";
				
			}
		
			function popularmovies() { 
	
			var popular = new XMLHttpRequest();
	
			var url = "https://api.themoviedb.org/3/movie/popular?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=1"
			
			popular.open('GET', url);
	
			popular.onload = function() {
				
				var pop = JSON.parse(popular.responseText);
				
				var resu = pop.total_results;
				
				var pages = pop.total_pages;
				
				var val = Math.floor(resu / pages);
				
				var titles = []; 
				
				var posterdesktop =  [];
				
				var postermob = [];
				
				var id = [];
				
				var i;
				
				for(i=0; i<18; i++) {
					
					titles.push(pop.results[i].title);
					
					posterdesktop.push("http://image.tmdb.org/t/p/w342/" + pop.results[i].poster_path);
					
					postermob.push("http://image.tmdb.org/t/p/w185/" + pop.results[i].poster_path);
					
					id.push(pop.results[i].id);
					
				}
			
				var j=0;
				
				var k=1;
				
				var l=2;
				
				if(window.innerWidth > 450) {
				
				while(j<val) {
					
				var card = " <div class=card> \
    <img class=card-img-top src= " + posterdesktop[j] + " onerror=this.src='images/def.jpg' onclick=redirect(" + id[j] + ")> \
    <div class=card-body> \
      <h5 class=card-title onclick=redirect(" + id[j] + ")>" + titles[j] + "</h5> \
    </div> \ </div> "
					
					if(titles[j] == undefined) {
					
					break;
					
				}
					
				document.getElementById("col-1-pop").innerHTML += card; 
					
				j = j + 3;
					
				}
				
				while(k<val) {
					
				var card = " <div class=card> \
    <img class=card-img-top src= " + posterdesktop[k] + " onerror=this.src='images/def.jpg' onclick=redirect(" + id[k] + ")> \
    <div class=card-body> \
      <h5 class=card-title onclick=redirect(" + id[k] + ")>" + titles[k] + "</h5> \
    </div> \ </div> "
					
					if(titles[k] == undefined) {
					
					break;
					
				}
					
				document.getElementById("col-2-pop").innerHTML += card; 
					
				k = k + 3;
					
				}
				
				while(l<val) {
					
				var card = " <div class=card> \
    <img class=card-img-top src= " + posterdesktop[l] + " onerror=this.src='images/def.jpg' onclick=redirect(" + id[l] + ")> \
    <div class=card-body> \
      <h5 class=card-title onclick=redirect(" + id[l] + ")>" + titles[l] + "</h5> \
    </div> \ </div> "
					
					if(titles[l] == undefined) {
					
					break;
					
				}
					
				document.getElementById("col-3-pop").innerHTML += card; 
					
				l = l + 3;
					
				}
					
				} else {
					
					while(j<val) {
					
				var card = " <div class=card> \
    <img class=card-img-top src= " + postermob[j] + " onerror=this.src='images/def.jpg' onclick=redirect(" + id[j] + ")> \
    <div class=card-body> \
      <h5 class=card-title onclick=redirect(" + id[j] + ")>" + titles[j] + "</h5> \
    </div> \
    </div> "
					
					if(titles[j] == undefined) {
					
					break;
					
				}
					
				document.getElementById("col-1-pop").innerHTML += card; 
					
				++j;
					
				}
				
				
			};
				
			}
		
			popular.send();
				
			}

		function search() {
			
			document.getElementById("movie-details").style.display = "none";
			
			document.getElementById("col-1").innerHTML = "";
			
			document.getElementById("col-2").innerHTML = "";
			
			document.getElementById("col-3").innerHTML = "";

			document.getElementById("col-1-pop").style.display = "none";
			
			document.getElementById("col-2-pop").style.display = "none";
			
			document.getElementById("col-3-pop").style.display = "none";
			
			document.getElementById("pop").style.display = "none";
			
			document.getElementById("container-result").style.display = "block";
			
			var queryString = document.getElementById("searchbox").value;
			
			if(queryString == "") {
				
				document.getElementById("no-query").style.display = "block";
				
			}
			
			document.title = "Search results for " + queryString;
			
			var search = new XMLHttpRequest();
			
			var URL = "https://api.themoviedb.org/3/search/movie?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&query=" +queryString;
			
			search.open('GET', URL);
			
			search.onload = function() {
				
				var ans = JSON.parse(search.responseText);
				
				ans.results.sort(function(a,b) {
					
					return b.popularity - a.popularity
					
				});
				
				var resu = ans.total_results;
				
				var pages = ans.total_pages;
				
				var val = Math.floor(resu / pages);
				
				var titles = [];
				
				var posterdesktop = [];
				
				var info = [];
				
				var id = [];
				
				var postermob = [];
				
				for( var i in ans.results) {
					
					titles.push(ans.results[i].title);
					
					posterdesktop.push("http://image.tmdb.org/t/p/w342/" + ans.results[i].poster_path);
					
					postermob.push("http://image.tmdb.org/t/p/w185/" + ans.results[i].poster_path);
					
					info.push(ans.results[i].overview);
					
					id.push(ans.results[i].id);
					
				}
				
				var j=0;
				
				var k=1;
				
				var l=2;
				
				if(window.innerWidth > 450) {
				
				while(j<val) {
					
				var card = " <div class=card> \
    <img class=card-img-top src= " + posterdesktop[j] + " onerror=this.src='images/def.jpg' onclick=redirect(" + id[j] + ")> \
    <div class=card-body> \
      <h5 class=card-title onclick=redirect(" + id[j] + ")>" + titles[j] + "</h5> \
      <p class=card-text>" + info[j] + "</p> \
    </div> \
    <div class=card-footer> \
      <small class=text-muted>" + id[j] + "</small> \
    </div> \ </div> "
					
					if(titles[j] == undefined) {
					
					break;
					
				}
					
				document.getElementById("col-1").innerHTML += card; 
					
				j = j + 3;
					
				}
				
				while(k<val) {
					
				var card = " <div class=card> \
    <img class=card-img-top src= " + posterdesktop[k] + " onerror=this.src='images/def.jpg' onclick=redirect(" + id[k] + ")> \
    <div class=card-body> \
      <h5 class=card-title onclick=redirect(" + id[k] + ")>" + titles[k] + "</h5> \
      <p class=card-text>" + info[k] + "</p> \
    </div> \
    <div class=card-footer> \
      <small class=text-muted>" + id[k] + "</small> \
    </div> \ </div> "
					
					if(titles[k] == undefined) {
					
					break;
					
				}
					
				document.getElementById("col-2").innerHTML += card; 
					
				k = k + 3;
					
				}
				
				while(l<val) {
					
				var card = " <div class=card> \
    <img class=card-img-top src= " + posterdesktop[l] + " onerror=this.src='images/def.jpg' onclick=redirect(" + id[l] + ")> \
    <div class=card-body> \
      <h5 class=card-title onclick=redirect(" + id[l] + ")>" + titles[l] + "</h5> \
      <p class=card-text>" + info[l] + "</p> \
    </div> \
    <div class=card-footer> \
      <small class=text-muted>" + id[l] + "</small> \
    </div> \ </div> "
					
					if(titles[l] == undefined) {
					
					break;
					
				}
					
				document.getElementById("col-3").innerHTML += card; 
					
				l = l + 3;
					
				}
					
				} else {
					
					while(j<val) {
					
				var card = " <div class=card> \
    <img class=card-img-top src= " + postermob[j] + " onerror=this.src='images/def.jpg' onclick=redirect(" + id[j] + ")> \
    <div class=card-body> \
      <h5 class=card-title onclick=redirect(" + id[j] + ")>" + titles[j] + "</h5> \
    </div> \
    </div> "
					
					if(titles[j] == undefined) {
					
					break;
					
				}
					
				document.getElementById("col-1").innerHTML += card; 
					
				++j;
					
				}
				
					
				}
				
			}
		
			search.send();
			
		};
		
		
		
		function redirect(id) {
			
			var url = "result.html?id=" + id;
			
			window.location.assign(url);
			
		}
		