<?php

// ini_set('display_errors', TRUE);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
// error_reporting(E_ALL);
require '../vendor/autoload.php';
require '../help.php';
$shop  = "nguyen-q-huy.myshopify.com";
$shopify = shopifyInit($db, $shop, $appId);

if (isset($_GET['getAllProduct'])) {
    $products  = getProductInPage($shopify, $since_id = 0, $limit = 250, $fields = "id,title,handle,image");


    foreach ($products as $v) {
        $reviews = countAllReviewsByProduct($db, $shop, $v["id"]);
        $countReview = $reviews["countReviews"];
        $ratingReview = $reviews["ratingReviews"];
        $title = $v['title'];
        $id = $v['id'];
        $scrImage = isset($v["image"]["src"]) ? $v["image"]["src"] : "not image";
        // echo pr($reviews["countReviews"]);
        $dataInsert = [
            'shop' => $shop,
            'products_id' => $id,
            'products_title' => $title,
            'productUrl' => "https://11111fsdfs",
            'products_review_detail' => 'No',
            'products_handle' => $v['handle'],
            'countReviews' => $reviews["countReviews"],
            'hasImported' => 0,
            'productReviewDetail' => 'https://',
            'image' => json_encode($v['image']),
            'products_image_url' => $scrImage,
            'ratingTitle' => isset($v['ratingTitle']) ? $v['ratingTitle'] : 'not title',
            'ratingReviews' => isset($v['ratingReviews']) ? $v['ratingReviews'] : 0,
            'ratingWidth' =>  isset($v['ratingWidth']) ? $v['ratingWidth'] : 0,
        ];
        db_duplicate("custom_reviews_products", $dataInsert, "countReviews = $countReview, ratingReviews = $ratingReview");
    }
    $listProduct = db_fetch_array("select * from custom_reviews_products where shop = '$shop'");
    echo json_encode($listProduct);
    // echo pr($products[0]["image"]["src"]);
}

if (isset($_GET['getAllReviews'])) {
    $sql = "SELECT * FROM custom_reviews_database WHERE shop = '$shop'";
    $query = $db->query($sql);
    echo mysqli_num_rows($query);
}
if (isset($_GET['getPublishReviews'])) {
    $sql = "SELECT * FROM custom_reviews_database WHERE shop = '$shop' AND publish = 1";
    $query = $db->query($sql);
    echo mysqli_num_rows($query);
}
if (isset($_GET['getUnPublishReviews'])) {
    $sql = "SELECT * FROM custom_reviews_database WHERE shop = '$shop' AND publish = 0";
    $query = $db->query($sql);
    echo mysqli_num_rows($query);
}
if (isset($_GET['getCountProduct'])) {
    $countProducts = getCountAllProduct($shopify);
    echo $countProducts;
}

if (isset($_POST['submitCreateReview'])) {

    $valueDate = date('Y-m-d H:i:s', strtotime($_GET['valueDate']));
    if (empty($_GET['valueDate'])) $valueDate = '';


    $dataIns = [
        "shop" => $shop,
        "reviewer_rating" => $_GET['selectedRating'],
        "product_id" => $_GET['idProduct'],
        "reviewer_name" => $_GET['valueName'],
        "reviewer_email" => $_GET['valueEmail'],
        "reviewer_title" => $_GET['valueTitle'],
        "reviewer_mess" => $_GET['valueMessage'],
        "product_recommend" => $_GET['valueRadioRecommend'] == 'yesRecommend' ? 1 : 0,
        "purchase" => $_GET['valueRadioPurchased'] == 'yesPurchased' ? 1 : 0,
        "publish" => $_GET['valueRadioPublish'] == 'yesPublish' ? 1 : 0,
        "publishdate" => $valueDate,
        // "review_thank" => '',
        "featured" => $_GET['valueRadioFeatured'] == 'yesFeatured' ? 1 : 0,
    ];
    db_insert('custom_reviews_database', $dataIns);

    echo json_encode($dataIns);
}


// if (isset($_POST['addReviewImages'])) {
//     $shop = $_POST['addReviewImages'];
//     $numberOfImages = $_POST['numberOfImages'];
//     $shopify = shopifyInit($db, $shop, $appId);
//     $themeId = getMainTheme($shopify);
//     $images = array();
//     for ($i = 0; $i < $numberOfImages; $i++) {
//         if (isset($_FILES['image' . $i]["name"])) {
//             $filename = $_FILES['image' . $i]['name'];
//             $tmpname = $_FILES['image' . $i]['tmp_name'];
//             $filename = FixSpecialChars($filename);
//             $tmpname = FixSpecialChars($tmpname);
//             $target_file =  "/upload/" . basename($filename);
//             move_uploaded_file($tmpname, APP_PATH . $target_file);

