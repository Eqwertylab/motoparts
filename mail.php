<?php
	$nodata = "nodata";

	$win = array(	'title'	=> 	'Заявка принята!',
					'desc' 	=>	'В бижайщее время с Вами свяжется менеджер.');

	$crash = array(	'title' => 	'Произошла ошибка :(',
					'desc'	=>	'Повторите отправку позже или позвоните нам по телефону.' );

	$post_names = array(
		'bike_model' => 'Модель байка', 
		'parts' => 'Название запчасти или VIN', 
		'contacts' => 'Контактные данные', 
		'submit' => 'Сообщение с формы', 
		'type_outfit' => 'Тип экипировки или аксессуара', 
		'question' => 'Вопрос' 
	);

	if(isset($_POST['submit'])) 		{$data_send['submit'] = $_POST['submit'];} 				else {$data_send['submit'] = $nodata;};
	if(isset($_POST['bike_model'])) 	{$data_send['bike_model'] = $_POST['bike_model'];} 		else {$data_send['bike_model'] = $nodata;};
	if(isset($_POST['parts'])) 			{$data_send['parts'] = $_POST['parts'];} 				else {$data_send['parts'] = $nodata;};
	if(isset($_POST['type_outfit'])) 	{$data_send['type_outfit'] = $_POST['type_outfit'];}	else {$data_send['type_outfit'] = $nodata;};
	if(isset($_POST['question'])) 		{$data_send['question'] = $_POST['question'];}			else {$data_send['question'] = $nodata;};
	if(isset($_POST['contacts'])) 		{$data_send['contacts'] = $_POST['contacts'];} 			else {$data_send['contacts'] = $nodata;};

	$e_body = '';
	foreach ($data_send as $key => $value) {
		if($value !== $nodata) {
			$e_body = $e_body . $post_names[$key] . " : " .  $value . "\n";
		}
	}
	$e_body = $e_body . "\r\n\n";

	$emailFrom = 'info@motoparts.me'; 			// От кого
	$e_sendto =  '79225555735@ya.ru'; 			// Кому
	$e_subject = 'Сообщение с Motoparts.me'; 	// Тема письма

	if(mail($e_sendto, $e_subject, $e_body, "From: $emailFrom\r\nReply-To: $emailFrom\r\n"))
	{						 
		echo json_encode($win);
	} 
	else 
	{
		echo json_encode($crash);
	}	

?>