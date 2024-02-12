"use client";
import SpinningCircle from "@/components/common/skeleton/spinning-circle";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { applySchema } from "@/lib/default_form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextArea } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import { getStudyNamesType } from "../api/study/name/route";

export default function Apply() {
  // GET STUDY INFOS
  const fetcher = (url: string) => axios.get(url, {}).then((res) => res.data);
  const { data, error, isLoading } = useSWR<getStudyNamesType>(
    "/api/study/name",
    fetcher
  );

  //FORM SCHEMA
  const form = useForm<z.infer<typeof applySchema>>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      primary_study: "",
      secondary_study: "",
      primary_intro: "",
      secondary_intro: "",
      career: "",
    },
  });

  const [primaryStudySelected, setPrimaryStudySelected] = useState("");
  const [secondaryStudySelected, setSecondaryStudySelected] = useState("");

  function onSubmit(formResponse: z.infer<typeof applySchema>) {
    console.log(formResponse);
  }

  //CHECKBOX
  const [term, setTerm] = useState(false);
  const [experienced, setExperienced] = useState(false);
  useEffect(() => {
    if (experienced) {
      form.setValue("career", "없음");
    }
    if (secondaryStudySelected === "미참여") {
      form.setValue("secondary_intro", "");
    }
  }, [experienced, secondaryStudySelected]);

  if (isLoading)
    return (
      <div className="flex flex-col gap-5 items-center justify-center w-full h-screen">
        <SpinningCircle message="잠시만 기다려주세요..." />
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col gap-5 items-center justify-center w-full h-full">
        <h1 className="text-2xl font-bold text-red-400">ERROR {error}</h1>
        <p>현재 스터디 목록을 불러올 수 없습니다.</p>
      </div>
    );

  if (!data)
    return (
      <div className="flex flex-col gap-5 justify-center items-center w-full h-full">
        <h1 className="text-4xl font-bold text-red-500">
          스터디가 존재하지 않습니다.
        </h1>
        <p>
          죄송합니다. 현재 스터디 목록이 존재하지 않습니다. 새로고침 혹은
          이메일로 문의 바랍니다.
        </p>
      </div>
    );

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-10/12 max-w-4xl"
        >
          <FormField
            name="primary_study"
            control={form.control}
            render={({ field: { onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>1순위 스터디</FormLabel>
                <Select
                  onValueChange={(value) => {
                    setPrimaryStudySelected(value);
                    onChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="스터디를 선택해주세요." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(data).map((studyType) => (
                      <SelectGroup key={studyType}>
                        <SelectLabel>{studyType}</SelectLabel>
                        {(data[studyType] as string[]).map((study) => (
                          <SelectItem key={study} value={study}>
                            {study}
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
            name="primary_intro"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>자기소개</FormLabel>
                <FormDescription>
                  스터디(1순위)에 들어오고 싶은 이유
                </FormDescription>
                <FormControl>
                  <TextArea placeholder="50자 이상 작성해주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="secondary_study"
            control={form.control}
            render={({ field: { onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>2순위 스터디</FormLabel>
                <FormDescription>
                  만약 1순위 스터디에 참여하지 못햘 시 참여할 스터디입니다.
                  1순위 스터디 선택 이후 선택 가능합니다.
                </FormDescription>
                <Select
                  onValueChange={(value) => {
                    setSecondaryStudySelected(value);
                    onChange(value);
                  }}
                  disabled={primaryStudySelected === ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="스터디를 선택해주세요." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        미참여시 아래 옵션을 선택해주세요
                      </SelectLabel>
                      <SelectItem value="미참여">미참여</SelectItem>
                    </SelectGroup>
                    {Object.keys(data).map((studyType) => (
                      <SelectGroup key={studyType}>
                        <SelectLabel>{studyType}</SelectLabel>
                        {(data[studyType] as string[]).map((study) => {
                          if (primaryStudySelected === study) {
                            return (
                              <SelectItem key={study} value={study} disabled>
                                {study}
                              </SelectItem>
                            );
                          }
                          return (
                            <SelectItem key={study} value={study}>
                              {study}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {secondaryStudySelected !== "미참여" &&
            secondaryStudySelected !== "" && (
              <FormField
                name="secondary_intro"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자기소개</FormLabel>
                    <FormDescription>
                      스터디(2순위)에 들어오고 싶은 이유
                    </FormDescription>
                    <FormControl>
                      <TextArea
                        placeholder="스터디에 들어와 무엇을 배우려하나요?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

          <FormField
            name="career"
            control={form.control}
            disabled={experienced}
            render={({ field }) => (
              <FormItem>
                <FormLabel>경험</FormLabel>
                <FormDescription>
                  본인의 개발 경험에 대해 알려주세요. 개발해보신 적이 없다면
                  아래 체크박스에 체크해주세요.
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
          <CheckBox
            label="개발해본 경험 없음."
            checked={experienced}
            onChange={setExperienced}
            id="experienced"
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
