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
import { TimePicker } from "@mui/x-date-pickers";
import { Flex, TextArea } from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ApplyMentor() {
  //STATE
  const [step, setStep] = useState<1 | 2>(1);
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
      startTime: { _d: "" },
      endTime: { _d: "" },
      studyType: "정규",
      location: "미정",
      level: "1",
    },
  });
  async function onSubmit(data: z.infer<typeof mentorApplySchema>) {
    console.log(data);
  }

  //CHECKBOX
  const [term, setTerm] = useState(false);

  //STEP 1 PROPERTIES
  const Step1Form = () => {
    return (
      <>
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
                <Input placeholder="예시 : 프로그래밍 수학" {...field} />
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
                <TextArea
                  placeholder="예시 : 컴퓨터 과학 분야에서 다루는 이산 수학에서의 수열, 논리 분야와 초등 정수론에 대해 학습한다."
                  {...field}
                />
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
                <Input
                  placeholder="예시 : 다양한 관점에서 프로그램의 알고리즘을 비교 및 분석하고, 효율적인 알고리즘을 설계하는 과정을 체험해본다."
                  {...field}
                />
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
        <Flex direction={"row"} gap={"5"} wrap={"wrap"}>
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
            render={({ field: { onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>종료 시간</FormLabel>
                <div>
                  <TimePicker
                    onChange={(value) => {
                      onChange(value);
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </Flex>
        <FormField
          name="studyType"
          control={form.control}
          render={({ field: { onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>스터디 종류</FormLabel>
              <FormDescription>
                정규 스터디와 자율 스터디의 가장 큰 차이점은 자유로움입니다.
                자율 스터디에서는 멘토를 비롯한 스터디원들이 자율적으로 모여
                학습 혹은 프로젝트를 진행하므로 스터디 대체 사유서를 비롯한
                스터디 진행 시 필요한 서류를 제출할 필요가 없습니다.
              </FormDescription>
              <Select
                onValueChange={(value) => {
                  onChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="스터디 종류를 선택해주세요. 미 선택 시 정규로 선택됩니다." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="정규">정규</SelectItem>
                    <SelectItem value="자율">자율</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>스터디 진행 장소</FormLabel>
              <FormControl>
                <Input
                  placeholder="예시 : 미정 (강의실 대여 예상)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  };
  const Step2Form = () => {
    return (
      <>
        <FormField
          name="level"
          control={form.control}
          render={({ field: { onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>난이도</FormLabel>
              <Select
                onValueChange={(value) => {
                  onChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="1부터 5까지 난이도를 선택해주세요." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-10/12 max-w-4xl"
        >
          {step === 1 && <Step1Form />}
          {step === 2 && <Step2Form />}
          <div className="h-4" />
          {step === 1 && (
            <Button size={"lg"} onClick={() => setStep(2)}>
              다음
            </Button>
          )}
          {step === 2 && (
            <CheckBox
              label="제출 시 수정할 수 없음을 인지하였습니다."
              checked={term}
              onChange={setTerm}
              id="term"
            />
          )}

          {step === 2 && (
            <Flex direction={"row"} justify={"between"}>
              <Button size={"lg"} onClick={() => setStep(1)}>
                이전
              </Button>
              <Button type="submit" disabled={!term}>
                제출하기
              </Button>
            </Flex>
          )}
        </form>
      </Form>
    </>
  );
}
