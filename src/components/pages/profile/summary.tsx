import ImageWithFallback from "@/components/common/ImageWithFallBack";

function Summary({
  imageUrl,
  name,
  info,
}: {
  imageUrl: string;
  name: string;
  info: string;
}) {
  return (
    <div className="flex flex-col w-10/12 max-w-4xl">
      <ImageWithFallback
        src={imageUrl}
        width={128}
        height={128}
        className="rounded-full object-cover -mt-16 border-4 border-white shadow-lg"
        alt="profile"
      />
      <div className="mt-2">
        <span className="font-bold text-xl">{name}</span>
      </div>
      <div>
        <span className="text-md text-gray-500">{info}</span>
      </div>
    </div>
  );
}

export default Summary;
