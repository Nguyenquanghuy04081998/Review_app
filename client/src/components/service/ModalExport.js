import React, { useCallback, useState } from "react";
import { Button, TextContainer, Modal } from "@shopify/polaris";
import { ExportMinor } from "@shopify/polaris-icons";

export default function ModalExport() {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = (
    <Button id="btn-outline" onClick={handleChange} icon={ExportMinor}>
      Export
    </Button>
  );

  return (
    <div style={{ float: "left" }}>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Export product reviews?"
        primaryAction={{
          content: "Disagree",
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            content: "Agree",
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              Are you sure you want to export all product reviews to Excel file?
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}
