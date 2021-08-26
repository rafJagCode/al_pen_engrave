/* global $, prestashop */

/**
 * This module exposes an extension point in the form of the `showModal` function.
 *
 * If you want to override the way the modal window is displayed, simply define:
 *
 * prestashop.block-al_engrave = prestashop.block-al_engrave || {};
 * prestashop.block-al_engrave.showModal = function myOwnShowModal (modalHTML) {
 *   // your own code
 *   // please not that it is your responsibility to handle closing the modal too
 * };
 *
 * Attention: your "override" JS needs to be included **before** this file.
 * The safest way to do so is to place your "override" inside the theme's main JS file.
 *
 */

$(document).ready(function () {
  prestashop.blockcart = prestashop.blockcart || {};

  var showModal = prestashop.blockcart.showModal || function (modal) {
    var $body = $('body');
    $body.append(modal);
    /*$body.one('click', '#blockcart-modal', function (event) {
      if (event.target.id === 'blockcart-modal') {
        $(event.target).remove();
      }
    });*/
  };

  prestashop.on(
    'update-al_engrave',
    function (event) {
		var requestData = event.action ? event : {};
		var data = {};
		var refreshURL = $('.block-al_engrave').data('refresh-url');
		if (event && event.dataset){
			//$(event.form).serializeArray().map(function(x){data[x.name] = x.value;});

			requestData = {
			  action: event.dataset.buttonAction,
			  product_id: event.dataset.product_id,
			  grawer_modal_checklist: event.dataset.grawer_modal_checklist.split(','),
			  grawer_modal_fonts: event.dataset.grawer_modal_fonts.split(','),
			  grawer_modal_sizes: event.dataset.grawer_modal_sizes.split(','),
			};
		}
		$.post(refreshURL, requestData).then(function (resp) {
			//$('.block-al_engrave').replaceWith($(resp.preview).find('.block-al_engrave'));
			if(resp.modal)
				showModal(resp.modal);
				
		}).fail(function (resp) {
			prestashop.emit('handleError', { eventType: 'updateShoppingCart', resp: resp });
		});
      
      /*if (event && event.reason && typeof event.resp !== 'undefined' && !event.resp.hasError) {
        requestData = {
          id_customization: event.reason.idCustomization,
          id_product_attribute: event.reason.idProductAttribute,
          id_product: event.reason.idProduct,
          action: event.reason.linkAction
        };

        $.post(refreshURL, requestData).then(function (resp) {
          $('.block-al_engrave').replaceWith($(resp.preview).find('.block-al_engrave'));
          if (resp.modal) {
            showModal(resp.modal);
          }
        }).fail(function (resp) {
          prestashop.emit('handleError', { eventType: 'updateShoppingCart', resp: resp });
        });
      }
      if (event && event.resp && event.resp.hasError) {
        prestashop.emit('showErrorNextToAddtoCartButton', { errorMessage: event.resp.errors.join('<br/>')});
      }*/
    }
  );
  
});
