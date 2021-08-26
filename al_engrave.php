<?php

if(!defined('_PS_VERSION_'))
    exit;

use PrestaShop\PrestaShop\Adapter\Cart\CartPresenter;
use PrestaShop\PrestaShop\Core\Module\WidgetInterface;


class al_engrave extends Module implements WidgetInterface
{
    public function __construct()
    {
        $this->name = 'al_engrave';
        //$this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'Amelen';
        $this->need_instance = 0;

        $this->bootstrap = true;
        parent::__construct();

        $this->displayName = $this->trans('al_engrave', array(), 'Modules.Shoppingcart.Admin');
        $this->description = $this->trans('Przycisk z modalem do formy grawerowania', array(), 'Modules.Shoppingcart.Admin');
        $this->ps_versions_compliancy = array('min' => '1.7', 'max' => _PS_VERSION_);
        $this->controllers = array('ajax');

		//{hook h='display_al_engrave'}
    }

    public function hookHeader()
    {
        //if (Configuration::isCatalogMode() || !$this->context->customer->isLogged())
        //    return;

        $this->context->controller->registerJavascript('modules-al_engrave', 'modules/al_engrave/views/templates/modal.js', ['position' => 'bottom', 'priority' => 150]);
    }

    public function getWidgetVariables($hookName, array $params)
    {

        return array(
            'refresh_url' => $this->context->link->getModuleLink('al_engrave', 'ajax', array(), null, null, null, true),
        );
    }

    public function renderWidget($hookName, array $params)
    {
        //if(Configuration::isCatalogMode() || !$this->context->customer->isLogged())
        //    return;

		if(empty($hookName))
			$hookName = 'display_al_engrave';

        $this->smarty->assign($this->getWidgetVariables($hookName, $params));
        return $this->fetch('module:al_engrave/views/templates/hook/'.$hookName.'.tpl');
    }

    public function renderModal($modal)
    {
		$product_id = Tools::getValue('product_id');
		$grawer_modal_checklist = Tools::getValue('grawer_modal_checklist');
		foreach($grawer_modal_checklist as &$grawer_modal_checklist_val)
			$grawer_modal_checklist_val = str_ireplace(['korpus', 'skuwka'], ['zboku', 'zgóry'], $grawer_modal_checklist_val);

		$grawer_modal_fonts = Tools::getValue('grawer_modal_fonts');
		$grawer_modal_fonts = array_filter($grawer_modal_fonts);
		if(empty($grawer_modal_fonts))
			$grawer_modal_fonts = ['1','2','3','4','5','6'];

		$grawer_modal_sizes = Tools::getValue('grawer_modal_sizes');
		$grawer_modal_sizes = array_filter($grawer_modal_sizes);
		if(empty($grawer_modal_sizes))
			$grawer_modal_sizes = ['S','M','L'];


		$graver_id_product = Configuration::get('al_engrave-product_id');
		$graver_id_customization = Configuration::get('al_engrave-customization_id');

		$anyproduct = new Product($product_id, true, $this->context->language->id, $this->context->shop->id);
		$base_url = $this->context->smarty->tpl_vars['urls']->value['base_url'];
		$grawer_images = [
			'grawer-lewa-korpus' => $base_url.'modules/al_engrave/grawer-lewa-korpus.jpg',
			'grawer-lewa-skuwka' => $base_url.'modules/al_engrave/grawer-lewa-skuwka.jpg',
			'grawer-prawa-korpus' => $base_url.'modules/al_engrave/grawer-prawa-korpus.jpg',
			'grawer-prawa-skuwka' => $base_url.'modules/al_engrave/grawer-prawa-skuwka.jpg',
		];
		$images = $anyproduct->getImages($this->context->language->id);
		foreach($images as $img){
			if(!empty($img['legend']) && strpos($img['legend'], 'grawer-') !== false){
				//$imageSize = 'large_default';
				$grawer_images[$img['legend']] = $this->context->link->getImageLink($anyproduct->link_rewrite, $img['id_image'], 'al_engrave');//$imageSize);

				//if(Configuration::get('WATERMARK_HASH'))
				//	$grawer_images[$img['legend']] = str_replace($imageSize, $imageSize.'-'.Configuration::get('WATERMARK_HASH'), $grawer_images[$img['legend']]);
			}
		}
		//if(count($grawer_images) < 4)
		//	return;
		$iconList = scandir(__DIR__.'/icons/');
		foreach($iconList as $key => &$val)
			if(strpos($val, '.png') === false)
				unset($iconList[$key]);
			else $val = str_replace('.png', '', $val);

        $this->smarty->assign(array(
            //'products' => $products,
			//'module_url' => Context::getContext()->link,
			'graver_id_product' => $graver_id_product,
			'graver_id_customization' => $graver_id_customization,
			//'graver_url' => $this->context->link->getProductLink($graver_id_product),
			//'textField' => 'textField'.$graver_id_customization,
			'grawer_images' => json_encode($grawer_images),
			//'params' => json_encode([$product_id, $grawer_modal_checklist]),

			'product_id' => $product_id,
			'grawer_modal_checklist' => json_encode($grawer_modal_checklist),
			'grawer_modal_fonts' => json_encode($grawer_modal_fonts),
			'grawer_modal_sizes' => json_encode($grawer_modal_sizes),
			'iconList' => json_encode($iconList),

            'ajax_url' => $this->context->link->getModuleLink('al_engrave', 'ajax', array(), null, null, null, true),
        ));

        return $this->fetch('module:al_engrave/views/templates/modal_'.$modal.'.tpl');
    }

