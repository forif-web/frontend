import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import Image from "next/image";
import React from "react";
import styles from "./hover-card.module.css";

const HoverCard = ({
  name,
  id,
  email,
  children,
}: {
  name: string;
  id: number;
  email: string;
  children: React.ReactNode;
}) => (
  <HoverCardPrimitive.Root>
    <HoverCardPrimitive.Trigger asChild>{children}</HoverCardPrimitive.Trigger>
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        className={styles.HoverCardContent}
        sideOffset={5}
      >
        <Image
          className="Image large"
          width={60}
          height={60}
          src="/icons/hforif.png"
          alt="Radix UI"
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <div>
              <div className="Text bold">{name}</div>
              <div className="Text faded">{id}</div>
            </div>
            <div className="Text">
              Components, icons, colors, and templates for building
              high-quality, accessible UI. Free and open-source.
            </div>
            <div style={{ display: "flex", gap: 15 }}>
              <div style={{ display: "flex", gap: 5 }}>
                <div className="Text bold">email: </div>
                <div className="Text faded">{email}</div>
              </div>
            </div>
          </div>
        </div>

        <HoverCardPrimitive.Arrow className="HoverCardArrow" />
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  </HoverCardPrimitive.Root>
);

export default HoverCard;
