
  
  $(document).ready(function() {
	  updateDisplay();
	  updateData(); //Populate the first time on refresh.
	  
   setInterval(function() {
                  updateDisplay(); //do this every 3 second
				  
                }, 3000); 
				
   setInterval(function() {
                  updateData();
                }, 36000000); 
				
	setInterval(function() {
                  animate();
                }, 10000); 
  });
  
  
  
  
  
  function updateTime()
  {
	 
	var d = new Date();	
	a = formatAMPM(d);
	$("#timeHolder").text(a);
  }
  
  function formatAMPM(date) 
  {
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ' ' + ampm;
	  return strTime;
}
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var months = ["Jan","Feb","Mar","Apr","May","Jun","July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function updateDate()
  {
	
	var daySubscript=""; 
	
	currentTime = new Date();
	date= currentTime.getDate();
	month= months[currentTime.getMonth()];
	day=currentTime.getDay();	
	weekday=days[day];
	
	if(date==1 || date==21 || date==31)
	{
		daySubscript="st"
	}
	else if(date==2 || date==22)
	{
		daySubscript="nd"
	}
	else if(date==3 || date==23)
	{
		daySubscript="rd"
	}
	else 
	{
		daySubscript="th"
	}
	displayTime=weekday + ", " + month + " "+ date+daySubscript;
	
	
	$("#dateHolder").html(displayTime);
  }
  
  function updateDisplay()
  {
	  updateTime();
	  updateDate();	  
  }
  
  function updateData()
  {
	  //updateDisplay();
	 // updateData();
	  getTemperature();
	  getWeatherDescription();	 
	  getForecast();
	  getNewsRSS();
	  
  }
  
  function getWeatherDescription()
  {
	  $.ajax({url: "/temperature", success: function(result){
        var temperature=result +"°C";
		
		$("#temperatureDiv").html(temperature);
    }});
  }
  
  function getTemperature()
  {
	  $.ajax({url: "/weatherDescription", success: function(result){
        var description=result;
		
		imagePath=getImageForWeatherDescription(description)
				
		
		$("#weatherdesc").html(description);
		$("#weatherIcon").prop("src", imagePath);
    }});
	  
  }
  
  function getForecast()
  {
	  
	  $.ajax({url: "/forecast", success: function(result){
        var forecastResult=result;
		//alert(result);
		//var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		//var months = ["Jan","Feb","Mar","Apr","May","Jun","July", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var forecastObject=jQuery.parseJSON(result);
		listObjects=forecastObject.list;
		if (listObjects.length>4)
		{
				listObjectsLength=4 
		}
		else
		{		
			listObjectsLength=listObjects.length ;
		}
		var html=""
		for(i=1;i<listObjectsLength+1;i++)
		{
			var dayTempererature=parseFloat(listObjects[i].temp.day)-273.15;
			var wDescription=listObjects[i].weather[0].main;
			var udate=listObjects[i].dt;
			
			var dateobj = new Date(udate*1000);
			// Hours part from the timestamp
			var fdate = dateobj.getDate();
			// Minutes part from the timestamp
			var fmonth = dateobj.getMonth();
			// Seconds part from the timestamp
			var seconds = "0" + dateobj.getSeconds();
			// Will display time in 10:30:23 format
			var formattedTime = months[fmonth]+ " "+fdate;
			imagePath=getImageForWeatherDescription(wDescription);
			
			html=html+"<div class='grid-100 tinyfont forecastHolder'>"
			html=html+"<span class='spacer'><b>"+formattedTime+": </b></span>"
			//html=html+"<span class='spacer'><img src='"+imagePath+"' height='50px'/></span>"
			html=html+"<span>"+dayTempererature.toFixed(0)+"°C, "+wDescription+"</span>"
			html=html+"</div>"
			
			
			$("#forecast").html(html);
		}
		
		
    }});
  }
  
  function getImageForWeatherDescription(description)
  {
	  //alert(description);
	  switch(description)
		{
			case "Smoke":
				imageName="./images/haze.png"
				break;
			case "Clear":
				imageName="./images/sun.png"
				break;
			default:
				imageName="./images/attention.png"
				break;
		}
		//alert(imageName);
		return imageName;
  }
  
  function getNewsRSS()
  {
	 $.ajax({url: "/news", success: function(result){
       
	   xmlDoc = $.parseXML( result );
	   $xml = $( xmlDoc )
	   $titles = $xml.find( "entry" )
	   
	   htmlString="<b>Phrases Of the Day</b><br>";
	   htmlString=htmlString+"<ul>";
	   $titles.slice(0, 4).each(function( index ) {
			htmlString=htmlString+"<li><b>"+ $( this ).find("title").text() + "</b>: " + $( this ).find("summary").text() + "</li>";
		});
		htmlString=htmlString+"</ul>";
		$("#newsDiv").html(htmlString);
	   
    }});
  }
  
  function animate()
  {
	  
	 /*$("#newsDiv").animate({
                width: 0
            });
	 //$("#quote").slideDown().show();
	
*/
  }
  
  
  
  
  