	function createProduct($graver_id_product = 22){//427

		Configuration::updateValue('al_engrave-product_id', $graver_id_product);

		//$graver_id_customization = 0;
		$lang_id = (int)Configuration::get('PS_LANG_DEFAULT');
		$product = new Product($graver_id_product, true, $lang_id);
		$field_ids = $product->getCustomizationFieldIds();
		if(!empty($field_ids)){
			$graver_id_customization = $field_ids[0]['id_customization_field'];
			Configuration::updateValue('al_engrave-customization_id', $graver_id_customization);
		}
	}

    public function install(){
		self::createProduct();

        return parent::install()
                && $this->registerHook('header')
                //&& $this->registerHook('displayNav2')
                && $this->registerHook('display_al_engrave');
    }
	//public function uninstall(){
	//	return parent::uninstall();
	//}

    public function getConfigFieldsValues()
    {
        $id_shop_group = Shop::getContextShopGroupID();
        $id_shop = Shop::getContextShopID();

        return array(
            'updateProduct' => Tools::getValue('updateProduct', Configuration::get('al_engrave-product_id', null, $id_shop_group, $id_shop)),
        );
    }
    public function renderForm()
    {
        $fields_form = array(
            'form' => array(
                'legend' => array(
                    'title' => $this->getTranslator()->trans('Settings', array(), 'Admin.Global'),
                    'icon' => 'icon-cogs'
                ),
                'input' => array(
                    array(
                        'type' => 'text',
                        'label' => 'Grawer Product ID',
                        'name' => 'updateProduct',
                        //'suffix' => '',
                        'class' => 'fixed-width-md',
                        //'desc' => ''
                    )
                ),
                'submit' => array(
                    'title' => $this->getTranslator()->trans('Save', array(), 'Admin.Actions'),
                )
            ),
        );

        $helper = new HelperForm();
        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $lang = new Language((int)Configuration::get('PS_LANG_DEFAULT'));
        $helper->default_form_language = $lang->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') ? Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') : 0;
        $this->fields_form = array();

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'changeHook';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false).'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFieldsValues(),
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id
        );

        return $helper->generateForm(array($fields_form));
    }
    public function getContent()
    {
		if(Tools::isSubmit('updateProduct')){
            self::createProduct(Tools::getValue('updateProduct'));
        }
        $this->_html .= $this->renderForm();
        return $this->_html;
    }
}
