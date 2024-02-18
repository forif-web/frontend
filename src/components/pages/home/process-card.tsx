import { Card, Inset, Separator, Strong, Text } from "@radix-ui/themes";
type ProcessCardType = {
  titleUrl?: string;
  title: string;
  description: string;
  reference: string;
  step: 1 | 2 | 3;
  selected: boolean;
};

export default function ProcessCard({
  title,
  description,
  reference,
  selected,
  step,
}: ProcessCardType) {
  return (
    <Card
      size="2"
      className={`Card transition-all duration-300 h-[200px] flex-1 flex-grow flex-wrap ${
        selected && "flex-[2]"
      }`}
    >
      <Inset clip="padding-box" side="top" pb="current">
        <div style={{ width: "100%", height: "100%" }} className="bg-gray-900">
          <h1
            className={`flex items-center justify-center font-bold ${
              selected ? "text-gray-50" : "text-gray-400"
            }`}
          >
            STEP {step}
          </h1>
        </div>
      </Inset>
      <Text as="p" size="6">
        <Strong>{title}</Strong>
      </Text>
      {selected && (
        <Text as="p" size="3">
          {description}
        </Text>
      )}
      {selected && (
        <Separator orientation="horizontal" size={"4"} className="my-2" />
      )}
      {selected && (
        <Text as="p" size="3" className="text-gray-500">
          {reference}
        </Text>
      )}
    </Card>
  );
}
