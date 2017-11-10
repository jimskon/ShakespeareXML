var bookXML;
var filePath="/class/softdev/XMLFiles/ShakespeareXML/"

function getXML(document) {
    bookXML = document;
//    lookup();
}

function lookup(){
    console.log("called");
    $("#content").empty();
    // Get word, make lowercase, and strip punctuation
    var wordToFind = $('#word').val().toLowerCase();
    console.log(wordToFind);
    $(bookXML).find("LINE").each(function(){
	//	console.log($(this).text());
	var line = $(this).text();
	var cleanLine = $(this).text().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	if (cleanLine.indexOf(wordToFind+" ")==0 ||
	    cleanLine.indexOf(" "+wordToFind+" ")>=0 ||
	    cleanLine.endsWith(wordToFind)) {
	    $("#content").append(line+"<br />");
	}
    });
}

$(document).ready(function(){
    $.ajax({
	url: filePath+"a_and_c.xml", // name of file you want to parse
	dataType: "xml",
	success: getXML,
	error: function(){alert("Error: Something went wrong");}

    });
});
