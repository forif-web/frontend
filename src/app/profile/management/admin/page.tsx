"use client";
import { userResponseType } from "@/app/types/user";
import SpinningCircle from "@/components/common/skeleton/spinning-circle";
import { Button } from "@/components/ui/button";
import NoRowsOverlay from "@/components/ui/data-grid/no-row-overlay";
import ToastEmitter from "@/hooks/toastEmitter";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridToolbar,
  useGridApiRef,
} from "@mui/x-data-grid";
import { Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

const payColumns: GridColDef[] = [
  {
    field: "userId",
    headerName: "학번",
    sortable: false,
    maxWidth: 550,
    flex: 2,
  },
  {
    field: "name",
    headerName: "이름",
    sortable: false,
    flex: 1,
  },
  {
    field: "phoneNumber",
    headerName: "전화번호",
    sortable: false,
    flex: 1,
  },
];

type GridPayDef = {
  userId: number;
  name: string;
  phoneNumber: string;
};

export default function ManagementPage() {
  const fetcher = (url: string) => axios.get(url, {}).then((res) => res.data);
  const { data, error, isLoading } = useSWR<userResponseType>(
    "/api/auth/getuser",
    fetcher
  );
  const [isPaid, setIsPaid] = useState<GridPayDef[]>([]);

  useEffect(() => {
    async function fetcher() {
      const data = await axios.get("/api/manage/pay").then((res) => res.data);
      setIsPaid(data);
    }
    fetcher();
  }, []);

  if (isLoading && !isPaid) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SpinningCircle message="권한을 불러오는 중입니다..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Text size={"9"} color="tomato">
          오류가 발생했습니다.
        </Text>
      </div>
    );
  }

  if (
    data?.userAuthorization !== "관리자" &&
    data?.userAuthorization !== "운영진" &&
    !isLoading
  ) {
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
        <Text size={"3"} weight={"bold"}>
          미입금 부원 수 : {isPaid.length}
        </Text>
        <DataGrid
          apiRef={apiRef}
          rows={isPaid}
          getRowId={(row: any) => row.userId}
          columns={payColumns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: GridToolbar, noRowsOverlay: NoRowsOverlay }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          autoHeight
          checkboxSelection
          className="mb-5"
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          loading={isLoading}
          sx={{ "--DataGrid-overlayHeight": "300px" }}
        />

        <Button onClick={accept} size={"lg"}>
          입금 완료
        </Button>
      </>
    );
  }

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <Text size={"7"} weight={"bold"}>
            입금 여부
          </Text>
          <Text size={"3"} color="gray" className="mb-3">
            아래 테이블에서 입금 여부를 확인해주세요. 입금이 완료되었다면 아래
            테이블에 나타나지 않습니다. 만약 '입금 완료' 버튼 클릭 이후에도
            테이블에 변화가 없다면 새로고침 해주세요.
          </Text>
          <div className="w-full">
            <PaymentGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
