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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GetMultipleCheckBox from "@/hooks/multiple-checkbox";
import { mentorApplySchema, tags } from "@/lib/default_form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Flex, TextArea } from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ApplyMentor() {
  //다중 체크박스
  const { checkedList, checkHandler } = GetMultipleCheckBox();

  //FORM SCHEMA
  const form = useForm<z.infer<typeof mentorApplySchema>>({
    resolver: zodResolver(mentorApplySchema),
    defaultValues: {
      studyName: "",
      explanation: "",
      tag: [""],
      goal: "",
      date: "",
    },
  });
  async function onSubmit(data: z.infer<typeof mentorApplySchema>) {
    console.log(checkedList);
    console.log(data);
  }

  //CHECKBOX
  const [term, setTerm] = useState(false);

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
                <FormLabel>스터디 이름</FormLabel>
                <FormDescription>
                  부원들에게 표시될 스터디 이름을 지어주세요.
                </FormDescription>
                <FormControl>
                  <Input placeholder="50자 이상 작성해주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="explanation"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>스터디 한 줄 소개</FormLabel>
                <FormDescription>
                  스터디에 대한 간단한 설명을 작성해주세요.
                </FormDescription>
                <FormControl>
                  <TextArea placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="goal"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>스터디 목표</FormLabel>
                <FormDescription>
                  스터디에서 이루고자 하는 목표를 작성해주세요.
                </FormDescription>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="tag"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>사용 언어</FormLabel>
                <FormDescription>아래 라벨 중 선택 해 주세요.</FormDescription>
                <FormControl>
                  <Flex direction={"row"} gap={"2"}>
                    {tags.map((item, idx) => (
                      <div className="inline-flex items-center" key={item}>
                        <label
                          className="relative flex items-center p-3 rounded-full cursor-pointer"
                          htmlFor={item}
                        >
                          <input
                            type="checkbox"
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                            id={item}
                            checked={checkedList.includes(item)}
                            onChange={(e) => checkHandler(e, item)}
                          />
                          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="1"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </label>
                        <label
                          className="mt-px font-light text-gray-700 cursor-pointer select-none"
                          htmlFor={item}
                        >
                          {item.toUpperCase()}
                        </label>
                      </div>
                    ))}
                  </Flex>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="date"
            control={form.control}
            render={({ field: { onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>진행 시간(요일)</FormLabel>
                <Select
                  onValueChange={(value) => {
                    onChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="요일을 선택해주세요." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="월">월</SelectItem>
                      <SelectItem value="화">화</SelectItem>
                      <SelectItem value="수">수</SelectItem>
                      <SelectItem value="목">목</SelectItem>
                      <SelectItem value="금">금</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="startTime"
            control={form.control}
            render={({ field: { onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>시작 시간</FormLabel>
                <div>
                  <TimePicker
                    label="스터디 시작 시간"
                    onChange={(value) => {
                      onChange(value);
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="endTime"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>종료 시간</FormLabel>
                <div>
                  <TimePicker label="스터디 종료 시간" value={field.value} />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="h-4" />
          <CheckBox
            label="제출 시 수정할 수 없음을 인지하였습니다."
            checked={term}
            onChange={setTerm}
            id="term"
          />
          <Button type="submit" disabled={!term}>
            제출하기
          </Button>
        </form>
      </Form>
    </>
  );
}
