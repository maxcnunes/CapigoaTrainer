$(function(){

	if (!(navigator.userAgent.indexOf('Chrome') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Chrome') + 7).split(' ')[0]) >= 15)){
		alert("Your browser is not fully compatible with this website yet. Please use google chrome.");
	}


	verbBucket = new Array();
	loadVerbs(verbBucket);

});


function afterLoad()
{
	UI = new userInterface();
	CTR = new Controls();
	CTR.startControls();
}
