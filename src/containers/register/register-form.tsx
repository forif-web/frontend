"use client";
import { Button } from "@/components/ui/button";
import { CheckBox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ToastEmitter from "@/hooks/toastEmitter";
import { HYU_DEPARTMENTS, signUpSchema } from "@/lib/default_form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import z from "zod";

export default function RegisterForm({
  idToken,
}: {
  idToken: string | undefined;
}) {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      id: "",
      department: "",
      phoneNumber: "",
    },
  });

  //submit 버튼 클릭시
  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    if (data.department === "") {
      alert("학과를 선택해주세요.");
    } else {
      try {
        const response = await axios.post("/api/auth/signup", data, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        console.log(response);

        ToastEmitter({ type: "success", text: "회원가입에 성공했습니다." });
        router.push("/");
      } catch (err) {
        ToastEmitter({ type: "error", text: "회원가입 실패!" });
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="userName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder="이름을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>학번</FormLabel>
              <FormControl>
                <Input placeholder="학번을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="department"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>학과</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="학과를 선택해주세요." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(HYU_DEPARTMENTS).map((department) => (
                    <SelectGroup key={department}>
                      <SelectLabel>{department}</SelectLabel>
                      {(HYU_DEPARTMENTS[department] as string[]).map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>전화번호</FormLabel>
              <FormControl>
                <Input placeholder="전화번호를 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="h-8" />
        <CheckBox
          checked={isChecked}
          label={
            <span>
              포리프가 서비스를 제공할 수 있도록{" "}
              <Link
                href={
                  "https://forif.notion.site/859daa5cbd864b539bbed341ca985c3d?pvs=74"
                }
                target="_blank"
                className="font-bold"
              >
                개인정보 수집 및 이용
              </Link>
              에 동의해 주세요
            </span>
          }
          onChange={setIsChecked}
          id="private_info"
        />
        <Button type="submit" disabled={!isChecked}>
          회원가입
        </Button>
      </form>
    </Form>
  );
}
