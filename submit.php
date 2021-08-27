<?php

if (!isset(reset($_FILES) ['name']) && empty(reset($_FILES) ['name']))
{
    header("Location: index.php");
    die();
}

if( isset($_POST['name']) && !empty($_POST['name']) && $_POST['decision'] == 'true'){
    $name = $_POST['name'];
}else{
    $name = 'NULL';
}
$uploaded_file_name = reset($_FILES)['name'];
$uploaded_file = reset($_FILES)['tmp_name'];
$path = 'C:/laragon/www/php_to_python/images/' . $uploaded_file_name;
$esc_path = escapeshellarg($path);
setlocale(LC_CTYPE, "en_US.UTF-8");
move_uploaded_file($uploaded_file, $path);

$output = shell_exec("C:/Users/Elias/anaconda3/envs/final_siamese/python.exe C:/laragon/www/php_to_python/siamese_results.py $esc_path $name ");


echo $output;