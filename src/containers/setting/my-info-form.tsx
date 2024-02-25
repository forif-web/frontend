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
import { getUserPhotoURI } from "@/hooks/getCloudinaryURI";
import { HYU_DEPARTMENTS, formSchema } from "@/lib/default_form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function MyInfoForm() {
  const { data: session } = useSession();
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      department: "",
      profileImage: "",
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setProfileImg(selectedFile || null);
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);

    if (profileImg) {
      const imageURL = await getUserPhotoURI(profileImg, session?.user.email!);
      console.log(imageURL);

      //
      const formData = new FormData();
      formData.append("image", imageURL);
      formData.append("userName", data.userName);
      formData.append("department", data.department);

      const res = await axios.patch("/api/auth/setuser", formData);
      console.log(res);
    }
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
              <FormControl>
                <Input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="userName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
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
        <div className="h-4" />
        <Button type="submit">수정하기</Button>
      </form>
    </Form>
  );
}
