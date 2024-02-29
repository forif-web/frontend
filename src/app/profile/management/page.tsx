"use client";
import { applyDataType, mentorApplyType } from "@/app/types/application";
import { userResponseType } from "@/app/types/user";
import SpinningCircle from "@/components/common/skeleton/spinning-circle";
import { Button } from "@/components/ui/button";
import ToastEmitter from "@/hooks/toastEmitter";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  useGridApiRef,
} from "@mui/x-data-grid";
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
    field: "isPaid",
    headerName: "입금 여부",
    flex: 1,
  },
  {
    field: "intro",
    headerName: "자기 소개",
    sortable: false,
    flex: 2,
  },
  {
    field: "career",
    headerName: "경력 사항",
    sortable: false,
    flex: 2,
  },
];

const payColumns: GridColDef[] = [
  {
    field: "userId",
    headerName: "학번",
    sortable: false,
    flex: 1,
  },
  {
    field: "phoneNumber",
    headerName: "전화번호",
    sortable: false,
    width: 500,
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
  const [isPaid, setIsPaid] = useState<any[]>([]);

  useEffect(() => {
    async function fetcher() {
      const data: mentorApplyType = await axios
        .get("/api/apply/mentor")
        .then((res) => res.data);
      setApplications(data);
    }
    async function payment() {
      const data = await axios.get("/api/manage/pay").then((res) => res.data);
      setIsPaid(data);
    }
    fetcher();
    payment();
  }, []);

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
  function PaymentGrid() {
    const apiRef = useGridApiRef();

    const removeUsersById = (userIds: GridRowId[]) => {
      setIsPaid((val) => val.filter((user) => !userIds.includes(user.userId)));
    };

    async function accept() {
      const selectedRows = apiRef.current.getSelectedRows();
      const selectedIDs = Array.from(selectedRows.keys());
      const data = await axios.patch("/api/manage/pay", {
        applierIds: selectedIDs,
        isPaid: true,
      });

      if (data.status === 200) {
        removeUsersById(selectedIDs);
        ToastEmitter({
          type: "success",
          text: "입금 여부 변경에 성공했습니다!",
        });
      } else {
        ToastEmitter({
          type: "error",
          text: "입금 여부 변경에 실패했습니다!",
        });
      }
    }

    return (
      <>
        {isPaid && (
          <DataGrid
            apiRef={apiRef}
            rows={isPaid}
            getRowId={(row: any) => row.userId}
            columns={payColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            autoHeight
            checkboxSelection
            className="mb-5"
          />
        )}

        <Button onClick={accept} size={"lg"}>
          입금 완료
        </Button>
      </>
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
          text: "입금 여부 변경에 성공했습니다!",
        });
      } else {
        ToastEmitter({
          type: "error",
          text: "입금 여부 변경에 실패했습니다!",
        });
      }

      console.log(selectedIDs);
    }

    return (
      <>
        {rows && (
          <DataGrid
            apiRef={apiRef}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            autoHeight
            checkboxSelection
            className="mb-5"
          />
        )}

        <Button onClick={accept} size={"lg"}>
          승낙
        </Button>
      </>
    );
  }

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col gap-8">
        {data?.userAuthorization === "운영진" ||
          (data?.userAuthorization === "관리자" && (
            <>
              <div className="flex flex-col">
                <Text size={"7"} weight={"bold"}>
                  입금 여부
                </Text>
                <Text size={"3"} color="gray">
                  아래 테이블에서 입금 여부를 확인해주세요. 입금이 완료되었다면
                  아래 테이블에 나타나지 않습니다. 만약 '변경' 버튼 클릭
                  이후에도 테이블에 변화가 없다면 새로고침 해주세요.
                </Text>
                <div className="w-full">
                  <PaymentGrid />
                </div>
              </div>
            </>
          ))}
        <div className="flex flex-col">
          <Text size={"7"} weight={"bold"}>
            스터디 승낙
          </Text>
          <Text size={"3"} color="tomato">
            반드시 입금 여부를 확인하고 승낙해주시기 바랍니다.
          </Text>
        </div>
        <div className="flex flex-col w-full">
          <Text size={"5"}>1순위 스터디</Text>
          <Text size={"3"} color="gray" className="mb-3 whitespace-normal">
            멘토님의 스터디를 2순위로 신청한 부원 명단입니다. 반드시 해당
            부원들을 2순위 부원들보다 먼저 선발해주세요. 아직 개발 미흡으로 자기
            소개에 커서를 올려놔야지만 전체 글이 보입니다. 양해 부탁드립니다.
          </Text>
          <div className="w-full">
            <ApplicationGrid priority={1} />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <Text size={"5"}>2순위 스터디</Text>
          <Text size={"3"} color="gray" className="mb-3 whitespace-normal">
            멘토님의 스터디를 2순위로 신청한 부원 명단입니다. 1순위로 신청한
            부원 승낙 이후 여유 인원이 남을 시 승낙해주세요.아직 개발 미흡으로
            자기 소개에 커서를 올려놔야지만 전체 글이 보입니다. 양해
            부탁드립니다.
          </Text>
          <div className="w-full">
            <ApplicationGrid priority={2} />
          </div>
        </div>
      </div>
    </div>
  );
}
