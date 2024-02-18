import { StudyInterface } from "@/app/types/study";
import StudyCard from "@/components/common/study-card";

function StudyCardContainer({
  studyValue,
}: {
  studyValue: StudyInterface[] | undefined;
}) {
  if (!studyValue) {
    return (
      <StudyCard
        studyId={-1}
        studyName={"ERROR"}
        mentorName={"ERROR"}
        startTime={"ERROR"}
        endTime={"ERROR"}
        image={"ERROR"}
        key={"ERROR"}
        date={"ERROR"}
        interview={false}
        level={5}
        mentorId={-1}
        studyType={"자율"}
        tags={["ERROR"]}
      />
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {studyValue.map((val, idx) => (
        <StudyCard
          studyId={val.studyId}
          studyName={val.studyName}
          mentorName={val.mentorName}
          startTime={val.startTime}
          endTime={val.endTime}
          image={val.image}
          key={val.studyId}
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

export default StudyCardContainer;
