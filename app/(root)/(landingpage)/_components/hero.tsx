import Image from "next/image";
import { FC } from "react";

interface HerosProps {}

const Heros: FC<HerosProps> = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center ">
        <div className=" ">
          <Image
            src={"/searching-shoping.-dark.png"}
            width={350}
            height={350}
            alt="seaching  shoping"
            className="  dark:hidden"
          />
          <Image
            src={"/searching-shoping.-dark.png"}
            width={350}
            height={350}
            alt="seaching  shoping"
            className=" hidden dark:block"
          />
        </div>
        <div className="md:block">
          <Image
            src="/statistices.png"
            width={300}
            height={300}
            className=" dark:hidden"
            alt="statistices"
          />
          <Image
            src="/statistices.png"
            width={300}
            height={300}
            className=" hidden dark:block"
            alt="statistices"
          />
        </div>
      </div>
    </div>
  );
};

export default Heros;
