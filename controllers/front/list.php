<?php
//error_reporting(E_ALL);
class al_engraveListModuleFrontController extends ModuleFrontController
{

	public function __construct()
	{
		parent::__construct();
		//$this->context = Context::getContext();
	}

	/*private function getPages()
	{
		$sql = 'SELECT * FROM `al_engrave`
				WHERE user ='.$this->context->customer->id;
		$result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

		$array = array();
		foreach ($result as $row)
			$array[] = $row['product'];

		return implode(' - ', $array);
	}*/
	public function initContent()
	{
		//$this->context->smarty->assign(array('qq' => $this->getPages()));
		$this->context->smarty->assign(array('qq' => 'zxc'));
		$this->setTemplate('module:al_engrave/views/templates/front/list.tpl');
		parent::initContent();
	}
}