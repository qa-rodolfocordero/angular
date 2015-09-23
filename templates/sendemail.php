<?php
require "phpmail/PHPMailerAutoload.php"
header('Content-Type: application/json');

function getContentFile($filename)
{
	$file=fopen($filename,"r");
	$content=fread($file,filesize($filename));
	return $content;
}
?>
<?php
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
//resource body
$resources_template=getContentFile("resources.html");
$variables=array("{{id}}","{{core_plataform}}","{{resource_type}}","{{number_of_resources}}",
"{{special_skill_required}}","{{resource_location}}","{{target_start_date}}","{{estimated_duration}}","{{language_requirement}}","{{travel_acceptable}}");
$resource_body="";
foreach($data->resources as $element)
{
		$values=array(
			$element->id,
			strip_tags($element->core_plataform),
			strip_tags($element->resource_type),
			strip_tags($element->number_of_resources),
			strip_tags($element->special_skills_required),
			strip_tags($element->resource_location),
			strip_tags(date("Y-m-d", strtotime($element->target_start_date))),
			strip_tags($element->estimate_duration),
			strip_tags($element->language_requirement)

		);
		if ($element->resource_location=="Onsite")
		{
			array_push($values,strip_tags($element->travel_acceptable));
		}
		else
		{
			array_push($values,"none");
		}
		$resource_body.=str_replace($variables,$values,$resources_template);
}
$resources_body=$resource_body;
//template body
$email_template=getContentFile("template.html");
$variables=array(
	"{{client_name}}",
	"{{client_address}}",
	"{{client_city}}",
	"{{client_country}}",
	"{{resources}}"
);
$values=array(
	strip_tags($data->client_name),
	strip_tags($data->client_address),
	strip_tags($data->client_city),
	strip_tags($data->client_country),
	$resources_body
);
array_push($variables,"{{engagement_description}}");
if (property_exists($data,"engagement_description"))
{
	array_push($values,strip_tags($data->engagement_description));
}
else
{
	array_push($values,"none");
}


$email_body=str_replace($variables,$values,$email_template);
$to = strip_tags($data->requestors_email);

$subject = 'EPAM Request: '.$data->client_name;
$headers .= "Bcc: bfoster@globalnowinc.com,lcarter@globalnowinc.com,JLeichtenschlag@globalnowinc.com\r\n";

$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

if (mail($to, $subject, $email_body, $headers))
{
	$arr = array('result' => 1);
	
	echo json_encode($arr);
}
else
{
	$arr = array('result' => 0);
	
	echo json_encode($arr);
}
?>
