<?php
	$post = file_get_contents('php://input');

	$exceptions_file = __DIR__.'/exceptions.txt';
	$exceptions = '';
	if(file_exists($exceptions_file) && filesize($exceptions_file) < (20 * 1024 * 1024))
		$exceptions = @file_get_contents($exceptions_file);
	$exceptions .= date('Y-m-d H:i:s').' '.$post.' '.$_SERVER['HTTP_USER_AGENT']."\n";
	file_put_contents($exceptions_file, $exceptions);
