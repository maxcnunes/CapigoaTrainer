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
	this.dinamic = $("#inputArea");
	this.results = $("#results");
	this.roundButton = $("#menu > a");
	this.retry = $("#retry");
	this.retryMissed = $("#retryMissed");
	this.replay = $("#replay");
	this.hiddenPlayer = $("#hiddenPlayer");
	this.meaning = $("#meaning");
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
		inc = wordScore[0] + wordScore[1] + wordScore[2];
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
		vTense = "";

		switch(tense)
		{
			case Step.Infinitive:
				vTense = "Infinitive:";
				break;
			case Step.Simple:
				vTense = "Past Simple:";
				break;
			case Step.Participle:
				vTense = "Past Participle:";
				break;
		}

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
		titleInfinitive = "";

		if(wordScore[0] == 1){
			classInfinitive = ' class="correct"';
		}
		else{
			classInfinitive = ' class="wrong"';
			titleInfinitive = ' title="You typed: '+wordHistory[0]+'"';
		}

		if(wordScore[1] == 1){
			classSimple = ' class="correct"';
		}
		else{
			classSimple = ' class="wrong"';
			titleSimple = ' title="You typed: '+wordHistory[1]+'"';
		}

		if(wordScore[2] == 1){
			classParticiple = ' class="correct"';
		}
		else{
			classParticiple = ' class="wrong"';
			titleParticiple = ' title="You typed: '+wordHistory[2]+'"';
		}

		newTag = "<ul><li"+classInfinitive+titleInfinitive+">"+verb.infinitive+"</li><li"+classSimple+titleSimple+">"+verb.simple+"</li><li"+classParticiple+titleParticiple+">"+verb.participle+"</li></ul>";
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
		this.references.totalScore.text(vectorSize*3);
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
		this.references.retryMissed.attr('href','#');
	}

	this.setMeaning = function(meaning)
	{
		this.references.meaning.attr("title",meaning);
	}
}