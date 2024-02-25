"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const tabs = [
  {
    name: "Course",
    to: "/profile/course",
  },
  {
    name: "Application",
    to: "/profile/application",
  },
  {
    name: "Account",
    to: "/profile/account",
  },
];

function ProfilePageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="mb-8 min-h-full h-fit">
      <div className="h-[60px]" />
      {/* w-10/12, md: w-full */}
      <div className="flex flex-col">
        <Tabs.Root
          defaultValue="tab1"
          orientation="vertical"
          className="text-white"
        >
          <section className="w-full bg-[#2d2f31] py-8 mb-8">
            <div className="md:max-w-6xl mx-auto my-0 flex md:flex-row flex-col items-center md:justify-between">
              <div className="flex flex-col justify-between gap-4 mx-6 md:w-8/12 mt-6">
                <h1 className="text-5xl font-bold text-white text-center md:text-left">
                  Profile
                </h1>
                <Tabs.List aria-label="tabs" className="flex flex-row gap-5">
                  {tabs.map((tab) => (
                    <Link
                      href={tab.to}
                      className={`${
                        pathname === tab.to && "underline"
                      } underline-offset-8 decoration-4`}
                      key={tab.name}
                    >
                      <Text size={"4"}>{tab.name}</Text>
                    </Link>
                  ))}
                </Tabs.List>
              </div>
            </div>
          </section>
        </Tabs.Root>
        <section className="w-full">
          <div className="max-w-6xl mx-auto flex">
            <div className="flex flex-col mx-6">{children}</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfilePageLayout;
