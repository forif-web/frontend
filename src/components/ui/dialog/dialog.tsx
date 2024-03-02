import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import "./dialog.css";

const MyDialog = ({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="Button violet">{label}</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
        <Dialog.Description className="DialogDescription">
          {description}
        </Dialog.Description>
        {children}
        <div
          style={{
            display: "flex",
            marginTop: 25,
            justifyContent: "flex-end",
            gap: "8px",
          }}
        >
          <Dialog.Close asChild>
            <button className="Button red">Save changes</button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button className="Button green">Save changes</button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default MyDialog;
