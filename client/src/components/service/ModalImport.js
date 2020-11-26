import React, { useCallback, useState } from "react";
import { Button, TextContainer, Modal, DropZone } from "@shopify/polaris";
import { ImportMinor } from "@shopify/polaris-icons";

export default function ModalImport() {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = (
    <Button id="btn-outline" onClick={handleChange} icon={ImportMinor}>
      Import
    </Button>
  );

  return (
    <div style={{ float: "left" }}>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Import reviews"
        primaryAction={{
          content: "Import",
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            content: "Close",
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <DropZone label="Choose data file">
              <DropZone.FileUpload />
            </DropZone>
            <h1 style={{ fontWeight: "bold", fontSize: "1.8rem" }}>
              Maximum 2000 lines in file can be import
            </h1>
            <p>
              We suggested you to split the file into smaller ones to making the
              debug of the reviews, a little easier. <br></br>Download our .xlsx
              template to see an example of the required format. <br></br> Go to
              here to see How to get product's handle for importing data.
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}
