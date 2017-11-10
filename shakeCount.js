var bookXML;
var frequencies = {};
var stopList = {};
function getXML(document) {
    bookXML = document;
    count();
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
    console.log("called");
    $("#content").empty();
    $(bookXML).find("LINE").each(function(){
	//	console.log($(this).text());
	var line = $(this).text().toLowerCase();
	getWords(line);
    });
    words = Object.keys( frequencies );
    results = words.sort(function (a,b) { return frequencies[b] -frequencies[a];});
    for (i=0 ; i < 50 ; i++) {
//	console.log(results[i]);
        $("#content").append(results[i]+":"+frequencies[results[i]]+"<br />");
    }
}

$(document).ready(function(){
    $.ajax({
	url: 'xmlfiles/john.xml', // name of file you want to parse
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
