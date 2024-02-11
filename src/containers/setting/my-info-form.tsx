"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { HYU_DEPARTMENTS, formSchema } from "@/lib/default_form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import z from "zod";

export default function MyInfoForm() {
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      userId: "",
      department: "",
      profileImage: "",
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setProfileImg(selectedFile || null);
  };

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="profileImage"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>프로필 이미지</FormLabel>
              <FormDescription>jpg, png 이미지만 가능합니다</FormDescription>
              <div className="flex items-end gap-2">
                <img
                  src={field.value || "https://via.placeholder.com/150"}
                  className="w-24 h-24 rounded-xl mt-2"
                  alt="profile"
                />
                <Button variant="outline" size="icon" type="button">
                  <FiUpload size={16} />
                </Button>
              </div>
              <FormControl>
                <Input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  onChange={onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormDescription>이름을 입력해주세요.</FormDescription>
              <FormControl>
                <Input placeholder="이름" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormDescription>이메일을 입력해주세요.</FormDescription>
              <FormControl>
                <Input placeholder="이메일" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="userId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>학번</FormLabel>
              <FormDescription>학번을 입력해주세요.</FormDescription>
              <FormControl>
                <Input placeholder="학번" {...field} />
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
              <FormDescription>학과를 선택해주세요.</FormDescription>
              <Select>
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
        <div className="h-4" />
        <Button type="submit">수정하기</Button>
      </form>
    </Form>
  );
}
