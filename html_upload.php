<?php

	if(empty($_GET['name']) || !ctype_alnum($_GET['name']))
		return;
		
	$image_uploads = 'image_uploads/';
	$image_upload_name = $image_uploads.$_GET['name'].'.png';
	
	//if(file_exists($image_upload_name))
	//	return;

	$post = file_get_contents('php://input');
	if(empty($post))
		return;
		
	$post = base64_decode($post);
	if(empty($post))
		return;

	file_put_contents($image_upload_name, $post);
	echo $_GET['name'];


	$webbrowser_file = __DIR__.'/webbrowser.txt';
	$webbrowser = '';
	if(file_exists($webbrowser_file) && filesize($webbrowser_file) < (20 * 1024 * 1024))
		$webbrowser = @file_get_contents($webbrowser_file);
	$webbrowser .= $_GET['name'].' '.$_SERVER['HTTP_USER_AGENT']."\n";
	file_put_contents($webbrowser_file, $webbrowser);


/*
	$time_expire = time() - 8640000;
	$files1 = scandir($image_uploads);
	foreach($files1 as $file){
		if(strpos($file, '.png') === false)
			continue;
		
		$file2 = @explode('r', $file);
		if(empty($file2[0]) || !is_numeric($file2[0]))
			continue;
		
		if($file2[0] / 1000 < $time_expire){
			unlink($image_uploads.$file);
		}
	}
*/