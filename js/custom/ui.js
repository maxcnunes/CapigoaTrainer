function UserInterface()
{
	this.meaning = null;

	this.clearWord = function()
	{
		References.word.text(1);
	}

	this.incrementWord = function()
	{
		References.word.text(parseInt(References.word.text()) + 1); 
	}

	this.clearScore = function()
	{
		References.score.text(0);
	}

	this.incrementScore = function(wordScore)
	{
		inc = wordScore[0] + wordScore[1] + wordScore[2];
		References.score.text(parseInt(References.score.text()) + inc);
	}

	this.changeCurrentWord = function(newWord)
	{
		References.currentWord.text(newWord);
	}

	this.changeVerbTense = function(tense)
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

		References.verbTense.text(vTense);
	}

	this.clearUserInput = function()
	{
		References.userInput.val("");
	}

	this.getUserInput = function() 
	{
		return References.userInput.val();
	}

	this.userInputIsNotEmpty = function()
	{
		if(this.getUserInput().length == 0)
			return false;

		return true;
	}

	this.addVerbInVerbList = function(verb,wordScore,wordHistory)
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
		References.wordHistoryList.prepend(newTag);
	}

	this.resetWordCounter = function(vectorSize)
	{
		References.word.text(0);
		References.totalWords.text(vectorSize);
	}

	this.resetScore = function(vectorSize)
	{
		References.score.text(0);
		References.totalScore.text(vectorSize*3);
	}

	this.resetWordHistory = function()
	{
		References.wordHistoryList.html("");
	}

	this.showDinamic = function()
	{
		References.dinamic.slideDown(1000);
	}

	this.hideDinamic = function()
	{
		References.dinamic.slideUp(1000);
	}

	this.showResults = function()
	{
		References.results.slideDown(1000);
	}

	this.hideResults = function()
	{
		References.results.slideUp(1000);
	}

	this.enableRetryMissed = function()
	{
		References.retryMissed.removeClass("disableRetryMissed");
		References.retryMissed.removeAttr('href');
	}

	this.disableRetryMissed = function()
	{
		References.retryMissed.addClass("disableRetryMissed");
		References.retryMissed.attr('href','#');
	}

	this.showSubMenu = function()
	{
		References.subMenu.slideDown(200);
	}

	this.showAbout = function()
	{
		References.subMenuRounds.hide();
		References.subMenuAbout.show(200);
		References.subMenu.slideDown(300);
	}

	this.showRound = function()
	{
		References.subMenuAbout.hide();
		References.subMenuRounds.show(200);
		References.subMenu.slideDown(300);
	}

	this.hideSubMenu = function()
	{
		References.subMenu.slideUp(200);
	}

	this.quickHideSubMenu = function()
	{
		References.subMenu.slideUp(100);
	}

	this.showMeaning = function(content,x,y)
	{
		if(this.meaning == null)
			this.meaning = this.buildMeaning(content);

		this.showInformation(this.meaning,x,y);
	}

	this.showInformation = function(content,x,y)
	{
		References.information.css('left',(x+10));
		References.information.css('top',(y+10));
		References.informationText.html(content);
		References.information.fadeIn(200);		
	}

	this.hideInformation = function()
	{
		References.information.fadeOut(200);
	}

	this.buildMeaning = function(meaningList)
	{
		var ulTag = '<ul>';
		for (meaning in meaningList)
			ulTag += '<li>'+meaningList[meaning]+'</li>';

		ulTag += '</ul>';

		return ulTag;
	}

	this.resetMeaning = function()
	{
		this.meaning = null;
	}
}