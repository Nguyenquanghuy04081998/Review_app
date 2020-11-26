<?php

// ini_set('display_errors', TRUE);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
// error_reporting(E_ALL);
require '../vendor/autoload.php';
require '../help.php';
$shop  = "nguyen-q-huy.myshopify.com";
function checkHasImportedReviews($db, $shop, $productid)
{
    $sql = "SELECT * FROM custom_reviews_imported WHERE shop = '$shop' AND product_id= '$productid'";
    $query = $db->query($sql);
    if ($query->num_rows > 0) {
        return 1;
    } else {
        return 0;
    }
}
if (isset($_GET['getAllProduct'])) {


    $shopify = shopifyInit($db, $shop, $appId);
    $products  = getProductInPage($shopify, $since_id = 0, $limit = 5, $fields = "id,title,handle,image");
    $countProducts = getCountAllProduct($shopify);
    // function getIgame($id)
    // {
    //     $src = $GLOBALS['shopify']("GET", "admin/api/2020-10/products/$id/images.json");
    //     return $src[0]['src'];
    // }
    // if (is_array($products) && count($products) > 0) {
    //     $lastKey = count($products) - 1;
    //     $since_id = isset($products[$lastKey]['id']) ? $products[$lastKey]['id'] : 0;
    //     for ($i = 0; $i < count($products); $i++) {
    //         if ($products[$i]["image"]["src"] != '') {
    //             $products[$i]["imageUrl"] = $products[$i]["image"]["src"];
    //         } else {
    //             $products[$i]["imageUrl"] = $rootLink . "/assets/images/no-image.png";
    //         }
    //         $products[$i]["hasImported"] = checkHasImportedReviews($db, $shop, $products[$i]["id"]);
    //         $products[$i]["productUrl"] = "https://" . $shop . "/products/" . $products[$i]["handle"];
    //         $products[$i]["productReviewDetail"] = $rootLink . "/product-review-detail.php?shop=" . $shop . "&product_id=" . $products[$i]["id"];
    //         // $reviews = countAllReviewsByProduct($db, $shop, $products[$i]["id"]);
    //         $reviews = 1;
    //         // $products[$i]["countReviews"] = $reviews["countReviews"];
    //         $products[$i]["ratingReviews"] = $reviews["ratingReviews"];
    //     }
    // }
    foreach ($products as $v) {
        $id = $v['id'];
        $dataInsert = [
            'shop' => $shop,
            'products_id' => $id,
            'products_image_url' => 'sdaasdas',
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
    echo json_encode($products);
}

if (isset($_GET['getAllReviews'])) {
    $sql = "SELECT * FROM custom_reviews_database WHERE shop = '$shop' ORDER BY publishdate DESC";
    $query = $db->query($sql);
    echo mysqli_num_rows($query);
}
if (isset($_GET['getAll'])) {
    $listProduct = db_fetch_array("select * from custom_reviews_products where shop = '$shop'");

    echo json_encode($listProduct);
}
