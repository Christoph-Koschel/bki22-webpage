<?php

$file = $_POST["file"];

$path = __DIR__."/../$file";

echo file_get_contents($path);
