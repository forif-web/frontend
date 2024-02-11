import React from "react";

function StudyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 min-h-full h-fit">
      <div className="w-full h-64 object-cover bg-sky-400" />
      {/* w-10/12, md: w-full */}
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}

export default StudyPageLayout;
