<?php

// ini_set('display_errors', TRUE);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
// error_reporting(E_ALL);
require '../vendor/autoload.php';
require '../help.php';
$shop  = "nguyen-q-huy.myshopify.com";

if (isset($_GET['getAllProduct'])) {


    $shopify = shopifyInit($db, $shop, $appId);
    $products  = getProductInPage($shopify, $since_id = 0, $limit = 250, $fields = "id,title,handle,image");
    $countProducts = getCountAllProduct($shopify);
    // function getIgame($id)
    // {
    //     $src = $GLOBALS['shopify']("GET", "admin/api/2020-10/products/$id/images.json");
    //     return $src[0]['src'];
    // }

    foreach ($products as $v) {
        $id = $v['id'];
        $dataInsert = [
            'shop' => $shop,
            'products_id' => $id,
            'products_image_url' => 'chua co anh',
            'products_title' => $v['title'],
            'productUrl' => "https://",
            // 'productUrl' => $v['productUrl'],
            'products_review_detail' => 'dấd',
            'products_handle' => 'dấd',
            'countReviews' => 'dấd',
            'hasImported' => 'dấd',
            'productReviewDetail' => 'dấd',
            'image' => json_encode($v['image']),
            'ratingWidth' =>  isset($v['ratingWidth']) ? $v['ratingWidth'] : 0,
            'ratingTitle' => isset($v['ratingTitle']) ? $v['ratingTitle'] : 0,
            'ratingReviews' => isset($v['ratingReviews']) ? $v['ratingReviews'] : 0,
        ];
        db_duplicate("custom_reviews_products", $dataInsert, "products_id = $id");
    }
    $listProduct = db_fetch_array("select * from custom_reviews_products where shop = '$shop'");
    echo json_encode($listProduct);
}

if (isset($_GET['getAllReviews'])) {
    $sql = "SELECT * FROM custom_reviews_database WHERE shop = '$shop' ORDER BY publishdate DESC";
    $query = $db->query($sql);
    echo mysqli_num_rows($query);
}
if (isset($_GET['getProduct'])) {
    $listProduct = db_fetch_array("select * from custom_reviews_products where shop = '$shop'");

    echo json_encode($listProduct);
}
