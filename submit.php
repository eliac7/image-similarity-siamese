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
$path = 'PATH_TO_SAVE_UPLOADED_IMAGE' . $uploaded_file_name;
$esc_path = escapeshellarg($path);
setlocale(LC_CTYPE, "en_US.UTF-8");
move_uploaded_file($uploaded_file, $path);

$output = shell_exec("PATH_TO_PYTHON_EXE_WITH_REQUIREMENTS_INSTALLED PATH_TO_SIAMESE_RESULTS_PY $esc_path $name ");


echo $output;