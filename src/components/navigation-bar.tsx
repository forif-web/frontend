"use client";
import { userResponseType } from "@/app/types/user";
import GetScrollY from "@/hooks/getScrollY";
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import useSWR from "swr";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "./ui/sheet";
export function NavigationBar() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<userResponseType>(
    "/api/auth/getuser",
    fetcher
  );
  const scrollY = GetScrollY();
  const pathname = usePathname();
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-10 bg-white ${
        scrollY !== 0 && "border-b border-gray-200"
      }`}
    >
      <nav className="flex items-center md:justify-between justify-end m-auto w-full h-[60px] md:px-8 px-4 max-w-[1240px] relative">
        <ul className="flex items-center space-x-6 max-md:hidden">
          {pathname === "/" && <NavTab href="#about_us">About us</NavTab>}
          {pathname === "/" && <NavTab href="#howitworks">Process</NavTab>}
          {pathname === "/" && <NavTab href="#projects">Projects</NavTab>}
        </ul>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center">
            <Image
              src={"/icons/logo.svg"}
              alt="Logo"
              width={80}
              height={40}
              priority
            />
          </div>
        </Link>
        <div
          className={`flex-row items-center gap-4 pr-3 hidden ${
            pathname === "/apply" ? "hidden" : "md:flex"
          }`}
        >
          {data && data.userId && !isLoading && isLoading ? (
            <NavTab href="/">로딩 중....</NavTab>
          ) : (
            <NavTab href="/profile">PROFILE</NavTab>
          )}
          {pathname === "/studies" ? (
            <button className="rounded-3xl px-6 py-2 h-12 text-base bg-gray-900 text-white">
              <Link href={`/apply`}>지원하기</Link>
            </button>
          ) : (
            <button className="rounded-3xl px-6 py-2 h-12 text-base bg-gray-900 text-white">
              <Link href={`/studies`}>지원하기</Link>
            </button>
          )}
        </div>

        {/* dropdown menu */}
        <ul className="hidden max-md:flex items-center space-x-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <FiMenu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-64">
              <SheetFooter>
                <SheetClose asChild>
                  {data && data.userId && pathname !== "/auth/signup" ? (
                    <>
                      <NavTab href="/profile">프로필</NavTab>
                      <NavTab href="/studies">스터디 목록</NavTab>
                      <NavTab href="/apply">지원하기!</NavTab>
                    </>
                  ) : (
                    <>
                      {pathname === "/" && (
                        <NavTab href="/auth/signin">로그인 하기</NavTab>
                      )}
                      {pathname !== "/auth/signin" &&
                        pathname !== "/auth/signup" &&
                        pathname !== "/auth/error" && <GoogleLoginButton />}
                    </>
                  )}
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </ul>
      </nav>
    </header>
  );
}

function NavTab({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-gray-500 rounded-md hover:text-gray-900 hover:bg-gray-100"
    >
      {children}
    </Link>
  );
}

export function GoogleLoginButton() {
  useEffect(() => {
    function handleSignIn() {}
    handleSignIn();
  }, []);
  return (
    <Button
      variant={"outline"}
      onClick={() => signIn("google")}
      className="bg-transparent border-2"
    >
      <div className="flex flex-row items-center gap-5">
        <Image
          src={"/icons/google.png"}
          width={20}
          height={20}
          alt="Google Logo"
        />
        <h1>학교 계정으로 로그인</h1>
      </div>
    </Button>
  );
}
