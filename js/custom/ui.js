function References()
{
	this.word = $("#word");
	this.totalWords = $("#totalWords");
	this.score = $("#score");
	this.totalScore = $("#totalScore");
	this.currentWord = $("#currentWord");
	this.verbTense = $("#command");
	this.userInput = $("#userInput input");
	this.wordHistoryList = $("#wordWrapper");
	this.dinamic = $("#dinamic");
	this.results = $("#results");
	this.roundButton = $("#menu > a");
	this.retry = $("#retry");
	this.retryMissed = $("#retryMissed");
}

function userInterface()
{
	this.references = new References();

	//Basic methods
	this.IncrementWord = function()
	{
		this.references.word.text(parseInt(this.references.word.text()) + 1); 
	}

	this.ClearWord = function()
	{
		this.references.word.text(1);
	}

	this.IncrementScore = function(wordScore)
	{
		inc = wordScore[0] + wordScore[1];
		this.references.score.text(parseInt(this.references.score.text()) + inc);
	}

	this.ClearScore = function()
	{
		this.references.score.text(0);
	}

	this.ChangeCurrentWord = function(newWord)
	{
		this.references.currentWord.text(newWord);
	}

	this.ChangeVerbTense = function(tense)
	{
		if(tense === "simple")
			vTense = "Past Simple:";
		else
			vTense = "Past Participle:";

		this.references.verbTense.text(vTense);
	}

	this.getUserInput = function() 
	{
		return this.references.userInput.val();
	}

	this.ClearUserInput = function()
	{
		this.references.userInput.val("");
	}

	this.UserInputIsNotEmpty = function()
	{
		if(this.getUserInput().length == 0)
			return false;

		return true;
	}

	this.AddVerbInVerbList = function(verb,wordScore,wordHistory)
	{
		titleSimple = "";
		titleParticiple = "";

		if(wordScore[0] == 1){
			classSimple = ' class="correct"';
		}
		else{
			classSimple = ' class="wrong"';
			titleSimple = ' title="'+wordHistory[0]+'"';
		}

		if(wordScore[1] == 1){
			classParticiple = ' class="correct"';
		}
		else{
			classParticiple = ' class="wrong"';
			titleParticiple = ' title="'+wordHistory[1]+'"';
		}

		

		newTag = "<ul><li>"+verb.infinitive+"</li><li"+classSimple+titleSimple+">"+verb.simple+"</li><li"+classParticiple+titleParticiple+">"+verb.participle+"</li></ul>";
		this.references.wordHistoryList.prepend(newTag);
	}

	this.resetWordCounter = function(vectorSize)
	{
		this.references.word.text(0);
		this.references.totalWords.text(vectorSize);
	}

	this.resetScore = function(vectorSize)
	{
		this.references.score.text(0);
		this.references.totalScore.text(vectorSize*2);
	}

	this.resetWordHistory = function()
	{
		this.references.wordHistoryList.html("");
	}

	this.showDinamic = function()
	{
		this.references.dinamic.slideDown(1000);
	}

	this.hideDinamic = function()
	{
		this.references.dinamic.slideUp(1000);
	}

	this.showResults = function()
	{
		this.references.results.slideDown(1000);
	}

	this.hideResults = function()
	{
		this.references.results.slideUp(1000);
	}

	this.enableRetryMissed = function()
	{
		this.references.retryMissed.removeClass("disableRetryMissed");
		this.references.retryMissed.removeAttr('href');
	}

	this.disableRetryMissed = function()
	{
		this.references.retryMissed.addClass("disableRetryMissed");
		this.references.retryMissed.addAttr('href','#');
	}
}