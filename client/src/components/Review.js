import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import Title from "./service/Title";
import ModalCreateReview from "./service/ModalCreateReview";
import ModalImport from "./service/ModalImport";
import ReactStars from "react-stars";
import ModalExport from "./service/ModalExport";
import "../css/style.css";
import { Table } from "reactstrap";
import {
  Scrollable,
  Tabs,
  Link,
  Layout,
  TextField,
  Select,
  Pagination,
} from "@shopify/polaris";
import { Dropdown } from "react-bootstrap";

function Review() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const [dataProducts, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        "https://huylocal.omegatheme.com/product_reviews-app/backend/server.php",
        {
          params: {
            getAllProduct: "",
          },
        }
      );

      setData(res.data);
    };

    getData();
  }, []);
  const listAllProduct = dataProducts ? dataProducts : [];
  // var data = [
  //   { value: "rustic", label: "Rustic" },
  //   { value: "antique", label: "Antique" },
  //   { value: "vinyl", label: "Vinyl" },
  //   { value: "vintage", label: "Vintage" },
  //   { value: "refurbished", label: "Refurbished" },
  // ];
  let datFilterProducts = [];
  if (selected === 0) {
    datFilterProducts = listAllProduct;
  }
  if (selected === 1) {
    datFilterProducts = listAllProduct.filter(
      (e) => e.products_title === "Giày"
    );
  }
  if (selected === 2) {
    console.log(2);
  }

  const tabs = [
    {
      id: "all-products",
      content: "All Products",
      accessibilityLabel: "All Reviews",
      panelID: "all-products",
    },
    {
      id: "added-reviews",
      content: "Addded Reviews",
      panelID: "added-reviews",
    },
    {
      id: "no-reviews",
      content: "No Reviews",
      panelID: "no-reviews",
    },
  ];
  //filter by rating
  const [selectedRating, setSelectedRating] = useState("today");

  const handleSelectFilterRating = useCallback(
    (value) => setSelectedRating(value),
    []
  );

  const rating = [
    { label: "All stars", value: "0" },
    { label: "1 stars", value: "1" },
    { label: "2 stars", value: "2" },
    { label: "3 stars", value: "3" },
    { label: "4 stars", value: "4" },
    { label: "5 stars", value: "5" },
  ];
  //search input
  const [valueSearch, setSearch] = useState(""); //console.log(value)
  const handleChangeInputSearch = useCallback(
    (newValue) => setSearch(newValue),
    []
  );
  const [countReviews, setCountReview] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        "https://huylocal.omegatheme.com/product_reviews-app/backend/server.php",
        {
          params: {
            getAllReviews: "",
          },
        }
      );

      setCountReview(res.data);
    };

    getData();
  }, []);
  return (
    <div>
      <Title title="Reviews" />
      <div style={{ width: "100vw", height: "30px" }}>
        <ModalCreateReview id="btn-outline" />
        <ModalExport id="btn-outline" />
        <ModalImport id="btn-outline" />
      </div>
      <div id="card-group">
        <div className="card-custom">
          <h1 className="card-title">{countReviews}</h1>
          <p>All reviews</p>
        </div>
        <div className="card-custom">
          <h1 className="card-title">1357</h1>
          <p>Published reviews</p>
        </div>
        <div className="card-custom">
          <h1 className="card-title">51</h1>
          <p>UnPublished reviews</p>
        </div>
        <div className="card-custom">
          <h1 className="card-title">0</h1>
          <p>No reviews</p>
        </div>
      </div>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}></Tabs>

      {/* ....................................................................................... */}
      <Layout>
        <Layout.Section oneHalf>
          <TextField
            placeholder="Type to search"
            value={valueSearch}
            onChange={handleChangeInputSearch}
          />
        </Layout.Section>
        <Layout.Section oneHalf>
          <Select
            options={rating}
            onChange={handleSelectFilterRating}
            value={selectedRating}
          />
        </Layout.Section>
      </Layout>
      {/* ...................................................................... */}
      <Scrollable shadow style={{ height: "50vh", marginBottom: "20px" }}>
        <div>
          <Table id="table" hover>
            <thead>
              <tr>
                <th width="50%">Product</th>
                <th width="40%">Rating</th>
                <th width="10%">Action</th>
              </tr>
            </thead>
            <tbody>
              {datFilterProducts.map((data, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src="https://cf.shopee.vn/file/f6c491fb8ef80a610d9ea8168eac50de"
                      alt="product"
                      className="imageProduct-reviewPage"
                    />
                    <Link>{data["products_title"]}</Link>
                  </td>
                  <td>
                    <ReactStars
                      style={{ display: "inline-block" }}
                      count={5}
                      size={24}
                      emptyIcon={<i className="far fa-star"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      color2="#ffb50d"
                      value={3.5}
                      edit={false}
                    />
                    {/* {data.ratingReviews} reviews */}
                    <p style={{ display: "block", marginTop: "10px" }}>
                      1212321312 reviews
                    </p>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="default"
                        className="buttondropdown"
                      >
                        Action
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>Publish</Dropdown.Item>
                        <Dropdown.Item>Unpublish</Dropdown.Item>
                        <Dropdown.Item>Delete</Dropdown.Item>
                        <Dropdown.Item>Import Reviews</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Scrollable>
      <div style={{ float: "right" }}>
        <Pagination
          label="Page 1/50"
          hasPrevious
          onPrevious={() => {
            console.log("Previous");
          }}
          hasNext
          onNext={() => {
            console.log("Next");
          }}
        />
      </div>
    </div>
  );
}

export default Review;
