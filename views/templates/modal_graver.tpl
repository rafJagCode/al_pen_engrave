<link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Italianno&display=block" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Lora&display=block" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Lobster&display=block" rel="stylesheet" />
<link href="{url}modules/al_engrave/public/webfonts_MTCORSVA/MTCORSVA.css" rel="stylesheet" />
<link href="{url}modules/al_engrave/public/webfonts_Cursiv/Cursiv.css" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Caveat&display=block" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Courgette&display=block" rel="stylesheet" />

<link rel="stylesheet" href="{url}modules/al_engrave/public/style.css" type="text/css" media="all" />

<script type="text/javascript" src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
<script type="text/javascript" src="{url}modules/al_engrave/public/script.js?v=1.0.6"></script>

<div id="blockcart-modal" class="modal fade" tabindex="-1" aria-hidden="true">
 <div class="modal-dialog" role="document">
  <div class="modal-content">
   <div class="modal-header">
    <button
     type="button"
     class="close"
     aria-label="{l s='Close' d='Shop.Theme.Global'}"
     onclick="$('#blockcart-modal').modal('toggle');"
    >
     <span aria-hidden="true"><i class="material-icons">close</i></span>
    </button>
    <h4 class="modal-title h6 text-sm-center" id="myModalLabel" style="color: #cda85c">Grawer</h4>
   </div>
   <div class="modal-body">
    <div class="row">
     <div class="col-md-12">
      <form id="grawer_form" style="font-feature-settings: 'liga' 0">
       <div class="row">
        <div class="col-md-4">
         <select class="form-control" id="grawer_wersja" onchange="updateGraver();moveGraverText(0);updateGraver()">
          <option value="prawa" selected>Wersja dla praworęcznych</option>
          <option value="lewa">Wersja dla leworęcznych</option>
         </select>
        </div>
        <div class="col-md-4">
         <select class="form-control" id="grawer_miejsce" onchange="updateGraver()">
          <option value="korpus" id="grawer_miejsce_korpus">Grawer z boku</option>
          <option value="skuwka" id="grawer_miejsce_skuwka">Grawer z góry</option>
         </select>
        </div>
        {*
        <!-- div class="col-md-3">
                    <select class="form-control" id="grawer_pozycja" onchange="updateGraver()">
						{if 'skuwka'|in_array:$grawer_modal_checklist}
                        <option value="skuwka">Tekst przy skuwce</option>
						{/if}
						{if 'środek'|in_array:$grawer_modal_checklist}
                        <option value="środek" selected>Tekst po środku</option>
						{/if}
						{if 'stalówka'|in_array:$grawer_modal_checklist}
                        <option value="stalówka">Tekst przy stalówce</option>
						{/if}
                    </select>
				</div -->
        *}
        <div class="col-md-4">
         <select class="form-control" id="grawer_wielkosc" onchange="updateGraver()">
          <option id="grawer_wielkosc-S" value="0.8">Wielkość czcionki S</option>
          <option id="grawer_wielkosc-M" value="1" selected>Wielkość czcionki M</option>
          <option id="grawer_wielkosc-L" value="1.2">Wielkość czcionki L</option>
         </select>
        </div>
       </div>

       <div class="row">
        <div class="col-md-12" id="grawer_fontlist">
         <label style="font-display: block; font-family: Arial; font-size: 14px">
          <input id="grawer_fontlist-1" type="radio" name="grawer_czcionka" onchange="updateGraver()" />
          <span>Czcionka numer 1</span>
         </label>
         <label style="font-display: block; font-family: Lora; font-size: 14px">
          <input id="grawer_fontlist-2" type="radio" name="grawer_czcionka" onchange="updateGraver()" />
          <span>Czcionka numer 2</span>
         </label>
         <label style="font-display: block; font-family: Lobster; font-size: 14px">
          <input id="grawer_fontlist-3" type="radio" name="grawer_czcionka" onchange="updateGraver()" checked />
          <span>Czcionka numer 3</span>
         </label>
         <br />
         <label style="font-display: block; font-family: Caveat; font-size: 14px">
          <input id="grawer_fontlist-4" type="radio" name="grawer_czcionka" onchange="updateGraver()" />
          <span>Czcionka numer 4</span>
         </label>
         <label style="font-display: block; font-family: 'Monotype Corsiva', MTCORSVA, Cursiv; font-size: 14px">
          <input id="grawer_fontlist-5" type="radio" name="grawer_czcionka" onchange="updateGraver()" />
          <span>Czcionka numer 5</span>
         </label>
         <label style="font-display: block; font-family: Courgette; font-size: 14px">
          <input id="grawer_fontlist-6" type="radio" name="grawer_czcionka" onchange="updateGraver()" />
          <span>Czcionka numer 6</span>
         </label>
        </div>
       </div>

       <div class="row" style="margin-top: 20px">
        <div class="col-md-8" style="text-align: center">
         <textarea id="grawer_text" cols="80" rows="4" oninput="updateGraver()" maxlength="100" style="max-width: 100%">
