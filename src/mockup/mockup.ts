import { MilestoneType } from "@/app/types/milestone";
import { GalleryImageType } from "@/components/common/gallery/gallery";

const galleryImages: GalleryImageType[] = [
  {
    id: 0,
    imageURI: "hpec",
    name: "HPEC",
    description: "2023년 10월에 개최된 알고리즘 경진 대회",
    isHovered: false,
    isClick: false,
  },
  {
    id: 1,
    imageURI: "homecoming",
    name: "2023 홈커밍데이",
    description: "토스, 증권사 등에서 오신 선배들과의 즐거운 만남",
    isHovered: false,
    isClick: false,
  },
  {
    id: 2,
    imageURI: "hackathon",
    name: "해커톤",
    description: "포리프 활동의 결실, 한 학기의 마무리 해커톤",
    isHovered: false,
    isClick: false,
  },
  {
    id: 3,
    imageURI: "promotion",
    name: "동아리박람회",
    description: "FORIF 동아리박람회",
    isHovered: false,
    isClick: false,
  },
  {
    id: 4,
    imageURI: "graduation_poster",
    name: "졸업 현수막 - 황성우",
    description:
      "포리프 운영진(멘토) 활동 2학기 이상 시 졸업 현수막을 만들어드립니다!",
    isHovered: false,
    isClick: false,
  },
  {
    id: 5,
    imageURI: "graduation_poster_2",
    name: "졸업 현수막 - 민경환",
    description:
      "포리프 운영진(멘토) 활동 2학기 이상 시 졸업 현수막을 만들어드립니다!",
    isHovered: false,
    isClick: false,
  },
];

const milestone: MilestoneType = {
  data: [
    {
      year: 2024,
      events: [
        {
          month: "01",
          details: [
            {
              event: "FORIF 웹사이트 오픈",
            },
          ],
        },
      ],
    },
    {
      year: 2023,
      events: [
        {
          month: "12",
          details: [
            {
              event: "제 8회 해커톤",
            },
          ],
        },
        {
          month: "11",
          details: [
            {
              event: "제 1회 홈커밍데이",
            },
          ],
        },
        {
          month: "09",
          details: [
            {
              event: "2023 HPEC 개최",
            },
            {
              event: "(Hanyang Programming Evaluation Contest)",
            },
          ],
        },
        {
          month: "08",
          details: [
            {
              event: "OOPARTS와 연합 스터디",
            },
          ],
        },

        {
          month: "05",
          details: [
            {
              event: "FORIF MT",
            },
          ],
        },
        {
          month: "04",
          details: [
            {
              event: "노션 특강",
            },
          ],
        },
      ],
    },
    {
      year: 2022,
      events: [
        {
          month: "12",
          details: [
            {
              event: "동아리방 리모델링",
            },
          ],
        },
      ],
    },
    {
      year: 2021,
      events: [
        {
          month: "06",
          details: [
            {
              event: "FORIF 중앙동아리 승격",
            },
          ],
        },
      ],
    },
    {
      year: 2015,
      events: [
        {
          month: "03",
          details: [
            {
              event: "FORIF 창립일",
            },
          ],
        },
      ],
    },
  ],
};

const howitworks: MilestoneType = {
  data: [
    {
      year: 2024,
      events: [
        {
          month: "01",
          details: [
            {
              event: "FORIF 웹사이트 오픈",
            },
          ],
        },
      ],
    },
    {
      year: 2023,
      events: [
        {
          month: "12",
          details: [
            {
              event: "제 8회 해커톤",
            },
          ],
        },
        {
          month: "11",
          details: [
            {
              event: "제 1회 홈커밍데이",
            },
          ],
        },
        {
          month: "09",
          details: [
            {
              event: "2023 HPEC 개최",
            },
            {
              event: "(Hanyang Programming Evaluation Contest)",
            },
          ],
        },
        {
          month: "08",
          details: [
            {
              event: "OOPARTS와 연합 스터디",
            },
          ],
        },

        {
          month: "05",
          details: [
            {
              event: "FORIF MT",
            },
          ],
        },
        {
          month: "04",
          details: [
            {
              event: "노션 특강",
            },
          ],
        },
      ],
    },
    {
      year: 2022,
      events: [
        {
          month: "12",
          details: [
            {
              event: "동아리방 리모델링",
            },
          ],
        },
      ],
    },
    {
      year: 2021,
      events: [
        {
          month: "06",
          details: [
            {
              event: "FORIF 중앙동아리 승격",
            },
          ],
        },
      ],
    },
    {
      year: 2015,
      events: [
        {
          month: "03",
          details: [
            {
              event: "FORIF 창립일",
            },
          ],
        },
      ],
    },
  ],
};

export { galleryImages, howitworks, milestone };
