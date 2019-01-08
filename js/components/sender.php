<?php
$tosend =  "info@introphin.com"; //To:
$subject = "Заявка с сайта introphin"; //Subject:
$from_name = "introphin"; //From:
$from_email = "info@introphin.com"; //From:

////NO EDIT
if(!isset($_POST['act'])) {
	exit();
}
switch($_POST['act']) {
	case 'sender':
		if(empty($_POST['email'])) {
			exit();
		}
		 			

	    $name = $_POST['name'];
	    $phone = $_POST['phone'];
	    $email = $_POST['email'];
	    $theme = $_POST['theme'];
	    $message = $_POST['message'];

	    $msg  = "<p><strong>Обратная связь</strong></p>\r\n";
	    $msg .= "<p><strong>Имя:</strong> {$name}</p>\r\n";
	    $msg .= "<p><strong>Телефон:</strong> {$phone}</p>\r\n";
	    $msg .= "<p><strong>Email:</strong> {$email}</p>\r\n";
	    $msg .= "<p><strong>Тема:</strong> {$theme}</p>\r\n";
	    $msg .= "<p><strong>Сообщение:</strong> {$message}</p>\r\n";



		$source = get_traffic_source();
	
		if (!empty($email) && $email != 'undefined' && $email != 'пусто') {
			$msg .= "<p><strong>E-mail:</strong> {$email}</p>\r\n";
		}		
		$msg .= "<p><strong>Источник:</strong> ".nl2br($source)."</p>\r\n";

		$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
		$headers .= "From: =?UTF-8?B?".base64_encode($from_name)."?= <".$from_email.">\r\n";

		if(mail($tosend, "=?UTF-8?B?".base64_encode($subject)."?=", $msg, $headers)) {
			echo json_encode(array('result' => 'ok'));
		} else {
			echo json_encode(array('result' => 'fail'));
		}
	break;
	default: exit();
}

function get_traffic_source() {
	$result = "Прямой заход";
	$utm = $_POST['utm'];
	if ( isset($utm) && $utm != "") { 
		switch($utm) {
			case 'y':
				$result = "Яндекс";
				break;
			case 'g':
				$result = "Google";
				break;
			case 'f':
				$result = "Facebook";
				break;
			case 'v':
				$result = "ВКонтакте";
				break;
			default:
				$result = $utm;
				break;
		}
	}
	return $result;
}
	
?>