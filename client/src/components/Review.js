import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import Title from "./service/Title";
import ModalCreateReview from "./service/ModalCreateReview";
import ModalImport from "./service/ModalImport";
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
            getAll: "",
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
  // var data1;
  // if (selected === 0) {
  //   data1 = data;
  // }
  // if (selected === 1) {
  //   data1 = data.filter((e) => e.value === "rustic");
  // }
  // if (selected === 2) {
  //   data1 = data.filter((e) => e.value === "antique");
  // }

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
      <Scrollable shadow style={{ height: "50vh" }}>
        <div style={{ height: "400px", overflow: "auto" }}>
          <Table id="table" hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listAllProduct.map((data, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={data["products_image_url"]}
                      alt="product"
                      style={{ width: "50px", marginRight: "15px" }}
                    />
                    <Link>{data["title"]}</Link>
                  </td>
                  <td>reviews</td>
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
    </div>
  );
}

export default Review;
