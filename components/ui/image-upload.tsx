"use client";

import { FC, useEffect, useState } from "react";
import { Skeleton } from "./skeleton";
import { Button } from "./button";
import { ImagePlus, TrashIcon } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMount) {
    return (
      <>
        <Skeleton className="  aspect-square w-40 h-32" />
        <Skeleton className="   w-40 h-10" />
      </>
    );
  }
  return (
    <>
      <div className="md-4 flex items-center gap-4 flex-row  ">
        {value.map((url) => (
          <div
            className="relative  aspect-square w-40 h-32  rounded-md overflow-hidden "
            key={url}
          >
          
            <div className="  absolute right-2 top-1  ">
              <Button
                onClick={() => onRemove(url)}
                variant={"destructive"}
                size={"icon"}
              >
                <TrashIcon className="h-4 w-4 " />
              </Button>
            </div>
            <Image
              src={url}
              alt="billbord image"
              width={500}
              height={400}
              className="aspect-square w-40 h-32 "
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="xlt40hzr">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant={"secondary"}
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2 " />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default ImageUpload;
