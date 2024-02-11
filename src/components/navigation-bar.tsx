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
      className={`flex items-center justify-between px-6 h-[60px] fixed left-0 right-0 top-0 bg-white bg-opacity-75 backdrop-blur z-10 ${
        scrollY !== 0 && "border-b border-gray-200"
      }`}
    >
      <Link href="/">
        <div className="flex items-center">
          <Image
            src={"/icons/forif.svg"}
            alt="Logo"
            width={88}
            height={36}
            priority
          />
        </div>
      </Link>
      {session && pathname !== "/auth/signup" ? (
        <nav className="flex items-center space-x-6 max-md:hidden">
          <NavTab href="/studies">스터디 목록</NavTab>
          <NavTab href="/profile">프로필</NavTab>
        </nav>
      ) : (
        <nav className="flex items-center space-x-6 max-md:hidden">
          {pathname === "/" && <NavTab href="#about_us">About us</NavTab>}
          {pathname === "/" && <NavTab href="#howitworks">How it works</NavTab>}
          {pathname === "/" && <NavTab href="#projects">Projects</NavTab>}
          {pathname !== "/auth/signin" && pathname !== "/auth/signup" && (
            <GoogleLoginButton />
          )}
        </nav>
      )}

      {/* dropdown menu */}
      <nav className="hidden max-md:flex items-center space-x-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <FiMenu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-64">
            <SheetFooter>
              <SheetClose asChild>
                <NavTab href="/attendance">전자출결</NavTab>
                <NavTab href="/attendance">전자출결</NavTab>
                <NavTab href="/attendance">전자출결</NavTab>
                <NavTab href="/attendance">전자출결</NavTab>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
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
