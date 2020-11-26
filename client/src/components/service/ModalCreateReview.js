import React, { useCallback, useState, useEffect } from "react";
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
} from "@shopify/polaris";
import axios from "axios";

import { SearchMinor, PlusMinor } from "@shopify/polaris-icons";
import "../../css/style.css";
import moment from "moment";

function ModalCreateReview() {
  //custom modal
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);

  const handleClose = useCallback(() => setActive((active) => !active), []);
  const activator = (
    <Button id="btn-outline" onClick={handleChange} icon={PlusMinor}>
      Add Review
    </Button>
  );
  //end
  //custom autocomplete
  const deselectedOptions = [
    { value: "rustic", label: "Rustic" },
    { value: "antique", label: "Antique" },
    { value: "vinyl", label: "Vinyl" },
    { value: "vintage", label: "Vintage" },
    { value: "refurbished", label: "Refurbished" },
  ];
  // get product
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
  const optionsProduct = [];
  listAllProduct.map((product, index) => {
    optionsProduct.push({
      value: product.id,
      label: product.products_title,
    });
  });

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValueProduct, setInputValueProduct] = useState("");
  const [options, setOptions] = useState(optionsProduct);
  console.log(options);
  const click = useCallback((newValue) => {}, []);
  const updateText = useCallback(
    (value) => {
      setInputValueProduct(value);

      if (value === "") {
        setOptions(optionsProduct);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = optionsProduct.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [optionsProduct]
  );
  const updateSelection = useCallback((selected) => {
    const selectedValue = selected.map((selectedItem) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selectedItem);
      });
      return matchedOption && matchedOption.label;
    });

    setSelectedOptions(selected);
    setInputValueProduct(selectedValue); //fix tay - default: selectedValue
    console.log(inputValueProduct);
  }, []);

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Choose product"
      value={inputValueProduct}
      prefix={<Icon source={SearchMinor} color="inkLighter" />}
      placeholder="Search"
      onFocus={click}
    />
  );
  //end autocomplete
  //input name
  const [name, setName] = useState(""); //console.log(value)
  const handleChangeInputName = useCallback(
    (newValue) => setName(newValue),
    []
  );
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
  const [selectedRating, setSelected] = useState("5");

  const handleSelectChange = useCallback((value) => setSelected(value), []);

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
  const [valueRadioRecommend, setvalueRadioRecommend] = useState("disabled");

  const handleChangeRadioRecommend = useCallback(
    (_checked, newValue) => setvalueRadioRecommend(newValue),
    []
  );
  //radio button Purchased customers
  const [valueRadioPurchased, setValueRadioPurchased] = useState("disabled");

  const handleChangeRadioPurchased = useCallback(
    (_checked, newValue) => setValueRadioPurchased(newValue),
    []
  );
  //radio button Featured review
  const [valueRadioFeatured, setValueRadioFeatured] = useState("disabled");

  const handleChangeRadioFeatured = useCallback(
    (_checked, newValue) => setValueRadioFeatured(newValue),
    []
  );
  //radio button Publish this review
  const [valueRadioPublish, setValueRadioPublish] = useState("disabled");

  const handleChangeRadioPublish = useCallback(
    (_checked, newValue) => setValueRadioPublish(newValue),
    []
  );
  //end
  const data = [
    { "Choose product": inputValueProduct },
    { Name: name },
    { Title: title },
    { Email: email },
    { Messenge: messenge },
    { Rating: selectedRating },
    { Image: files },
    { "Publish date": date },
    { Recomment: valueRadioRecommend },
    { Purchased: valueRadioPurchased },
    { Publish: valueRadioPublish },
    { Featured: valueRadioFeatured },
  ];
  //form test
  const handleSubmit = (e) => {
    e.preventDefault();
    const onSubmit = async () => {
      console.log(options);
    };
    onSubmit();
    handleChange();
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
                  <Autocomplete
                    options={options}
                    selected={selectedOptions}
                    onSelect={updateSelection}
                    textField={textField}
                  />
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
