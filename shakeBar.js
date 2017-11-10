var bookXML;
var filePath="/class/softdev/XMLFiles/ShakespeareXML/"
var frequencies = {};
var stopList = {};
var wordData = [];
var dataList = [];
var wordList = [];
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
	dataList.push(frequencies[results[i]]);
	wordList.push(results[i]);
	//wordData.push({ weight: frequencies[results[i]], name: results[i] });	
        //$("#content").append(results[i]+":"+frequencies[results[i]]+"<br />");
    }
}

function makeChart() {
    $(function () {
	var myChart = Highcharts.chart('chartContainer', {
	    chart: {
		type: 'bar'
	    },
	    title: {
		text:"Top words in "+$(bookXML).find("TITLE:first").text()
	    },
	    xAxis: {
		categories: wordList
	    },
	    yAxis: {
		title: {
		    text: 'Words'
		}
	    },
	    series: [{ data: dataList }]
	});
    });
}

function makeChart2(){
    var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,

	title:{
	    text:"Top words in <font color='Blue'>"+$(bookXML).find("TITLE:first").text()+"</font>"
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
				  
function getFile(fileName) {
    $.ajax({
	url: filePath+fileName, // name of file you want to parse
	dataType: "xml",
	success: getXML,
	error: function(){alert("Error: Something went wrong");}

    });


}


$(document).ready(function(){
    $.ajax({
	url: 'stop.txt', 
	dataType: "text",
	success: getStop,
	error: function(){alert("Error: Something went wrong");}
    });

    $(".dropdown-menu li a").click(function(){
	console.log("pick!"+$(this).text());
	$(this).parents(".btn-group").find('.selection').text($(this).text());
	var fileName=$(this).attr("data-file");
	console.log(fileName);
	dataList = [];
	wordList = [];

	getFile(fileName);
    });
});
