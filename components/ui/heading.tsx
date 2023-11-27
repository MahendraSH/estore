import { IconProps } from "@radix-ui/react-icons/dist/types";
import { LucideIcon } from "lucide-react";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";

interface HeadingProps {
  title: string;
  description: string;
  icon?:
    | LucideIcon
    | ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}

const Heading: FC<HeadingProps> = ({ title, description, icon: Icon }) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold  tracking-tighter flex gap-x-2">
        <div className="  w-8 h-8 bg-primary/70 rounded-full items-center text-center flex justify-center ">
          {Icon && <Icon className=" h-5 w-5 " />}
        </div>
        {title}
      </h2>
      <p className=" text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
