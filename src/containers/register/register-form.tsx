"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import handleSignUp from "@/hooks/api/handleSignUp";
import ToastEmitter from "@/hooks/toastEmitter";
import { HYU_DEPARTMENTS } from "@/lib/default_form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import z from "zod";
const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "이름은 2글자 이상이어야 합니다." })
    .max(20, { message: "이름은 20글자 이하여야 합니다." }),
  userId: z.string().transform((val, ctx) => {
    if (val.length !== 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "학번은 10자리여야 합니다.",
      });
    }
    return val;
  }),
  department: z.string().min(1, { message: "학과를 선택해주세요." }),
});

export default function RegisterForm() {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      userId: "",
      department: "",
    },
  });

  //submit 버튼 클릭시
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await handleSignUp({
        id_token: session?.user.token.id_token,
        username: data.username,
        userId: data.userId,
        department: data.department,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
      ToastEmitter({ type: "success", text: "회원가입 실패!" });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder="이름을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="userId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>학번</FormLabel>
              <FormControl>
                <Input placeholder="학번을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="department"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>학과</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="학과를 선택해주세요." />
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
        <div className="h-8" />
        <Button type="submit">회원가입</Button>
      </form>
    </Form>
  );
}
