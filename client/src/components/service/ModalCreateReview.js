import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  Button,
  Modal,
  Select,
  Icon,
  Stack,
  Banner,
  Caption,
  DropZone,
  List,
  TextField,
  Autocomplete,
  Thumbnail,
  RadioButton,
  Layout,
  Card,
  Scrollable,
} from "@shopify/polaris";
import axios from "axios";
import config from "../../config/config";
import { SearchMinor, PlusMinor } from "@shopify/polaris-icons";
import "../../css/style.css";
import moment from "moment";

function ModalCreateReview() {
  const [disableSave, setDisable] = useState(true);
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [idProduct, setIdProduct] = useState("");
  const wrapperRef = useRef(null);
  useEffect(() => {
    const products = [];
    axios
      .get(config.rootLink + `/product_reviews-app/backend/server.php`, {
        params: {
          getAllProduct: "",
        },
      })
      .then((res) => {
        return res.data.map((e) => products.push(e));
      });
    setOptions(products);
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };
  const setPokeDex = (poke, id) => {
    setIdProduct(id);
    setSearch(poke);
    setDisplay(false);
  };
  //custom modal
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = (
    <Button id="btn-outline" onClick={handleChange} icon={PlusMinor}>
      Add Review
    </Button>
  );
  //end

  //input name
  const [name, setName] = useState(""); //console.log(value)
  const handleChangeInputName = useCallback((newValue) => {
    setName(newValue);
    // if (newValue !== "" && search !== "") {
    //   setDisable(false);
    // }
  }, []);
  //title input
  const [title, setTitle] = useState(""); //console.log(value)
  const handleChangeInputTitle = useCallback(
    (newValue) => setTitle(newValue),
    []
  );
  //email input
  const [email, setEmail] = useState(""); //console.log(value)
  const handleChangeInputEmail = useCallback(
    (newValue) => setEmail(newValue),
    []
  );
  //messenge input
  const [messenge, setMessenge] = useState(""); //console.log(value)
  const handleChangeInputMessenge = useCallback(
    (newValue) => setMessenge(newValue),
    []
  );
  //select rating input
  const [selectedRating, setSelectedRating] = useState("5");

  const handleSelectChange = useCallback(
    (value) => setSelectedRating(value),
    []
  );

  const rating = [
    { label: "1 stars", value: "1" },
    { label: "2 stars", value: "2" },
    { label: "3 stars", value: "3" },
    { label: "4 stars", value: "4" },
    { label: "5 stars", value: "5" },
  ];
  //upload image
  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;

  const handleDrop = useCallback(
    (_droppedFiles, acceptedFiles, rejectedFiles) => {
      setFiles((files) => [...files, ...acceptedFiles]);
      setRejectedFiles(rejectedFiles);
    },
    []
  );

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={window.URL.createObjectURL(file)}
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  const errorMessage = hasError && (
    <Banner
      title="The following images couldn’t be uploaded:"
      status="critical"
    >
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>
            {`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
          </List.Item>
        ))}
      </List>
    </Banner>
  );
  //DATE
  const today = moment(new Date()).format("YYYY-MM-DDTHH:mm");
  const [date, setDate] = useState(today);

  const handleChangeDate = useCallback((newValue) => setDate(newValue), []);

  //radio button recommend this product
  const [valueRadioRecommend, setvalueRadioRecommend] = useState(
    "yesRecommend"
  );
  const handleChangeRadioRecommend = useCallback(
    (_checked, newValue) => setvalueRadioRecommend(newValue),
    []
  );
  //radio button Purchased customers
  const [valueRadioPurchased, setValueRadioPurchased] = useState(
    "yesPurchased"
  );

  const handleChangeRadioPurchased = useCallback(
    (_checked, newValue) => setValueRadioPurchased(newValue),
    []
  );
  //radio button Featured review
  const [valueRadioFeatured, setValueRadioFeatured] = useState("yesFeatured");

  const handleChangeRadioFeatured = useCallback(
    (_checked, newValue) => setValueRadioFeatured(newValue),
    []
  );
  //radio button Publish this review
  const [valueRadioPublish, setValueRadioPublish] = useState("yesPublish");

  const handleChangeRadioPublish = useCallback(
    (_checked, newValue) => setValueRadioPublish(newValue),
    []
  );
  //end

  //form test
  const clearInput = useCallback(() => {
    setSearch("");
    setName("");
    setTitle("");
    setEmail("");
    setMessenge("");
    setSelectedRating("5");
    setFiles([]);
    setDate(today);
    setValueRadioPublish("yesPublish");
    setValueRadioPurchased("yesPurchased");
    setValueRadioFeatured("yesFeatured");
    setvalueRadioRecommend("yesRecommend");
  });
  const [dataSubmit, setDataSubmit] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const onSubmit = async () => {
      const res = await axios.post(
        config.rootLink + "/product_reviews-app/backend/server.php",
        {
          params: {
            submitCreateReview: "",
            selectedProduct: search,
            idProduct: idProduct,
            valueName: name,
            valueTitle: title,
            valueEmail: email,
            valueMessage: messenge,
            selectedRating: selectedRating,
            valueRadioRecommend: valueRadioRecommend,
            valueRadioPurchased: valueRadioPurchased,
            valueRadioPublish: valueRadioPublish,
            valueRadioFeatured: valueRadioFeatured,
            valueDate: date,
          },
        }
      );
      setDataSubmit(res.data);
    };
    onSubmit();
    setDisable(true);
    handleChange();
    clearInput();
  };

  const handleClose = (e) => {
    e.preventDefault();
    clearInput();
    setDisable(true);
    setActive((active) => !active);
  };
  return (
    <div style={{ float: "left" }}>
      <Modal
        large
        limitHeight={false}
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Create new review"
        primaryAction={{
          content: "Save",
          onAction: handleSubmit,
          disabled: false,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleClose,
          },
        ]}
      >
        <Modal.Section>
          <div className="padding">
            <div className="marginBottom">
              <Layout>
                <Layout.Section oneHalf>
                  <div ref={wrapperRef} className="div-autocomplete">
                    <p id="title-autocomplete">Choose product</p>
                    <input
                      className="form-control mr-sm-2 input-autocomplete"
                      type="search"
                      aria-label="Search"
                      onClick={() => setDisplay(true)}
                      id="auto"
                      placeholder="Type to search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    ></input>
                    {display && (
                      <div className="autoContainer">
                        <Scrollable
                          shadow
                          style={{ maxHeight: "50vh", overflow: "auto" }}
                        >
                          {options
                            .filter(
                              ({ products_title }) =>
                                products_title
                                  .toLowerCase()
                                  .indexOf(search.toLowerCase()) > -1
                            )
                            .map((v, i) => {
                              return (
                                <div
                                  onClick={() =>
                                    setPokeDex(v.products_title, v.products_id)
                                  }
                                  className="options"
                                  key={i}
                                  tabIndex="0"
                                >
                                  <span>{v.products_title}</span>
                                </div>
                              );
                            })}
                        </Scrollable>
                      </div>
                    )}
                  </div>
                </Layout.Section>
                <Layout.Section oneHalf>
                  <TextField
                    label="Name"
                    value={name}
                    onChange={handleChangeInputName}
                  />
                </Layout.Section>
              </Layout>
            </div>
            <div className="marginBottom">
              <Layout>
                <Layout.Section oneHalf>
                  <TextField
                    label="Title"
                    value={title}
                    onChange={handleChangeInputTitle}
                  />
                </Layout.Section>
                <Layout.Section oneHalf>
                  <TextField
                    label="Email"
                    value={email}
                    onChange={handleChangeInputEmail}
                  />
                </Layout.Section>
              </Layout>
            </div>
            <div className="marginBottom">
              <Layout>
                <Layout.Section oneHalf>
                  <TextField
                    label="Messenge"
                    value={messenge}
                    onChange={handleChangeInputMessenge}
                    multiline={4}
                  />
                </Layout.Section>
                <Layout.Section oneHalf>
                  <Select
                    label="Rating"
                    options={rating}
                    onChange={handleSelectChange}
                    value={selectedRating}
                  />
                </Layout.Section>
              </Layout>
            </div>
            <div className="marginBottom">
              <Layout>
                <Layout.Section oneHalf>
                  <Stack vertical>
                    {errorMessage}
                    <DropZone
                      label="Add photo"
                      accept="image/*"
                      type="image"
                      onDrop={handleDrop}
                    >
                      {uploadedFiles}
                      {fileUpload}
                    </DropZone>
                  </Stack>
                </Layout.Section>
              </Layout>
            </div>
            <div className="marginBottom">
              <Layout>
                <Layout.Section oneHalf>
                  <TextField
                    label="Publish date"
                    value={date}
                    onChange={handleChangeDate}
                    type="datetime-local"
                  />
                </Layout.Section>
                <Layout.Section oneHalf>
                  <p>Recommend this product</p>
                  <div style={{ marginTop: "15px" }}>
                    <Stack>
                      <RadioButton
                        label="Yes"
                        checked={valueRadioRecommend === "yesRecommend"}
                        id="yesRecommend"
                        name="yesnoRecommend"
                        value="yesRecommend"
                        onChange={handleChangeRadioRecommend}
                      />
                      <RadioButton
                        label="No"
                        id="noRecommend"
                        name="yesnoRecommend"
                        value="noRecommend"
                        checked={valueRadioRecommend === "noRecommend"}
                        onChange={handleChangeRadioRecommend}
                      />
                    </Stack>
                  </div>
                </Layout.Section>
              </Layout>
            </div>
            <div className="marginBottom">
              <Layout>
                <Layout.Section oneHalf>
                  <p>Purchased customers</p>
                  <div style={{ marginTop: "15px" }}>
                    <Stack>
                      <RadioButton
                        label="Yes"
                        checked={valueRadioPurchased === "yesPurchased"}
                        id="yesPurchased"
                        name="yesnoPurchased"
                        value="yesPurchased"
                        onChange={handleChangeRadioPurchased}
                      />
                      <RadioButton
                        label="No"
                        id="noPurchased"
                        name="yesnoPurchased"
                        value="noPurchased"
                        checked={valueRadioPurchased === "noPurchased"}
                        onChange={handleChangeRadioPurchased}
                      />
                    </Stack>
                  </div>
                </Layout.Section>
                <Layout.Section oneHalf>
                  <p>Publish this review</p>
                  <div style={{ marginTop: "15px" }}>
                    <Stack>
                      <RadioButton
                        label="Yes"
                        checked={valueRadioPublish === "yesPublish"}
                        id="yesPublish"
                        name="yesnoPublish"
                        value="yesPublish"
                        onChange={handleChangeRadioPublish}
                      />
                      <RadioButton
                        label="No"
                        id="noPublish"
                        name="yesnoPublish"
                        value="noPublish"
                        checked={valueRadioPublish === "noPublish"}
                        onChange={handleChangeRadioPublish}
                      />
                    </Stack>
                  </div>
                </Layout.Section>
              </Layout>
            </div>
            <div className="marginBottom">
              <Layout>
                <Layout.Section oneHalf>
                  <p>Featured review</p>
                  <div style={{ marginTop: "15px" }}>
                    <Stack>
                      <RadioButton
                        label="Yes"
                        checked={valueRadioFeatured === "yesFeatured"}
                        id="yesFeatured"
                        name="yesnoFeatured"
                        value="yesFeatured"
                        onChange={handleChangeRadioFeatured}
                      />
                      <RadioButton
                        label="No"
                        id="noFeatured"
                        name="yesnoFeatured"
                        value="noFeatured"
                        checked={valueRadioFeatured === "noFeatured"}
                        onChange={handleChangeRadioFeatured}
                      />
                    </Stack>
                  </div>
                </Layout.Section>
              </Layout>
            </div>
          </div>
        </Modal.Section>
      </Modal>
    </div>
  );
}
export default ModalCreateReview;
