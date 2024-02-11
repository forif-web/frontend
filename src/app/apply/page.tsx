"use client";
import { Button } from "@/components/ui/button";
import { CheckBox } from "@/components/ui/checkbox";
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
import { HYU_DEPARTMENTS, applySchema } from "@/lib/default_form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextArea } from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Apply() {
  const [checked, setChecked] = useState(false);
  const form = useForm<z.infer<typeof applySchema>>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      studyName: "",
      intro: "",
      career: "",
      portfolio: "",
    },
  });

  function handleCheck() {
    setChecked(!checked);
    console.log(checked);
  }

  function onSubmit(data: z.infer<typeof applySchema>) {
    console.log(checked);

    console.log(data);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-10/12 max-w-4xl"
        >
          <FormField
            name="studyName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>스터디</FormLabel>
                <FormDescription>1순위</FormDescription>
                <Select>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="스터디를 선택해주세요." />
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
            name="studyName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormDescription>2순위</FormDescription>
                <Select>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="스터디를 선택해주세요." />
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
            name="studyName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormDescription>3순위</FormDescription>
                <Select>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="스터디를 선택해주세요." />
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
            name="intro"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>자기소개</FormLabel>
                <FormDescription>스터디에 들어오고 싶은 이유</FormDescription>
                <FormControl>
                  <TextArea placeholder="100자 이상 작성해주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="career"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>경험</FormLabel>
                <FormDescription>
                  본인의 개발 경험에 대해 알려주세요. 개발해보신 적이 없다면
                  '없음'이라고 작성해주세요.
                </FormDescription>
                <FormControl>
                  <TextArea
                    placeholder="50자 이하로 작성해주세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="portfolio"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>포트폴리오</FormLabel>
                <FormDescription>
                  스터디와 관련된 포트폴리오가 있다면 제출해주세요. PDF 형식만
                  가능합니다.
                </FormDescription>
                <FormControl>
                  <Input type="file" accept=".pdf" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="h-4" />
          <CheckBox
            label="I agree with"
            checked={checked}
            onChange={setChecked}
          />
          <Button type="submit">제출하기</Button>
        </form>
      </Form>
    </>
  );
}
