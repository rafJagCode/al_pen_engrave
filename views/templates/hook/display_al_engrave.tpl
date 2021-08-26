
	<div class="block-al_engrave" data-refresh-url="{$refresh_url}"></div>

	{assign var='grawer_modal_checklist' value={hook h='grawer_modal_checklist'}|replace:[' ',"\r","\n","\t"]:''}
	{assign var='grawer_modal_fonts' value={hook h='grawer_modal_fonts'}|replace:[' ',"\r","\n","\t"]:''}
	{assign var='grawer_modal_sizes' value={hook h='grawer_modal_sizes'}|replace:[' ',"\r","\n","\t"]:''}
	<a href="{url}61-grawer" title="Grawer" onclick="prestashop.emit('update-al_engrave', this);return false;"
			data-button-action="update-al_engrave" data-product_id="{$product->id}"
			data-grawer_modal_checklist="{$grawer_modal_checklist}"
			data-grawer_modal_fonts="{$grawer_modal_fonts}"
			data-grawer_modal_sizes="{$grawer_modal_sizes}">
		<img src="{url}modules/al_engrave/box-img/grawer-box1.jpg" style="width: 100%; margin-bottom: 20px;" alt="Grawer Laserowy" width="420" height="92">
	</a>
