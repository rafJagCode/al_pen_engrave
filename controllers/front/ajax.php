<?php
/*
* 2007-2015 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2015 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

class al_engraveAjaxModuleFrontController extends ModuleFrontController
{
    public $ssl = true;

    /**
     * @see FrontController::initContent()
     */
    public function initContent()
    {
        parent::initContent();
        ob_end_clean();
        header('Content-Type: application/json');
		
        if(Tools::getValue('action') === 'add-to-al_engrave'){
			if (!$this->context->cart->id){
				if (Context::getContext()->cookie->id_guest){
					$guest = new Guest(Context::getContext()->cookie->id_guest);
					$this->context->cart->mobile_theme = $guest->mobile_theme;
				}
				$this->context->cart->add();
				if ($this->context->cart->id)
					$this->context->cookie->id_cart = (int)$this->context->cart->id;
			}

			$graver_id_product = Configuration::get('al_engrave-product_id');
			$graver_id_customization = Configuration::get('al_engrave-customization_id');

			$this->context->cart->addTextFieldToProduct($graver_id_product, $graver_id_customization, Product::CUSTOMIZE_TEXTFIELD, Tools::getValue('textField'));
			$graver_id = $this->context->cart->getProductCustomization($graver_id_product, Product::CUSTOMIZE_TEXTFIELD, true);
			die(json_encode([
				'graver_id' => $graver_id[0]['id_customization']
			]));
		}
		
        die(json_encode([
            'preview' => $this->module->renderWidget(null, ['cart' => $this->context->cart]),
            'modal' => $this->module->renderModal('graver'),
        ]));
    }
}
