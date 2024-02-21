import React from "react";

function ApplyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 min-h-full h-fit">
      <div className="h-52" />
      {/* w-10/12, md: w-full */}
      <div className="flex flex-col items-center">
        <h1 className="text-[44px] font-bold flex space-y-4 w-10/12 max-w-xl mb-5">
          스터디 신청하기
        </h1>
        <p className="text-sm flex space-y-4 w-10/12 max-w-xl">
          2024-1 FORIF 부원 모집
        </p>
      </div>
      <div className="h-8" />
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}

export default ApplyPageLayout;
