import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader, Loader2, LoaderIcon } from "lucide-react";
import { FC } from "react";

const LoaderSpinerVariants = cva("text-muted-foreground animate-spin ", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-3 w-3",
      lg: "h-6 w-6",
      icon: "h-10 w-10",
    },
    defaultVariants: {
      size: "default",
    },
  },
});

interface LoaderSpinerProps extends VariantProps<typeof LoaderSpinerVariants> {}
const LoaderSpiner: FC<LoaderSpinerProps> = ({ size }) => {
  return (
    <>
      <LoaderIcon
        className={cn(LoaderSpinerVariants({ size }), " text-primary ")}
      />
    </>
  );
};

export default LoaderSpiner;
