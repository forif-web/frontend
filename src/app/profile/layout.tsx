import React from "react";

function ProfilePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 min-h-full h-fit">
      <div className="w-full h-64 bg-gradient-to-r from-cyan-400 to-forif object-cover" />
      {/* w-10/12, md: w-full */}
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}

export default ProfilePageLayout;
