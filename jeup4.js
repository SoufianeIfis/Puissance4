/* jshint jquery: true */
(function($){
	$.fn.jeu = function(options) {
		var defaults = {
			"x": 8,
			"y": 7,
			"p1": "pion_jaune.gif",
			"p2": "pion_rouge.gif"
		};
		$.extend(defaults, options);
		var casse = true;
		y = defaults.y;
		x = defaults.x;
		var id;
		var cut;
		var ta;
		var id_id;			
		var y;
		var x;
		var p1;
		p1 = defaults.p1;
		var p2;
		p2 = defaults.p2;
		var turn;
		turn = p1;
		var t1;
		var t2;
		var a;
		var b;
		var joueur;
		var pl;
		var num_id;
		var i;
		var click;
		click = 0;
		t1=100;
		t2=600;
		for(a=0;a<x;a++)
		{

			for(b=0;b<y;b++)
			{
				num_id=a.toString()+"_"+b.toString();
				$('body').append("<div id='v"+num_id+"' style='position:absolute;height:70px;width:70px;left:"+t2+"px;top:"+t1+"px;';><img id='t"+num_id+"' src='casse.gif' style=z-index:2;height='70' width='70'></div>");
				t1=t1+70;
			}
			t1=100;
			t2=t2+70;
		}
		$('body').append('<p>');
		$("img").click(function ()
		{
			joueur = turn.split(".");
			$("p").html("A toi de jouer "+joueur[0]+"");
			var y1 = y;
			$("div").off("click");
			id = $(this).attr('id');

			if(casse === true)
			{
				turn = p1;
				casse = false;
			}
			else
			{
				casse = true;
				turn =  p2;
			}
			cut = id.split("_");
			cut[1] = cut[1]-cut[1]+y1-1;
			ta = cut[0]+"_"+cut[1];
			pl = cut[0].substr(1);
			id_id = $("#"+ta);
			for(i = y1+1; i>=0; i--)
			{
				if(cut[1] > -1){
					if(id_id.attr('src') == 'casse.gif'){
						click++;
						if(click == y*x){
							alert("il n'y a plus de place mon ami =D");
							window.location.reload();
						}
						id_id.data('src', turn);
						id_id.attr('src', turn).css( {top: "-400px",'z-index': 1, 'position': 'absolute'});
						$('#'+cut[0]+'_'+cut[1]).animate({top: "0px"}, 200, win(pl,p1,cut,turn,casse,x));
						
						break;
					}
					else{
						cut = id.split("_");
						cut[1] = cut[1]-cut[1]+y1-1;
						ta = cut[0]+"_"+cut[1];
						id_id = $("#"+ta);
						y1--;
					}
				}
				else{
					alert("la collone est au max");
					if(casse === true)
					{
						turn = p1;
						casse = false;
					}
					else
					{
						casse = true;
						turn =  p2;
					}
				}
			}

		});
};
function win(pl,p1,cut,turn,casse,x){
	var pl2 = pl;
	var xx = cut[1];
	var count;
	var s;
	var f;
	var column;
	var columns;
	var y0;
	var y1;
	count = 0;
	for (f = (pl-3); f <= (pl+3); f++)
	{
		s = $('#t'+f+'_'+cut[1]);
		if(s.data('src') == turn)
		{
			count++;
		}

		else
		{
			count = 0;
		}
		if(count == 4)
		{
			if(turn == p1){
				alert('Joueur 1 a gagné');
			}
			else{
				alert('Joueur 2 a gagné');
			}
			window.location.reload();
			break;
		}
	}
	for (f = (cut[1]-3); f <= (cut[1]+3); f++)
	{
		s = $('#t'+pl+'_'+f);

		if(s.data('src') == turn)
		{
			count++;
		}
		else
		{
			count = 0;
		}
		if(count == 4)
		{
			if(casse === false){
				alert('Joueur 1 a gagné');
			}
			else{
				alert('Joueur 2 a gagné');
			}
			window.location.reload();
			break;
		}
	}
	column = 0;
	for(y0 = 0; cut[1] >= y0; y0++)
	{
		cut[1]--;
		pl--;
	}
	for(column = 0; column <= x; column++)
	{
		s = $('#t'+(pl+column)+'_'+(cut[1]+column));
		if(s.data('src') == turn)
		{
			count++;
		}
		else
		{
			count = 0;
		}
		if(count == 4)
		{
			if(casse === false){
				alert('Joueur 1 a gagné');
			}
			else{
				alert('Joueur 2 a gagné');
			}
			window.location.reload();
			break;
		}
		
	}
	for(y1 = 0; pl2 >= y1; y1++)
	{
		xx++;
		pl2--;
	}
	
	for(columns = 0; columns <= x; columns++)
	{
		s = $('#t'+(pl2+columns)+'_'+(xx-columns));
		if(s.data('src') == turn)
		{
			count++;
		}
		else
		{
			count = 0;
		}
		if(count == 4)
		{
			if(casse === false){
				alert('Joueur 1 a gagné');
			}
			else{
				alert('Joueur 2 a gagné');
			}
			window.location.reload();
			break;
		}
		
	}
}
})(jQuery);