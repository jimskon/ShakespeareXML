var bookXML;
var filePath="/class/softdev/XMLFiles/ShakespeareXML/"
var frequencies = {};
var stopList = {};
var wordData = [];
var numWords=100;
var totalWords=0;

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
	totalWords++;
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
    for (i=0 ; i < numWords ; i++) {
	console.log(results[i]);
	//dataList.push(frequencies[results[i]]);
	//wordList.push(results[i]);
	wordData.push({ name: results[i], weight: frequencies[results[i]] });	
        //$("#content").append(results[i]+":"+frequencies[results[i]]+"<br />");
    }
}

function makeChart() {
    $(function () {
	var myChart = Highcharts.chart('chartContainer', {
	    series: [{
		type: 'wordcloud',
		data: wordData
	    }],
	    title: {
		text:"Top words in "+$(bookXML).find("TITLE:first").text()+", "+totalWords+" words"
	    },
	    tooltip: {
		formatter: function() {
		    var percent=this.point.weight/totalWords*100;
		    var perc=percent.toFixed(2);
		    return "Rank:"+(this.x+1)+",Occurences:"+this.point.weight+", "+perc+"%" ;
		}
	    }
	});
    });
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
	wordData = [];
	totalWords=0;
	getFile(fileName);
    });
});
