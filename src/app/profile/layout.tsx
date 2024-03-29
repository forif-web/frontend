"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { Text } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import useSWR from "swr";
import { userResponseType } from "../types/user";

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
  {
    name: "Management",
    to: "/profile/management",
  },
];

function ProfilePageLayout({ children }: { children: React.ReactNode }) {
  const fetcher = (url: string) => axios.get(url, {}).then((res) => res.data);
  const { data, error, isLoading } = useSWR<userResponseType>(
    "/api/auth/getuser",
    fetcher
  );

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
                <Tabs.List
                  aria-label="tabs"
                  className="flex flex-row md:gap-5 gap-3"
                >
                  {tabs.map((tab) => {
                    if (
                      data?.userAuthorization === "회원" &&
                      tab.name === "Management"
                    ) {
                      return null; // 조건에 맞는 탭은 렌더링하지 않음
                    }

                    // 그 외의 경우, 탭 렌더링
                    return (
                      <Link
                        href={tab.to}
                        className={`${
                          pathname === tab.to ? "underline" : ""
                        } underline-offset-8 decoration-4`}
                        key={tab.name}
                      >
                        <Text size={"4"}>{tab.name}</Text>
                      </Link>
                    );
                  })}
                </Tabs.List>
                {pathname.startsWith("/profile/management") && (
                  <Tabs.List
                    aria-label="sub-tabs"
                    className="flex flex-row md:gap-5 gap-3"
                  >
                    <Link
                      href={"/profile/management/mentor"}
                      className={`${
                        pathname === "/profile/management/mentor" && "underline"
                      } underline-offset-8 decoration-4`}
                      key={"mentor-management"}
                    >
                      <Text size={"3"}>Mentor</Text>
                    </Link>
                    <Link
                      href={"/profile/management/admin"}
                      className={`${
                        pathname === "/profile/management/admin" && "underline"
                      } underline-offset-8 decoration-4`}
                      key={"admin-management"}
                    >
                      <Text size={"3"}>Admin</Text>
                    </Link>
                  </Tabs.List>
                )}
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
