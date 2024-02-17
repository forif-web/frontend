import { Card, Inset, Separator, Strong, Text } from "@radix-ui/themes";
import Image from "next/image";
type ProcessCardType = {
  imgUrl: string;
  titleUrl?: string;
  title: string;
  description: string;
  reference: string;
  selected: boolean;
};

export default function ProcessCard({
  imgUrl,
  title,
  description,
  reference,
  selected,
}: ProcessCardType) {
  return (
    <Card
      size="2"
      className={`transition-all duration-300 h-[450px] max-w-[300px] ${
        selected && "max-w-[415px]"
      }`}
    >
      <Inset clip="padding-box" side="top" pb="current">
        <div style={{ position: "relative", width: "100%", paddingTop: "75%" }}>
          <Image
            src={imgUrl}
            alt="Bold typography"
            fill
            className="object-cover"
          />
        </div>
      </Inset>
      <Text as="p" size="5">
        <Strong>{title}</Strong>
      </Text>
      <Text as="p" size="3">
        {description}
      </Text>
      {selected && (
        <Separator orientation="horizontal" size={"4"} className="my-2" />
      )}
      {selected && (
        <Text as="p" size="3" className="text-forif">
          {reference}
        </Text>
      )}
    </Card>
  );
}
