import { StudyInterface } from "@/app/types/study";
import { Badge } from "@/components/ui/badge";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFallBack";

function StudyCard({
  studyId,
  studyName,
  mentorName,
  startTime,
  endTime,
  image,
  date,
  interview,
  level,
  studyType,
  tags,
}: StudyInterface) {
  return (
    <Link
      href={{
        pathname: `/studies/${studyId}`,
      }}
    >
      <div className="flex justify-start bg-white border border-gray-200 rounded-lg active:bg-gray-50 overflow-hidden">
        <ImageWithFallback
          src={image || ""}
          className="w-32 h-32 object-cover max-md:hidden"
          alt="study card"
          width="128"
          height="128"
          priority
        />

        <div className="flex flex-1">
          <div className="flex-1 flex flex-col justify-start items-start p-4">
            <Flex gap="2" className="overflow-x-auto whitespace-nowrap">
              <Badge className="mb-0.5">{studyType} 스터디</Badge>
              {tags &&
                Object.keys(tags).map((tag, idx) => (
                  <Badge
                    className={`mb-0.5 bg-${tags[tag]}-500 hover:bg-${tags[tag]}-400`}
                    key={idx}
                  >
                    {tag.toUpperCase()}
                  </Badge>
                ))}
              {interview && (
                <Badge className="bg-red-500 hover:bg-red-400">면접</Badge>
              )}
            </Flex>
            <Text size="3" className="text-gray-900 font-semibold">
              {studyName}
            </Text>
            <Text size="2" className="text-gray-600">
              {date} {startTime.substring(0, 5)} - {endTime.substring(0, 5)}
            </Text>
            <Text size="2" className="text-gray-600">
              {mentorName} 멘토
            </Text>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default StudyCard;
