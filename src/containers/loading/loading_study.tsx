import { StudyInterface } from "@/app/types/study";
import SpinningCircle from "@/components/common/skeleton/spinning-circle";

export default function LoadingStudies({
  data,
  error,
  isLoading,
}: {
  data: StudyInterface[] | undefined;
  error: any;
  isLoading: boolean;
}) {
  if (isLoading) return <SpinningCircle message="스터디 불러오는 중..." />;
  if (error)
    return (
      <div className="flex flex-col gap-5 items-centere justify-center w-full h-full">
        <h1 className="text-2xl font-bold text-red-400">ERROR {error}</h1>
        <p>현재 스터디 목록을 불러올 수 없습니다.</p>
      </div>
    );

  if (!data)
    return (
      <div className="flex flex-col gap-5 justify-center items-center w-full h-full">
        <h1 className="text-4xl font-bold text-red-500">
          스터디가 존재하지 않습니다.
        </h1>
        <p>
          죄송합니다. 현재 스터디 목록이 존재하지 않습니다. 새로고침 혹은
          이메일로 문의 바랍니다.
        </p>
      </div>
    );
}
