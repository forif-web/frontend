import React from "react";

function ApplyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 min-h-full h-fit">
      <div className="h-24" />
      {/* w-10/12, md: w-full */}
      <h1 className="text-3xl flex justify-center font-bold">
        스터디 신청하기
      </h1>
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}

export default ApplyPageLayout;
