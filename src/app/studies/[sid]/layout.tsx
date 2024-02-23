import React from "react";

function StudyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 min-h-full h-fit">
      <div className="h-[60px]" />
      {/* w-10/12, md: w-full */}
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

export default StudyPageLayout;
