import { StudyInterface } from "@/app/types/study";
import StudyCard from "@/components/common/study-card";

function HomeStudyCardContainer({
  studyValue,
}: {
  studyValue: StudyInterface[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {studyValue.map((val) => (
        <StudyCard
          studyId={val.studyId}
          studyName={val.studyName}
          mentorName={val.mentorName}
          startTime={val.startTime}
          endTime={val.endTime}
          image={val.image}
          key={val.studyId}
          clubId={val.clubId}
          date={val.date}
          interview={val.interview}
          level={val.level}
          mentorId={val.mentorId}
          studyType={val.studyType}
          tags={val.tags}
        />
      ))}
    </div>
  );
}

export default HomeStudyCardContainer;
