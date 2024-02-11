import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@radix-ui/themes";
import { FiMoreHorizontal } from "react-icons/fi";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";

function CertificateCard({ src }: { src: string }) {
  return (
    <div className="relative flex flex-col justify-start bg-white border border-gray-200 rounded-lg active:bg-gray-50 w-[16rem] ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="absolute top-2 right-2 z-10">
            <Button
              size="icon"
              variant="ghost"
              className="w-8 h-8 rounded-full opacity-50 hover:opacity-100 hover:bg-gray-50 hover:bg-opacity-50"
            >
              <FiMoreHorizontal size={16} />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>수료증 발급</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AspectRatio
        ratio={16 / 9}
        className="bg-slate-100 border-b border-gray-200"
      >
        <img
          src={src}
          className="w-full h-full object-cover"
          alt="certificate"
        />
      </AspectRatio>
      {/* Study Summary */}
      <div className="flex flex-col justify-start p-4">
        <Text size="3" className="text-gray-900 font-semibold">
          React + Typescript 스터디
        </Text>
        <Text size="2" className="text-gray-400">
          2023.02.03.~2023.06.23.
        </Text>
      </div>
    </div>
  );
}

export default CertificateCard;
