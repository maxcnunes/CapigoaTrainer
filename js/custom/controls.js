function Controls()
{
	this.word = null;
	this.score = 0;
	this.wordScore = [0,0];
	this.wordCounter = 1;
	this.wordHistory = [null,null,null];
	this.currentVector = null;
	this.currentRound = null;
	this.wrongAnswers = null;
	this.currentTab = Tabs.None;

	this.startControls = function()
	{
		this.defineAutoFocus();
		this.defineOnEnter();
		this.defineOnClick();
		this.defineOnOver();
		this.createRoundsVectors();
		this.setInitialValues();
	}
	
	this.defineAutoFocus = function()
	{
		References.userInput.focus();

		References.userInput.on('blur',function()
		{
			References.userInput.focus();
		});
	}

	this.defineOnEnter = function()
	{
		References.userInput.keydown(function(e)
		{
			if(e.which == 9)
				e.preventDefault();
			else if(e.which == 13)
				controls.userEnter();
			else if(e.which == 32)
			{
				e.preventDefault();
				controls.playVoice();
			}
		});
	}

	this.defineOnClick = function()
	{
		References.roundButton.click(function(e)
		{
			buttonID = e.target.id || e.target.parentNode.id;

			switch(buttonID)
			{
				case 'r1':
					controls.chooseRound(controls.round1);
					userInterface.changeRoundInMenu(Rounds.One);
					break;
				case 'r2':
					controls.chooseRound(controls.round2);
					userInterface.changeRoundInMenu(Rounds.Two);
					break;
				case 'r3':
					controls.chooseRound(controls.round3);
					userInterface.changeRoundInMenu(Rounds.Three);
					break;
				case 'r4':
					controls.chooseRound(controls.round4);
					userInterface.changeRoundInMenu(Rounds.Four);
					break;
				case 'r5':
					controls.chooseRound(controls.round5);
					userInterface.changeRoundInMenu(Rounds.Five);
					break;
				case 'r6':
					controls.chooseRound(controls.round6);
					userInterface.changeRoundInMenu(Rounds.Six);
					break;
				case 'r7':
					controls.chooseRound(controls.round7);
					userInterface.changeRoundInMenu(Rounds.Seven);
					break;
			}

			controls.resetValues();
		});

		References.retry.click(function() {
			controls.chooseRound(controls.currentRound);
			controls.resetValues();
		});

		References.retryMissed.click(function() {
			controls.getVectorFromWrongAnswers();
		});

		References.roundButton.click(function() {
			if($(this).hasClass("active"))
				return;
		    References.roundButton.removeClass('active');
		    $(this).addClass('active');
		});

		References.replay.click(function() {
			controls.playVoice();
		});

		References.round.click(function() {
			if(controls.currentTab == Tabs.Round)
			{
				userInterface.hideSubMenu();
				controls.currentTab = Tabs.None;
			}
			else
			{
				if(References.subMenu.is(":visible"))
					userInterface.quickHideSubMenu();

				userInterface.showRound();

				controls.currentTab = Tabs.Round;
			}
			
		});

		References.about.click(function() {
			if(controls.currentTab == Tabs.About)
			{
				userInterface.hideSubMenu();
				controls.currentTab = Tabs.None;
			}
			else
			{
				if(References.subMenu.is(":visible"))
					userInterface.quickHideSubMenu();

				userInterface.showAbout();

				controls.currentTab = Tabs.About;
			}
			
		});

		// References.verbList.click(function() {
		// 	References.blackLayer.show();			
		// });

		// References.blackLayer.click(function() {
		// 	References.blackLayer.hide();
		// });
	}

	this.defineOnOver = function()
	{
		References.meaning.on("mouseenter",function(e)
		{
			userInterface.showMeaning(controls.word.meaning, e.pageX, e.pageY);
		})

		References.meaning.on("mouseleave",function(e)
		{
			userInterface.hideInformation();
		})
	}

	this.createRoundsVectors = function()
	{	
		this.round1 = new Round(0, 49);
		this.round2 = new Round(50, 99);
		this.round3 = new Round(100, 149);
		this.round4 = new Round(150, 199);
		this.round5 = new Round(0, 99);
		this.round6 = new Round(100, 199);
		this.round7 = new Round(0, 199);
	}

	this.userEnter = function()
	{
		if(!this.roundFinished)
		{
			if(userInterface.userInputIsNotEmpty() == true)
			{
				oldStep = this.currentStep;
				this.verifyWord();

				if(this.currentStep == Step.Infinitive)
					this.currentStep = Step.Simple;
				else if(this.currentStep == Step.Simple)
					this.currentStep = Step.Participle;
				else
					this.currentStep = Step.Infinitive;
					
				userInterface.changeVerbTense(this.currentStep);

				if(oldStep == Step.Participle)
				{
					this.setScore();
					userInterface.addVerbInVerbList(this.word,this.wordScore,this.wordHistory);
					this.addWrongAnswer();

					this.updateStatus();
				}

				userInterface.clearUserInput();
			}
		}	
	}

	this.setInitialValues = function()
	{
		this.chooseRound(this.round1);
		this.wrongAnswers = new Array();
		this.resetValues();
	}

	this.resetValues = function()
	{
		this.cleanWrongAnswers();
		userInterface.changeVerbTense(Step.Infinitive);
		this.currentStep = Step.Infinitive;
		userInterface.resetWordCounter(this.currentVector.length);
		userInterface.resetScore(this.currentVector.length);
		this.wordCounter = 1;
		this.score = 0;
		this.roundFinished = false;

		userInterface.resetWordHistory();
		this.updateStatus();
		this.resetDisplay();
	}

	this.cleanWrongAnswers = function()
	{
		while(this.wrongAnswers.length > 0) 
			this.wrongAnswers.pop();
	}

	this.addWrongAnswer = function()
	{
		if(this.wordScore[0] == 0 || this.wordScore[1] == 0 | this.wordScore[2] == 0)
		{
			this.wrongAnswers.push(this.word);
		}	
	}

	this.chooseRound = function(round)
	{
		this.currentRound = round;
		this.currentVector = round.roundVector.slice(0);
	}

	this.setScore = function()
	{
		this.score += this.wordScore[0] + this.wordScore[1] + this.wordScore[2];
		userInterface.incrementScore(this.wordScore);
	}

	this.updateStatus = function()
	{
		if(this.currentVector.length != 0)
			this.getNextWord();
		else
			this.roundFinished = true;
		
		if (this.roundFinished){
			this.showResults();
		}else{
			this.updateUI();
			this.cleanWordScore();
		}
	}

	this.getNextWord = function()
	{	
		randomIndex = Math.floor((Math.random() * this.currentVector.length) + 0);
		this.word = this.currentVector[randomIndex];
		this.currentVector.splice(randomIndex,1);
	}

	this.updateUI = function()
	{
		this.playVoice();
		userInterface.resetMeaning();
		userInterface.incrementWord();
	}
	this.cleanWordScore = function()
	{
		this.wordScore[0] = 0;
		this.wordScore[1] = 0;
		this.wordScore[2] = 0;
	}

	this.verifyWord = function()
	{
		userInput = userInterface.getUserInput().trim();
		switch(this.currentStep)
		{
			case Step.Infinitive:
				this.verifyInfinitive(userInput);
				break;
			case Step.Simple:
				this.verifySimple(userInput);
				break;
			case Step.Participle:
				this.verifyParticiple(userInput);
				break;
		}
	}

	this.verifyInfinitive = function(userInput)
	{
		this.wordHistory[0] = userInput;
		if(this.word.infinitive == userInput)
			this.wordScore[0] = 1;
	}

	this.verifySimple = function(userInput)
	{
		this.wordHistory[1] = userInput;
		if(this.word.simple == userInput)
			this.wordScore[1] = 1;
	}

	this.verifyParticiple = function(userInput)
	{
		this.wordHistory[2] = userInput;
		if(this.word.participle == userInput)
			this.wordScore[2] = 1;
	}

	this.showResults = function()
	{
		this.detachOnclickRetryMissed();
		if(this.wrongAnswers.length > 0)
			this.enableRetryMissed();
		else
			this.disableRetryMissed();

		userInterface.showResults();
		userInterface.hideDinamic();
	}

	this.enableRetryMissed = function()
	{
		References.retryMissed.click(function() {
			controls.getVectorFromWrongAnswers();
		});

		userInterface.enableRetryMissed();
	}

	this.disableRetryMissed = function()
	{
		this.detachOnclickRetryMissed();
		userInterface.disableRetryMissed();	
	}

	this.detachOnclickRetryMissed = function()
	{
		References.retryMissed.unbind('click');
	}

	this.getVectorFromWrongAnswers = function()
	{
		this.currentVector = this.wrongAnswers.slice(0);
		this.resetValues();
	}

	this.resetDisplay = function()
	{
		userInterface.showDinamic();
		userInterface.hideResults();
	}

	this.playVoice = function(word)
	{
		this.word.voice.play();
	}
}


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
		        var meaning = new Array();
		        $(this).find('Meaning').each(function(){
		        	meaning.push($(this).text());
		        })
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