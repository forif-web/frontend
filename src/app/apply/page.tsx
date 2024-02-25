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
import ToastEmitter from "@/hooks/toastEmitter";
import { applySchema } from "@/lib/default_form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextArea } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
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
      primaryStudy: "",
      secondaryStudy: "",
      primaryIntro: "",
      secondaryIntro: "",
      career: "",
    },
  });

  const [primaryStudySelected, setPrimaryStudySelected] = useState<
    string | "정규 스터디 미 선택(이후 자율스터디 입부)"
  >("");
  const [secondaryStudySelected, setSecondaryStudySelected] = useState("");
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof applySchema>) {
    try {
      const response: any = await axios.post("/api/apply", data);
      if (response.data.status !== 200) {
        ToastEmitter({ type: "error", text: response.data.message });
      } else {
        ToastEmitter({ type: "success", text: "스터디 신청에 성공했습니다." });
        router.push("/");
      }
    } catch (err) {
      ToastEmitter({ type: "error", text: "신청 실패!" });
    }
  }

  //CHECKBOX
  const [term, setTerm] = useState(false);
  const [experienced, setExperienced] = useState(false);

  useEffect(() => {
    if (experienced) {
      form.setValue("career", "없음");
    }
    if (secondaryStudySelected === "미참여") {
      form.setValue("secondaryIntro", "");
    }
    if (primaryStudySelected === "정규 스터디 미 선택(이후 자율스터디 입부)") {
      form.setValue(
        "primaryIntro",
        "해당 옵션은 정규 스터디에 참여하지 않고, 학기 중에 개설되는 자율 스터디에 참가하는 것입니다."
      );
      form.setValue("secondaryStudy", "미참여");
      form.setValue("secondaryIntro", "");
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

  const StudySelector = ({
    selectType,
  }: {
    selectType: "primary" | "secondary";
  }) => {
    const sortedStudyTypes = Object.keys(data).sort((a, b) => {
      if (a === "정규") return -1;
      if (b === "정규") return 1;
      return 0;
    });

    return (
      <SelectContent>
        {selectType === "secondary" && (
          <SelectGroup>
            <SelectLabel>미참여시 아래 옵션을 선택해주세요</SelectLabel>
            <SelectItem value="미참여">미참여</SelectItem>
          </SelectGroup>
        )}
        {sortedStudyTypes.map((studyType) => (
          <SelectGroup key={studyType}>
            <SelectLabel>{studyType}</SelectLabel>

            {(data[studyType] as string[]).map((study) => {
              if (
                primaryStudySelected === study ||
                secondaryStudySelected === study
              ) {
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
    );
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-10/12 max-w-xl"
        >
          <FormField
            name="primaryStudy"
            control={form.control}
            render={({ field: { onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>1순위 스터디</FormLabel>
                {primaryStudySelected ===
                  "정규 스터디 미 선택(이후 자율스터디 입부)" && (
                  <FormDescription>
                    해당 옵션은 정규 스터디에 참여하지 않고, 학기 중에 개설되는
                    자율 스터디에 참가하는 것입니다. 자율 스터디에 대해 더
                    자세히 알고 싶으시다면 이 링크를 클릭해주세요
                  </FormDescription>
                )}
                <Select
                  onValueChange={(value) => {
                    setPrimaryStudySelected(value);
                    onChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <StudySelector selectType="primary" />
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {primaryStudySelected !==
            "정규 스터디 미 선택(이후 자율스터디 입부)" && (
            <FormField
              name="primaryIntro"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>자기소개</FormLabel>
                  <FormDescription>
                    스터디(1순위)에 들어오고 싶은 이유
                  </FormDescription>
                  <FormControl>
                    <TextArea
                      className="rounded-xl focus:ring-ring"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {primaryStudySelected !==
            "정규 스터디 미 선택(이후 자율스터디 입부)" && (
            <FormField
              name="secondaryStudy"
              control={form.control}
              render={({ field: { onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>2순위 스터디</FormLabel>
                  <FormDescription>
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
                    <StudySelector selectType="secondary" />
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {secondaryStudySelected !== "미참여" &&
            secondaryStudySelected !== "" &&
            primaryStudySelected !==
              "정규 스터디 미 선택(이후 자율스터디 입부)" && (
              <FormField
                name="secondaryIntro"
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
                  본인의 개발 경험에 대해 알려주세요.
                </FormDescription>
                <FormControl>
                  <TextArea
                    placeholder="50자 이하로 작성해주세요."
                    className="focus:ring-ring rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CheckBox
            label="개발 미경험"
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
          <div className="h-4" />
          <Button
            type="submit"
            variant={"default"}
            disabled={!term}
            size={"lg"}
          >
            제출하기
          </Button>
        </form>
      </Form>
    </>
  );
}
