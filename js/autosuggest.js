	window.onload = function () {		

		var input = document.getElementById("searchbox");
		
			input.addEventListener("keyup", function(event) {
						event.preventDefault();
						if (event.keyCode === 13) {
								document.getElementById("btn").click();
						}
					
auto();
				
			});
		
	};

function auto() {
		
		var queryString = document.getElementById("searchbox").value;
		
		var search = new XMLHttpRequest();
			
			var URL = "https://api.themoviedb.org/3/search/movie?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&query=" +queryString;
			
		
		search.open('GET', URL);
			
		search.onload = function() {
				
				var ans = JSON.parse(search.responseText);
				
				ans.results.sort(function(a,b) {
					
					return b.popularity - a.popularity
					
				});
				
				var titles = [];
				
				for( var i in ans.results) {
					
					titles.push(ans.results[i].title);
					
				}

			document.getElementById("id-0").innerHTML = titles[0];
	
}
		
};