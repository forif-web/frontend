"use client";
import { applyDataType, mentorApplyType } from "@/app/types/application";
import { userResponseType } from "@/app/types/user";
import SpinningCircle from "@/components/common/skeleton/spinning-circle";
import { Button } from "@/components/ui/button";
import NoRowsOverlay from "@/components/ui/data-grid/no-row-overlay";
import DialogStyles from "@/components/ui/dialog/dialog.module.css";
import ToastEmitter from "@/hooks/toastEmitter";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowId,
  useGridApiRef,
} from "@mui/x-data-grid";
import * as Dialog from "@radix-ui/react-dialog";
import { Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "학번",
    sortable: false,
    flex: 1,
  },
  {
    field: "name",
    headerName: "이름",
    flex: 1,
  },
  {
    field: "phoneNumber",
    headerName: "전화번호",
    flex: 1,
  },
  {
    field: "intro",
    headerName: "자기 소개",
    sortable: false,
    maxWidth: 550,
    flex: 2,
  },
  {
    field: "career",
    headerName: "경력 사항",
    sortable: false,
    maxWidth: 550,
    flex: 2,
  },
];

export default function ManagementPage() {
  const fetcher = (url: string) => axios.get(url, {}).then((res) => res.data);
  const { data, error, isLoading } = useSWR<userResponseType>(
    "/api/auth/getuser",
    fetcher
  );

  const [applications, setApplications] = useState<mentorApplyType>({
    first: [],
    second: [],
  });

  useEffect(() => {
    async function fetcher() {
      const data: mentorApplyType = await axios
        .get("/api/apply/mentor")
        .then((res) => res.data);
      setApplications(data);
    }
    fetcher();
  }, []);

  const [content, setContent] = useState<applyDataType>({
    id: 0,
    name: "FORIF",
    intro: "2024-1 FORIF",
    career: "없음",
    phoneNumber: "",
  });
  const [open, setOpen] = useState(false);

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setContent({
      id: params.row.id,
      name: params.row.name,
      intro: params.row.intro,
      career: params.row.career,
      phoneNumber: params.row.phoneNumber,
    });
    setOpen(true);
  };

  if (isLoading && !applications) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SpinningCircle message="권한을 불러오는 중입니다..." />
      </div>
    );
  }

  if (data?.userAuthorization === "회원") {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Text size={"6"} weight={"bold"}>
          권한이 없습니다. 관리자에게 문의해주세요.
        </Text>
      </div>
    );
  }

  if (data?.userAuthorization === "운영진" && !applications) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Text size={"6"} weight={"bold"}>
          현재 운영 중인 스터디가 존재하지 않습니다.
        </Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Text size={"6"} weight={"bold"}>
          오류가 발생했습니다. 현재 운영 중인 스터디가 존재하지 않거나, 권한이
          없습니다.
        </Text>
      </div>
    );
  }

  function ApplicationGrid({ priority }: { priority: number }) {
    const [rows, setRows] = useState<applyDataType[]>([]);
    useEffect(() => {
      if (priority === 1 && applications) setRows(applications.first);
      else if (priority === 2 && applications) setRows(applications.second);
    }, []);
    const apiRef = useGridApiRef();

    const removeUsersById = (userIds: GridRowId[]) => {
      setRows((val) => val.filter((user) => !userIds.includes(user.id)));
    };

    async function accept() {
      const selectedRows = apiRef.current.getSelectedRows();
      const selectedIDs = Array.from(selectedRows.keys());

      const res = await axios.post("/api/apply/accept", {
        studyId: data?.myStudy,
        applierIds: selectedIDs,
        applyStatus: "승낙",
      });

      if (res.status === 200) {
        removeUsersById(selectedIDs);
        ToastEmitter({
          type: "success",
          text: "부원 승낙 요청에 성공했습니다!",
        });
      } else {
        ToastEmitter({
          type: "error",
          text: "부원 승낙 요청에 실패했습니다!",
        });
      }
    }

    return (
      <>
        <Text size={"3"} weight={"bold"}>
          신청 인원 :{" "}
          {priority === 1
            ? applications.first.length
            : applications.second.length}
        </Text>
        <DataGrid
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          slots={{ noRowsOverlay: NoRowsOverlay }}
          pageSizeOptions={[5, 10]}
          autoHeight
          checkboxSelection
          sx={{ "--DataGrid-overlayHeight": "300px" }}
          onRowClick={handleRowClick}
          className="mb-5"
          loading={isLoading}
        />
        <Button onClick={accept} size={"lg"}>
          승낙
        </Button>
      </>
    );
  }

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <Text size={"7"} weight={"bold"}>
            스터디 승낙
          </Text>
        </div>
        <div className="flex flex-col w-full">
          <Text size={"5"}>1순위 스터디</Text>
          <Text size={"3"} color="gray" className="mb-3 whitespace-normal">
            멘토님의 스터디를 2순위로 신청한 부원 명단입니다. 반드시 해당
            부원들을 2순위 부원들보다 먼저 선발해주세요. 운영진들이 직접 합격
            문자를 보내야하므로 빠른 시일 내에 승낙 절차를 완료해주세요!
          </Text>
          <div className="w-full">
            <ApplicationGrid priority={1} />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <Text size={"5"}>2순위 스터디</Text>
          <Text size={"3"} color="gray" className="mb-3 whitespace-normal">
            멘토님의 스터디를 2순위로 신청한 부원 명단입니다. 1순위로 신청한
            부원 승낙 이후 여유 인원이 남을 시 승낙해주세요. 운영진들이 직접
            합격 문자를 보내야하므로 빠른 시일 내에 승낙 절차를 완료해주세요!
          </Text>
          <div className="w-full">
            <ApplicationGrid priority={2} />
          </div>
        </div>
      </div>
      <>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className={DialogStyles.DialogOverlay} />
            <Dialog.Content className={DialogStyles.DialogContent}>
              <div className="flex flex-col gap-7">
                <div className="flex justify-between items-center mb-1">
                  <h1 className="text-3xl font-bold">제출한 지원서</h1>
                </div>
                <div>
                  <h1 className="">학번</h1>
                  <p className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                    {content.id}
                  </p>
                </div>
                <div>
                  <h1 className="">이름</h1>
                  <p className="flex h-fit max-w-xl min-h-[40px] rounded-lg border border-input bg-background px-3 py-2 break-all">
                    {content.name}
                  </p>
                </div>
                <div>
                  <h1 className="">전화번호</h1>
                  <p className="flex h-fit max-w-xl min-h-[40px] rounded-lg border border-input bg-background px-3 py-2 break-all">
                    {content.phoneNumber}
                  </p>
                </div>
                <div>
                  <h1 className="">자기 소개</h1>
                  <p className="flex h-fit max-w-xl min-h-[40px] rounded-lg border border-input bg-background px-3 py-2 break-all">
                    {content.intro}
                  </p>
                </div>
                <div>
                  <h1>경력 사항</h1>
                  <p className="flex h-fit max-w-xl min-h-[40px] rounded-lg border border-input bg-background px-3 py-2 break-all">
                    {content.career}
                  </p>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </>
    </div>
  );
}
