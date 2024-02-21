"use client";
import GetScrollY from "@/hooks/getScrollY";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "./ui/sheet";
export function NavigationBar() {
  const scrollY = GetScrollY();
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-10 bg-white ${
        scrollY !== 0 && "border-b border-gray-200"
      }`}
    >
      <nav className="flex items-center justify-between m-auto w-full h-[60px] md:px-8 px-4 max-w-[1240px] relative">
        <Link href="/">
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

        {session && pathname !== "/auth/signup" ? (
          <ul className="flex items-center space-x-6 max-md:hidden">
            {pathname !== "/apply" && <NavTab href="/apply">지원하기</NavTab>}
            <NavTab href="/studies">스터디 목록</NavTab>
            <NavTab href="/profile">프로필</NavTab>
          </ul>
        ) : (
          <ul className="flex items-center space-x-6 max-md:hidden">
            {pathname === "/" && <NavTab href="#about_us">About us</NavTab>}
            {pathname === "/" && (
              <NavTab href="#howitworks">How it works</NavTab>
            )}
            {pathname === "/" && <NavTab href="#projects">Projects</NavTab>}
            {pathname !== "/auth/signin" &&
              pathname !== "/auth/signup" &&
              pathname !== "/auth/error" && <GoogleLoginButton />}
          </ul>
        )}
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
                  {session && pathname !== "/auth/signup" ? (
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
