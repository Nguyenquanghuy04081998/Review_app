<?php
$apiKey = "a3a6b31a740a4790755a28fa051e9862";
$appId = "1";
$rootLink = "https://huy.omegatheme.com/sample-app";
$trialTime = 30;
$chargeType = "monthly";
$price = 7.99;
$version = time();
//true or null
$appName = "Sample app";
$testMode = "true";
$dateUse  = '2019-02-15 04:03:09';
$chargeTitle = "Sample app";
$db = new Mysqli("localhost", "root", "", "shopify_huy");
if ($db->connect_errno) {
    die('Connect Error: ' . $db->connect_errno);
}
if (!defined("APP_PATH")) {
    define("APP_PATH", dirname(__FILE__));
}
if (!defined("CACHE_PATH")) {
    define("CACHE_PATH", APP_PATH . "/cache/");
}
if (!defined("APIVERSION")) {
    define("APIVERSION", "/admin/api/2020-07/");
}
