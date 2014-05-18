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

	this.startControls = function()
	{
		this.defineAutoFocus();
		this.defineOnEnter();
		this.defineOnClick();
		this.createRoundsVectors();
		this.setInitialValues();
	}
	
	this.defineAutoFocus = function()
	{
		UI.references.userInput.focus();

		UI.references.userInput.on('blur',function()
		{
			UI.references.userInput.focus();
		});
	}

	this.defineOnEnter = function()
	{
		UI.references.userInput.keydown(function(e)
		{
			if(e.which == 9)
				e.preventDefault();
			else if(e.which == 13)
				CTR.userEnter();
			else if(e.which == 32)
			{
				e.preventDefault();
				CTR.playVoice();
			}
		});
	}

	this.defineOnClick = function()
	{
		UI.references.roundButton.click(function(e)
		{
			buttonID = e.target.id || e.target.parentNode.id;

			switch(buttonID)
			{
				case 'r1':
					CTR.chooseRound(CTR.round1);
					break;
				case 'r2':
					CTR.chooseRound(CTR.round2);
					break;
				case 'r3':
					CTR.chooseRound(CTR.round3);
					break;
				case 'r4':
					CTR.chooseRound(CTR.round4);
					break;
				case 'r5':
					CTR.chooseRound(CTR.round5);
					break;
				case 'r6':
					CTR.chooseRound(CTR.round6);
					break;
				case 'r7':
					CTR.chooseRound(CTR.round7);
					break;
			}

			CTR.resetValues();
		});

		UI.references.retryMissed.click(function() {
			CTR.getVectorFromWrongAnswers();
		});

		UI.references.roundButton.click(function() {
			if($(this).hasClass("active"))
				return;
		    UI.references.roundButton.removeClass('active');
		    $(this).addClass('active');
		});

		UI.references.replay.click(function() {
			CTR.playVoice();
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
			if(UI.UserInputIsNotEmpty() == true)
			{
				oldStep = this.currentStep;
				this.verifyWord();

				if(this.currentStep == Step.Infinitive)
					this.currentStep = Step.Simple;
				else if(this.currentStep == Step.Simple)
					this.currentStep = Step.Participle;
				else
					this.currentStep = Step.Infinitive;
					
				UI.ChangeVerbTense(this.currentStep);

				if(oldStep == Step.Participle)
				{
					this.setScore();
					UI.AddVerbInVerbList(this.word,this.wordScore,this.wordHistory);
					this.addWrongAnswer();

					this.updateStatus();
				}

				UI.ClearUserInput();
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
		UI.ChangeVerbTense(Step.Infinitive);
		this.currentStep = Step.Infinitive;
		UI.resetWordCounter(this.currentVector.length);
		UI.resetScore(this.currentVector.length);
		this.wordCounter = 1;
		this.score = 0;
		this.roundFinished = false;

		UI.resetWordHistory();
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
		UI.IncrementScore(this.wordScore);
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
		UI.setMeaning(this.word.meaning);
		UI.IncrementWord();
	}
	this.cleanWordScore = function()
	{
		this.wordScore[0] = 0;
		this.wordScore[1] = 0;
		this.wordScore[2] = 0;
	}

	this.verifyWord = function()
	{
		userInput = UI.getUserInput().trim();
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

		UI.showResults();
		UI.hideDinamic();
	}

	this.enableRetryMissed = function()
	{
		UI.references.retryMissed.click(function() {
			CTR.getVectorFromWrongAnswers();
		});

		UI.enableRetryMissed();
	}

	this.disableRetryMissed = function()
	{
		this.detachOnclickRetryMissed();
		UI.disableRetryMissed();	
	}

	this.detachOnclickRetryMissed = function()
	{
		UI.references.retryMissed.unbind('click');
	}

	this.getVectorFromWrongAnswers = function()
	{
		this.currentVector = this.wrongAnswers.slice(0);
		this.resetValues();
	}

	this.resetDisplay = function()
	{
		UI.showDinamic();
		UI.hideResults();
	}

	this.playVoice = function(word)
	{
		this.word.voice.play();
	}
}