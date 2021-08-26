
	var grawervalues = {
		'obrazek': '',
		'grawer_wersja': 'prawa',
		'grawer_miejsce': 'korpus',
		'grawer_pozycja': 0,
		'grawer_wielkosc': 1,
		
		'grawer_czcionka': 'Arial',
		'grawer_text': '',
		'grawer_produkt': '',
	};
	/*{
		'lewa': {
			'skuwka': '0 0 0 -160px',
			'środek': '0 -130px 0 0',
			'stalówka': '0 -280px 0 0'
		},
		'prawa': {
			'skuwka': '0 0 0 -280px',
			'środek': '0 0 0 -130px',
			'stalówka': '0 -160px 0 0'
		}
	};*/
	function moveGraverText(pos){
	
		grawervalues['grawer_pozycja'] += pos;
		document.getElementById('span_text_position').innerHTML = grawervalues['grawer_pozycja'];
		
		/*var left = {
			min: null,
			max: null,
		};
		if(grawervalues['grawer_wersja'] == 'prawa'){
			if(grawer_wersja_pozycja.includes('stalówka')){
				if(left.min == null || left.min > -340)
					left.min = -340;
				if(left.max == null || left.max > -180)
					left.max = -180;
			}
			if(grawer_wersja_pozycja.includes('środek')){
				if(left.min == null || left.min > -150)
					left.min = -150;
				if(left.max == null || left.max < 0)
					left.max = 0;
			}
			if(grawer_wersja_pozycja.includes('skuwka') && grawervalues['grawer_miejsce'] != 'skuwka'){
				if(left.min == null || left.min > 200)
					left.min = 200;
				if(left.max == null || left.max < 300)
					left.max = 300;
			}
		}
		else if(grawervalues['grawer_wersja'] == 'lewa'){
			if(grawer_wersja_pozycja.includes('skuwka') && grawervalues['grawer_miejsce'] != 'skuwka'){
				if(left.min == null || left.min > -300)
					left.min = -300;
				if(left.max == null || left.max > -150)
					left.max = -150;
			}
			if(grawer_wersja_pozycja.includes('środek')){
				if(left.min == null || left.min > 0)
					left.min = 0;
				if(left.max == null || left.max < 150)
					left.max = 150;
			}
			if(grawer_wersja_pozycja.includes('stalówka')){
				if(left.min == null || left.min > 150)
					left.min = 150;
				if(left.max == null || left.max < 300)
					left.max = 300;
			}
		}
		
		if(grawervalues['grawer_pozycja'] < left.min)
			grawervalues['grawer_pozycja'] = left.min;
		
		if(grawervalues['grawer_pozycja'] > left.max)
			grawervalues['grawer_pozycja'] = left.max;*/

	}
	
	function grawer_arrayToKeyVal(array){
		var text = '';
		for(var key in array){
			//text += key + ': ' + array[key] + "\n";
			text += key.replace('grawer_', '') + ': ' + array[key].toString().split("\n").join('|NOWALINIA|') + "\n";
		}
		
		return text;
	}
	function grawer_buynow(textField){
		$.ajax({
			url: grawer_buynow_url,
			type: 'POST',
			cache: false,
			data: {
				ajax: true,
				action: 'add-to-al_engrave',
				textField: textField,
			},
			success: function (result){
				$('#blockcart-modal').modal('toggle');
				var cartform = document.getElementsByClassName('al_engrave-cart-form')[0];
				cartform.elements.id_customization.value = result['graver_id'];
				cartform.elements.submitbutton.click();
			}
		});
	}
	
	function load_iconList(){
		for(var key in iconList){
			var iconElement2 = document.createElement('span');
			
			iconElement2.innerHTML = '<img'
				+ ` src="` + websiteUrl + `modules/al_engrave/icons/` + iconList[key] + `.png"`
				+ ' id="' + iconList[key] + '"'
				+ ' onclick="grawervalues[`grawer_text`] += `(` + this.id + `:` + document.getElementById(`grawer_iconsize`).value + `)`;document.getElementById(`grawer_text`).value = grawervalues[`grawer_text`];updateGraverImage();return false;">';
			
			//var iconElement2 = document.createElement('option');
			//iconElement2.value = iconList[key];
			//iconElement2.style.backgroundImage = "url('{url}modules/al_engrave/icons/" + iconList[key] + ".png');";
	
			iconListElement.appendChild(iconElement2);
		}
	}

	function updateGraverValues(){
		grawervalues['grawer_wersja']	= document.getElementById('grawer_wersja').value;
		grawervalues['grawer_miejsce']	= document.getElementById('grawer_miejsce').value;
		grawervalues['grawer_pozycja']	= grawervalues['grawer_pozycja'] || 0;//document.getElementById('grawer_preview_text').value;//document.getElementById('grawer_pozycja').value,
		grawervalues['grawer_wielkosc']	= document.getElementById('grawer_wielkosc').value
			* parseInt(document.querySelector('input[name="grawer_czcionka"]:checked').parentElement.style.fontSize.replace('px', '')) + 'px';
		
		grawervalues['grawer_czcionka']	= document.querySelector('input[name="grawer_czcionka"]:checked').parentElement.style.fontFamily;
		grawervalues['grawer_text']		= document.getElementById('grawer_text').value || document.getElementById('grawer_text').innerHTML;
		grawervalues['grawer_produkt']	= location.pathname;
	}
	function updateGraverImage(){
		var grawer_preview_image = document.getElementById('grawer_preview_image');
		var grawer_preview_text = document.getElementById('grawer_preview_text');
		
		grawer_preview_image.style.backgroundImage = `url(` + grawer_images['grawer-' + grawervalues['grawer_wersja'] + '-' + grawervalues['grawer_miejsce']] + `)`;
		grawer_preview_text.innerHTML = grawervalues['grawer_text'];
		//grawer_preview_text.style.margin = grawer_wersja_pozycja[grawervalues['grawer_wersja']][grawervalues['grawer_pozycja']];
		//document.getElementById('grawer_preview_text').style
		document.getElementById('grawer_preview_text').style.marginLeft = grawervalues['grawer_pozycja'] + 'px';
		grawer_preview_text.style.fontSize = grawervalues['grawer_wielkosc'];
		grawer_preview_text.style.fontFamily = grawervalues['grawer_czcionka'];
		
		for(var key in iconList)
			for(var key2 in iconSize)
				grawer_preview_text.innerHTML = grawer_preview_text.innerHTML.split('(' + iconList[key] + ':' + iconSize[key2] + ')').join('<img src="' + websiteUrl + 'modules/al_engrave/icons/' + iconList[key] + '.png" style="height: ' + iconSize[key2] + 'px;">');

	}
	function updateGraver(){
		updateGraverValues();
		updateGraverImage();
	}



	function getRandomInt(min, max){
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	function onClick_add_exception(e){
		console.log('onClick_add, html2canvas, try', e);
		fetch(websiteUrl + 'modules/al_engrave/exception_upload.php', {
			method: 'POST',
			body: e,
		});
		alert('Wystąpił błąd, usuń dodany grawer z koszyka i dodaj ponownie, jeśli problem wystąpi ponownie skontaktuj się z obsługą serwisu.');
	}
	function onClick_add(){
		var image_name = Date.now().toString() + 'r' + getRandomInt(1000, 9999).toString();
		grawervalues['obrazek'] = image_name;
		
		try{
			html2canvas(document.querySelector("#grawer_form"), {
				y: (window.innerHeight || 0) - ((window.innerHeight || 0) - (window.scrollY || 0)) + ((window.innerHeight || 0) / 10)
			}).then(canvas => {
				var image_data = canvas.toDataURL();
				image_data = image_data.substr('data:image/png;base64,'.length);
				//image_data = atob(image_data);
				image_upload(image_data, image_name);
			}).catch(e => {
				onClick_add_exception(e);
			});
		}catch(e){
			onClick_add_exception(e);
		}
	}
	function image_upload(image_data, image_name){
		var http = new XMLHttpRequest();
		var url = websiteUrl + 'modules/al_engrave/image_upload.php?name=' + image_name;
		http.open('POST', url, true);

		http.setRequestHeader('Content-type', 'image/png');

		http.onreadystatechange = function(){
			if(http.readyState == 4 && http.status == 200){
				//console.log(http.responseText);
			}
		}
		http.send(image_data);
	}
	
	function process_checkboxes(){
		
		if(!grawer_modal_fonts.includes('1') && !grawer_modal_fonts.includes('Arial')){
			document.getElementById('grawer_fontlist-1').disabled = true;
			document.getElementById("grawer_fontlist-2").checked = true;
		}
		if(!grawer_modal_fonts.includes('2') && !grawer_modal_fonts.includes('Lora')){
			document.getElementById('grawer_fontlist-2').disabled = true;
			document.getElementById("grawer_fontlist-3").checked = true;
		}
		if(!grawer_modal_fonts.includes('3') && !grawer_modal_fonts.includes('Lobster')){
			document.getElementById('grawer_fontlist-3').disabled = true;
			document.getElementById("grawer_fontlist-4").checked = true;
		}
		if(!grawer_modal_fonts.includes('4') && !grawer_modal_fonts.includes('Caveat')){
			document.getElementById('grawer_fontlist-4').disabled = true;
			document.getElementById("grawer_fontlist-5").checked = true;
		}
		if(!grawer_modal_fonts.includes('5') && !grawer_modal_fonts.includes('MTCORSVA')){
			document.getElementById('grawer_fontlist-5').disabled = true;
			document.getElementById("grawer_fontlist-6").checked = true;
		}
		if(!grawer_modal_fonts.includes('6') && !grawer_modal_fonts.includes('Courgette')){
			document.getElementById('grawer_fontlist-6').disabled = true;
			document.getElementById("grawer_fontlist-1").checked = true;
		}

		if(!grawer_modal_sizes.includes('S')){
			document.getElementById('grawer_wielkosc-S').disabled = true;
			document.getElementById("grawer_wielkosc-M").selected = true;
		}
		if(!grawer_modal_sizes.includes('M')){
			document.getElementById('grawer_wielkosc-M').disabled = true;
			document.getElementById("grawer_wielkosc-L").selected = true;
		}
		if(!grawer_modal_sizes.includes('L')){
			document.getElementById('grawer_wielkosc-L').disabled = true;
			document.getElementById("grawer_wielkosc-S").selected = true;
		}

		if(!grawer_wersja_pozycja.includes('zboku')){
			document.getElementById('grawer_miejsce_korpus').disabled = true;
			document.getElementById('grawer_miejsce_skuwka').selected = true;
		}
		if(!grawer_wersja_pozycja.includes('zgóry')){
			document.getElementById('grawer_miejsce_skuwka').disabled = true;
			document.getElementById('grawer_miejsce_korpus').selected = true;
		}
		
	}
