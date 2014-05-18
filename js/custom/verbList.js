
function Verb(infinitive, simple, participle, meaning)
{
	this.infinitive = infinitive;
	this.simple = simple;
	this.participle = participle;
	this.meaning = meaning;
	this.voice = new Audio("voices/"+infinitive+".mp3");
}

function Round(min, max)
{
	this.roundVector = new Array();

	//max+1 because slice doesn't get the last index
	this.roundVector = verbBucket.slice(min, max+1);
}

function loadVerbs(verbBucket)
{
	$.ajax({
	    type: "GET",
	    url: "verbs.xml",
	    dataType: "xml",
	    success: function(xml){
	        $(xml).find('Verb').each(function(){
		        var infinitive = $(this).find('Infinitive').text();
		        var pastSimple = $(this).find('PastSimple').text();
		        var pastParticiple = $(this).find('PastParticiple').text();
		        var meaning = $(this).find('Meaning').text();
		        var newVerb = new Verb(infinitive,pastSimple,pastParticiple,meaning);
		        verbBucket.push(newVerb);
	    	});

	    	afterLoad();
	    },
	    error: function() {
	    	alert("An error occurred while processing XML file.");
	    }
	});
}