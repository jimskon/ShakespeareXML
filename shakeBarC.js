var bookXML;
var filePath="/class/softdev/XMLFiles/ShakespeareXML/"
var frequencies = {};
var stopList = {};
var wordData = [];
function getXML(document) {
    bookXML = document;
    count();
    console.log(JSON.stringify(wordData));
    makeChart();
}

function getStop(stops) {
    var list=stops.split("\n");
    for (i=0;i<list.length;i++) {
	stopList[list[i]]=i;
    }
}

function getWords(string) {
    var cleanString = string.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""),
	words = cleanString.split(' '),
	word, frequency, i;

    for( i=0; i<words.length; i++ ) {
        //console.log(stopList[words[i]]+":"+words[i]);

	if (stopList[words[i]]==undefined){
	    word = words[i];
	    frequencies[word] = frequencies[word] || 0;
	    frequencies[word]++;
	}
    }

}

function count(){
    console.log("BAR");
    $("#content").empty();
    $(bookXML).find("LINE").each(function(){
	//	console.log($(this).text());
	var line = $(this).text().toLowerCase();
	getWords(line);
    });
    words = Object.keys( frequencies );
    results = words.sort(function (a,b) { return frequencies[b] -frequencies[a];});
    for (i=0 ; i < 50 ; i++) {
	console.log(results[i]);
	wordData.push({ y: frequencies[results[i]], label: results[i] });	
        //$("#content").append(results[i]+":"+frequencies[results[i]]+"<br />");
    }
}

function makeChart(){
    var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,

	title:{
	    text:"Top words in "+$(bookXML).find("TITLE:first").text()
	},
	axisX:{
	    interval: 1
	},
	axisY2:{
	    interlacedColor: "rgba(1,77,101,.2)",
	    gridColor: "rgba(1,77,101,.1)",
	    title: "Number of Companies"
	},
	data: [{
	    type: "bar",
	    name: "companies",
	    axisYType: "secondary",
	    color: "#014D65",
	    dataPoints: wordData}]
    });
    chart.render();
}
				  
$(document).ready(function(){
    $.ajax({
	url: filePath+'john.xml', // name of file you want to parse
	dataType: "xml",
	success: getXML,
	error: function(){alert("Error: Something went wrong");}

    });
    $.ajax({
	url: 'stop.txt', 
	dataType: "text",
	success: getStop,
	error: function(){alert("Error: Something went wrong");}

    });
});