//             $rand = rand(0, 10000);
//             $imgUrl = $rootLink . $target_file;

//             $result = $shopify('PUT', '/admin/api/2020-07/themes/' . $themeId . '/assets.json', array('asset' => array('key' => 'assets/' . $rand . '_' . $filename . '', 'src' => $imgUrl)));
//             unlink(APP_PATH . $target_file);
//             if (isset($result['public_url'])) {
//                 $image = array(
//                     "url" => $result['public_url'],
//                     "name" => $rand . '_' . $filename
//                 );
//                 $images[] = (object)$image;
//             }
//         }
//     }
//     echo json_encode($images);
// }

if (isset($_POST['addNewReviewImages'])) {
    $shop = $_POST['addNewReviewImages'];
    $reviewId = $_POST['reviewId'];
    $productId = $_POST['productId'];
    $numberOfImages = $_POST['numberOfImages'];
    $shopify = shopifyInit($db, $shop, $appId);
    $themeId = getMainTheme($shopify);
    $insertImagesSql = "";
    $flag = 0;
    for ($i = 0; $i < $numberOfImages; $i++) {
        if (isset($_FILES['image' . $i]["name"])) {
            $filename = $_FILES['image' . $i]['name'];
            $tmpname = $_FILES['image' . $i]['tmp_name'];
            $filename = FixSpecialChars($filename);
            $tmpname = FixSpecialChars($tmpname);
            $target_file =  "/upload/" . basename($filename);
            move_uploaded_file($tmpname, APP_PATH . $target_file);

            $rand = rand(0, 10000);
            $imgUrl = $rootLink . $target_file;

            $result = $shopify('PUT', '/admin/api/2020-07/themes/' . $themeId . '/assets.json', array('asset' => array('key' => 'assets/' . $rand . '_' . $filename . '', 'src' => $imgUrl)));
            unlink(APP_PATH . $target_file);
            if (isset($result['public_url'])) {
                if ($flag == 0) $insertImagesSql .= "('" . $reviewId . "', '" . $result['public_url'] . "', '" . $rand . '_' . $filename . "',  '" . $productId . "', '" . $shop . "')";
                else $insertImagesSql .= ",('" . $reviewId . "', '" . $result['public_url'] . "', '" . $rand . '_' . $filename . "', '" . $productId . "', '" . $shop . "')";
                $flag++;
            }
        }
    }
    if ($insertImagesSql != "") {
        $sql = "INSERT INTO custom_reviews_images (review_id, url, name, product_id, shop) VALUES " . $insertImagesSql . ";";
        $db->query($sql);
    }
}



function countAllReviewsByProduct($db, $shop, $id)
{
    $sql = "SELECT * FROM custom_reviews_database WHERE shop = '$shop' AND product_id = '$id'";
    $query = $db->query($sql);
    $reviews = array();
    $result = array();
    if ($query) {
        while ($row = $query->fetch_assoc()) {
            $reviews[] = $row;
        }
    }
    $rating = 0;
    if (count($reviews) > 0) {
        for ($i = 0; $i < count($reviews); $i++) {
            $rating += intval($reviews[$i]["reviewer_rating"]);
        }
    }
    $result["countReviews"] = count($reviews);
    $result["ratingReviews"] = $rating;
    return $result;
}
function getAllReviewsByProduct($db, $shop, $id)
{
    $sql = "SELECT * FROM custom_reviews_database WHERE shop = '$shop' AND product_id = '$id' ORDER BY publishdate DESC";
    $query = $db->query($sql);
    $lists = array();
    if ($query) {
        while ($row = $query->fetch_assoc()) {
            $row["reviewer_name"] = testOutputData($row["reviewer_name"]);
            $row["reviewer_email"] = testOutputData($row["reviewer_email"]);
            $row["reviewer_title"] = testOutputData($row["reviewer_title"]);
            $row["reviewer_mess"] = testOutputData($row["reviewer_mess"]);
            $row["publishdate"] = date("m/d/Y H:i", strtotime($row["publishdate"]));
            $lists[] = $row;
        }
    }
    return $lists;
}


































function getMainTheme($shopify)
{
    $themes = $shopify('GET', '/admin/api/2020-10/themes.json');
    foreach ($themes as $theme) {
        if ($theme["role"] == 'main') $id = $theme["id"];
    }
    return $id;
}
