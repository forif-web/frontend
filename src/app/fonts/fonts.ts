import { Abel } from "next/font/google";
import localFont from "next/font/local";

export const Pretendard = localFont({
  src: "./PretendardVariable.woff2",
});

export const abel = Abel({ weight: "400", subsets: ["latin"] });

export default { Pretendard, abel };
