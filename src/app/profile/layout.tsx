import React from "react";

function ProfilePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 min-h-full h-fit">
      <img
        src="/images/hpec2023.png"
        className="w-full h-64 object-cover"
        alt="profile background"
      />
      {/* w-10/12, md: w-full */}
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}

export default ProfilePageLayout;
