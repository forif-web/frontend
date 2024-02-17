import { sourceCodePro } from "@/app/fonts/fonts";

export default function PromotionalText() {
  return (
    <h1
      className={`md:text-3xl text-2xl text-black transition-all flex flex-col gap-5 justify-start ${sourceCodePro.className}`}
    >
      <div className="flex md:flex-row flex-col items-center">
        <span className={`md:text-5xl text-forif`}>FOR&nbsp;</span>
        함께 성장하고 싶은 누구나
      </div>
      <div className="flex md:flex-row flex-col items-center">
        <span className={`md:text-5xl text-forif`}>IF&nbsp;&nbsp;</span>
        프로그래밍에 관심 있다면
      </div>
      <div className="flex md:flex-row flex-col items-center md:hidden">
        <span className={`md:text-5xl text-forif`}>return&nbsp;&nbsp;</span>
        HELLO FORIF!
      </div>
      <div className="hidden md:block">
        return&nbsp;
        <span className={`text-forif md:text-5xl font-bold`}>FORIF</span>;
      </div>
    </h1>
  );
}
