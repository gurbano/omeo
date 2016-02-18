
var selectValues = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
var ch = 0;
var base = 0.200; //200 ml - 1 glass

var animevents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
$(document).ready(function(){
	$('#slider').slider({
		orientation: "horizontal",
      	range: "min",
      	max:  20,
      	value: 1,
      	slide: function( event, ui ) {
			if (ui.value>0){
				slide(ui.value);
			}else{
				$('#slider').val(1);
			}
	        
	      }
	});
	$.each(selectValues, function(key, value) {   
	    $('#ch_select')
	         .append($("<option></option>")
	         .attr("value",selectValues[key])
	         .text(value + "CH")); 
	});
	$('#know-more-anchor').click(function(){
		
		slide(1);
		$('#main-claim').addClass('animated bounceOutLeft').one(animevents, 
			function(){
				$('#preslave').addClass('animated bounceOutRight');
				$('#main-claim').removeClass('bounceOutLeft');
				$('#main-claim').text("L'omeopatia e' ciarlataneria.");
				$('#main-claim').addClass('bounceInLeft');
				$('#slave').show();
				$('#slave').addClass('animated fadeIn').one(animevents, function(){
					$('#preslave').removeClass('bounceOutRight');
					$('#preslave').text("Le diluzioni standard in omeopatia vanno da 1 a 100 CH. Sai cosa significa?");
					$('#preslave').addClass('bounceInRight');
				});
		});	
	});
	setTimeout(function(){
		$('#preslave').addClass('animated rubberBand');
		$('#preslave').show();
	},1500);
	
});

function slide(val){
	ch = val;//$('#ch_select option:selected').attr('value');
	$('#soluzione').html(getParts(ch));	
	$('#tot-legend').html(getReference(ch));	
	$('#ch_indi').html(val + ' CH');
}

function getParts(_ch){
	var ret = "un <i class='fa fa-glass'></i>";	
	var litri = base * Math.pow(100,_ch);
	ret += " in ";
	ret += toItalianString(litri, '');	
	return ret;
}

var m3 = mille =1000;
var milione = 1000000;
var miliardo = 1000000000;
var km3 = 1000000000000;
var oceans = 1.3 * miliardo * km3;
var earth = 49 * 17 * oceans;
var sun = 987 * 1322 * earth;

var references=[

	{l : 1.5, obj:['bottiglie']},
	{l : 10, obj:['taniche da 10 litri']},
	{l : 160, obj:['vasche da bagno']},
	{l : 2500 * m3, obj:['piscine olimpioniche']},
	{l : 0.5 * km3, obj:['volte l\'acqua contenuta nella diga delle Tre Gole']},
	{l : 50 * km3, obj:['volte il Lago di Garda']},
	{l : 147 * km3, obj:['volte il Mar Morto']},
	{l : 2750 * km3, obj:['volte il Lago Vittoria']},
	{l : 4.4 * milione * km3, obj:['volte il Mar Mediterraneo']},
	{l : 0.66 * miliardo * km3, obj:['volte l\'Oceano Pacifico']},
	{l : 17 * oceans, obj:['volte il volume della Luna']},
	{l : earth, obj:['volte il volume della Terra']},
	{l : 1322 * earth, obj:['volte il volume di Giove']},
	{l : sun, obj:['volte il volume del Sole']},
	{l : 1700 * sun, obj:['volte il volume di <a target="" href="https://it.wikipedia.org/wiki/UY_Scuti">UY Scuti</a>']}	
];

var numbers = [
	'zero',
	'uno',
	'due',
	'tre',
	'quattro',
	'cinque',
	'sei',
	'sette',
	'otto',
	'nove',
	'dieci',
	'undici',
	'dodici',
	'tredici',
	'quattordici',
	'quindici',
	'sedici',
	'diciassette',
	'diciotto',
	'diciannove',
	'venti'
];

function getReference(_ch){
	var ret = "";	
	var litri = base * Math.pow(100,_ch);
	for (var i = references.length - 1; i >= 0; i--) {
		if (litri < references[i].l){

		}else{
			return (litri/references[i].l).toFixed(0)+ ' ' + references[i].obj[0];
		}
	};

	return ret;
}

function toItalianString (litri, acc) {
	if ((litri / 1000000000)>=1) {
		return toItalianString(litri/1000000000, ' miliardi di' + acc);
	}
	if ((litri / 1000000)>=1) {
		return toItalianString(litri/1000000, ' milioni di' + acc);
	}
	if ((litri / 1000)>=1) {
		return toItalianString(litri/1000, 'mila ' + acc);
	}
	if ((litri / 100)>=1) {
		return toItalianString(litri/100, 'cento ' + acc);
	}
	return numbers[Math.round(litri)] + acc + ' litri';
}