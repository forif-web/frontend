import { langColorMap } from "@/app/types/study";
import { z } from "zod";

const formSchema = z.object({
  profileImage: z.string(),
  userName: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }),
  department: z.string().min(1, { message: "과를 선택해주세요." }),
});

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const signUpSchema = z.object({
  userName: z
    .string()
    .min(2, { message: "이름은 2글자 이상이어야 합니다." })
    .max(20, { message: "이름은 20글자 이하여야 합니다." }),
  department: z.string().optional(),
  id: z.string().length(10, { message: "학번은 10글자여야 합니다." }),
  phoneNumber: z
    .string()
    .regex(
      phoneRegex,
      "올바르지 않은 형식입니다. 010-1234-5678 형식으로 작성해주세요."
    ),
});

const applySchema = z.object({
  primaryStudy: z
    .string()
    .min(1, { message: "1순위 스터디는 반드시 작성해야 합니다." }),
  secondaryStudy: z
    .string()
    .min(1, { message: "미참여시 '미참여'를 선택해주세요." }),
  primaryIntro: z
    .string()
    .min(50, { message: "50자 이상 작성해주세요." })
    .max(500, { message: "500자 이내로 작성해주세요." }),
  secondaryIntro: z.string().optional(),
  career: z
    .string()
    .min(1, { message: "개발 경험은 반드시 작성해야 합니다." })
    .max(500, { message: "500자 이하로 작성해주세요." }),
});

const mentorApplySchema = z.object({
  studyName: z
    .string()
    .min(1, { message: "스터디 이름은 반드시 작성해야 합니다." }),
  explanation: z
    .string()
    .min(1, { message: "간단한 설명은 반드시 작성해야 합니다." }),
  tag: z.string().array(),
  goal: z.string().min(1, { message: "목표는 반드시 작성해야 합니다." }),
  date: z.string().min(1, { message: "요일은 반드시 선택해야 합니다." }),
  startTime: z
    .object({
      _d: z.string(),
    })
    .optional(),
  endTime: z
    .object({
      _d: z.string(),
    })
    .optional(),
  studyType: z.enum(["정규", "자율"]),
  location: z.string().min(1, {
    message:
      "장소는 필수적으로 작성해야 합니다. 미정일시 '미정'이라고 작성해주세요.",
  }),
  //2nd page
  level: z.string().min(1, { message: "난이도를 선택해주세요." }),
  // maximumUsers: z.number().min(1, { message: "반드시 작성해야 합니다." }),
  // weeklyPlan: z
  //   .string()
  //   .min(1, { message: "주차별 계획은 반드시 작성해야 합니다." }),
  // conditions: z
  //   .string()
  //   .min(1, { message: "이수 조건은 반드시 작성해야 합니다." }),
  // interview: z.boolean(),
});

const tags = Object.keys(langColorMap);

const HYU_DEPARTMENTS: {
  [key: string]: string[];
} = {
  공과대학: [
    "반도체공학과",
    "건축학부",
    "건축공학부",
    "건설환경공학과",
    "도시공학과",
    "자원환경공학과",
    "융합전자공학부",
    "전기생체공학부",
    "신소재공학부",
    "화학공학과",
    "생명공학과",
    "유기나노공학과",
    "에너지공학과",
    "기계공학부",
    "원자력공학과",
    "산업공학과",
    "데이터사이언스학부",
    "컴퓨터소프트웨어학부",
    "정보시스템학과",
    "미래자동차공학과",
  ],
  의과대학: ["의예과", "의학과"],
  인문과학대학: [
    "국어국문학과",
    "중어중문학과",
    "영어영문학과",
    "독어독문학과",
    "사학과",
    "철학과",
  ],
  사회과학대학: [
    "정치외교학과",
    "사회학과",
    "미디어커뮤니케이션학과",
    "관광학부",
  ],
  자연과학대학: ["수학과", "물리학과", "화학과", "생명과학과"],
  정책과학대학: ["정책학과", "행정학과"],
  경제금융대학: ["경제금융학부"],
  경영대학: ["경영학부", "파이낸스경영학과"],
  사범대학: [
    "교육학과",
    "교육공학과",
    "국어교육과",
    "영어교육과",
    "수학교육과",
    "응용미술교육과",
  ],
  생활과학대학: ["식품영양학과", "의류학과", "실내건축디자인학과"],
  음악대학: ["성악과", "작곡과", "피아노과", "관현악과", "국악과"],
  예술체육대학: ["스포츠산업과학부", "연극영화학과", "무용학과"],
  국제학부: ["국제학부"],
  간호대학: ["간호학과"],
  산업융합학부: ["산업융합학부"],
};

export {
  HYU_DEPARTMENTS,
  applySchema,
  formSchema,
  mentorApplySchema,
  signUpSchema,
  tags,
};
