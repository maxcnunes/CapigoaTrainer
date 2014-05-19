var Step = {
	Infinitive: 0,
	Simple: 1,
	Participle: 2
};

var Round = {
	One: 1,
	Two: 2,
	Three: 3,
	Four: 4,
	Five: 5,
	Six: 6,
	Seve: 7
};

$(function(){
	verbBucket = new Array();
	loadVerbs(verbBucket);
});

References = null;
webpageInterface = null;
verbsControls = null;

function afterLoad()
{
	References = new ElementsReferences();
	userInterface = new UserInterface();
	controls = new Controls();
	controls.startControls();
}
