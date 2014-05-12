function Controls()
{
	this.word = null;
	this.score = 0;
	this.wordScore = [0,0];
	this.wordCounter = 1;
	this.wordHistory = [null,null];
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

		UI.references.retry.click(function()
		{
			CTR.chooseRound(CTR.currentRound);
			CTR.resetValues();
		});

		this.attachOnclickRetryMissed();

		UI.references.roundButton.click(function() {
			if($(this).hasClass("active"))
				return;
		    UI.references.roundButton.removeClass('active');
		    $(this).addClass('active');
		});

	}

	this.createRoundsVectors = function()
	{	
		this.round1 = new Round(0, 49);
		this.round2 = new Round(50, 99);
		this.round3 = new Round(100, 149);
		this.round4 = new Round(150, 198);
		this.round5 = new Round(0, 99);
		this.round6 = new Round(100, 198);
		this.round7 = new Round(0, 198);
	}

	this.userEnter = function()
	{
		if(!this.roundFinished)
		{
			if(UI.UserInputIsNotEmpty() == true)
			{
				this.verifyWord();

				if(this.currentStep == Step.Simple){
					UI.ChangeVerbTense("participle");
					this.currentStep = Step.Participle;
				}
				else{
					UI.ChangeVerbTense("simple");
					this.currentStep = Step.Simple;
					
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
		UI.ChangeVerbTense("simple");
		this.currentStep = Step.Simple;
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

		if(this.wordScore[0] == 0 || this.wordScore[1] == 0)
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
		this.score += this.wordScore[0] + this.wordScore[1];
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
		UI.ChangeCurrentWord(this.word.infinitive);
		UI.IncrementWord();
	}
	this.cleanWordScore = function()
	{
		this.wordScore[0] = 0;
		this.wordScore[1] = 0;
	}

	this.verifyWord = function()
	{
		switch(this.currentStep)
		{
			case Step.Simple:
				this.verifySimple();
				break;
			case Step.Participle:
				this.verifyParticiple();
				break;
		}
	}

	this.verifySimple = function()
	{
		this.wordHistory[0] = UI.getUserInput();
		if(this.word.simple == this.wordHistory[0])
		{
			this.wordScore[0] = 1;
		}
	}

	this.verifyParticiple = function()
	{
		this.wordHistory[1] = UI.getUserInput();
		if(this.word.participle == this.wordHistory[1])
		{
			this.wordScore[1] = 1;
		}
	}

	this.showResults = function()
	{
		if(this.wrongAnswers.length > 0)
		{
			this.attachOnclickRetryMissed();
			UI.enableRetryMissed();
		}
		else
		{
			this.detachOnclickRetryMissed();
			UI.disableRetryMissed();			
		}

		UI.hideDinamic();
	}

	this.attachOnclickRetryMissed = function()
	{
		UI.references.retryMissed.click(function()
		{
			CTR.currentVector = CTR.wrongAnswers.slice(0);
			CTR.resetValues();
		});
	}

	this.detachOnclickRetryMissed = function()
	{
		UI.references.retryMissed.click(function(e)
		{
			$(this).remove()
		});
	}

	this.resetDisplay = function()
	{
		UI.showDinamic();
		UI.hideResults();
	}
}