	document.getElementById("searchbox").addEventListener("keyup", function(event) {
			
			document.getElementById("sugg").style.display = "block";
		
			var queryString = document.getElementById("searchbox").value;
			
		var dataString = 'query='+queryString;
		
	$.ajax({
    url: 'autosugg.php',
    type: 'POST',
    data: dataString,
    success: function(data) {
    var result = JSON.parse(data);
			document.getElementById("li-1").innerHTML = result[0];
						document.getElementById("li-2").innerHTML = result[1];
						document.getElementById("li-3").innerHTML = result[2];
						document.getElementById("li-4").innerHTML = result[3];
						document.getElementById("li-5").innerHTML = result[4];
						
    }
});
			
		});
		
			function validate(e) {
				
				var query = document.getElementById("searchbox").value;
				
				if(query == "") {
					
					e.preventDefault();
					
					document.getElementById("alert").style.display = "block";
					
					document.getElementById("pop").style.display = "none";
					
					document.getElementById("deck").style.display = "none";
					
				}
		
			}
		
      function redirect(id) {
			
				var url = "result.html?id=" + id;

				window.location.assign(url);
			
			}
		
		function gotoSearch(val) {
				
				var query = document.getElementById(val).innerHTML;
				
				document.getElementById("searchbox").value = query;
				
				var url = "index.php?search=" + query + "&btn="
				
				window.location.assign(url);
				
				document.getElementById("sugg").style.display = "none";
				
			}
      