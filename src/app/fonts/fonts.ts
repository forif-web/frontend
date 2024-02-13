import { Abel, Source_Code_Pro } from "next/font/google";
import localFont from "next/font/local";

export const Pretendard = localFont({
  src: "./PretendardVariable.woff2",
});

export const abel = Abel({ weight: "400", subsets: ["latin"] });
export const sourceCodePro = Source_Code_Pro({
  weight: "variable",
  subsets: ["latin", "latin-ext"],
});

export default { Pretendard, abel, sourceCodePro };