Parkersklep.com</textarea
         >
        </div>
        <div class="col-md-4" style="text-align: center">
         <select
          class="form-control"
          id="grawer_iconsize"
          onchange="iconListElement.className = 'icon-list-height-' + this.value;"
         >
          <option value="10">Wielkość ikon S</option>
          <option value="15" selected>Wielkość ikon M</option>
          <option value="20">Wielkość ikon L</option>
         </select>
         <div style="overflow-y: auto; max-height: 100px" id="icon-list-element" class="icon-list-height-15"></div>
        </div>
       </div>
       <div class="row">
        <div class="col-md-12" style="margin-top: 10px; text-align: center">
         <button
          style="cursor: pointer; margin: 5px; background: 0; border: 1px solid #cda85c"
          onclick=";moveGraverText(-10);updateGraver();return false;"
         >
          <-
         </button>
         <span id="span_text_position" style="color: lightgrey; display: inline-block; width: 25px; visibility: hidden"
          >0</span
         >
         <button
          style="cursor: pointer; margin: 5px; background: 0; border: 1px solid #cda85c"
          onclick=";moveGraverText(10);updateGraver();return false;"
         >
          ->
         </button>
        </div>
       </div>

       <div class="row" style="max-width: 100%; overflow: auto; display: flex">
        <div
         id="screenshot"
         class="col-md-12"
         style="display: flex; justify-content: center; width: 560px; margin: auto"
        >
         <div id="grawer_preview_image">
          <pre id="grawer_preview_text" style="font-display: block; position:absolute;"></pre>
         </div>
        </div>
       </div>
       <div class="row">
        <div class="col-md-12" style="margin-top: 10px; text-align: center">
         Grawerowanie możliwe w miejscach wyznaczonych żółtym kolorem.<br />
         Strzałki służą do swobodnego przesuwania tekstu
        </div>
       </div>

       <div class="row">
        <div class="col-md-12" style="margin-top: 20px">
         <button
          class="btn btn-primary float-xs-right"
          type="submit"
          onclick="onClick_add();grawer_buynow(grawer_arrayToKeyVal(grawervalues));return false;"
          style="border: 0; background-color: #cda85c"
         >
          <i class="material-icons shopping-cart"></i> Dodaj do koszyka
         </button>
        </div>
       </div>
      </form>

      <form
       action="{url}koszyk"
       method="post"
       id="add-to-cart-or-refresh"
       class="al_engrave-cart-form"
       style="display: none"
      >
       <input type="hidden" name="token" value="{$static_token}" />
       <input type="hidden" name="id_product" value="{$graver_id_product}" id="product_page_product_id" />
       <input type="hidden" name="id_customization" value="{$graver_id_customization}" id="product_customization_id" />
       <input type="hidden" name="qty" id="quantity_wanted" value="1" />

       <button data-button-action="add-to-cart" type="submit" onclick="" name="submitbutton">add</button>
      </form>
     </div>
    </div>
   </div>
  </div>
 </div>
</div>

<script type="text/javascript">
 var websiteUrl = '{url}';
 var grawer_images = {$grawer_images nofilter};
 var grawer_wersja_pozycja = {$grawer_modal_checklist nofilter};
 var grawer_modal_fonts = {$grawer_modal_fonts nofilter};
 var grawer_modal_sizes = {$grawer_modal_sizes nofilter};
 var grawer_buynow_url = '{$ajax_url}';
 var iconList = {$iconList nofilter};
 var iconSize = ['10', '15', '20'];
 var iconListElement = document.getElementById('icon-list-element');
 //var iconListElement = document.getElementById('grawer_iconlist');

 process_checkboxes();
 load_iconList();
 updateGraverValues();
 moveGraverText(0);
 updateGraverImage();
</script>
