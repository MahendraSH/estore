"use client";

import UseStoreModel from "@/hooks/use-store-model";
import { FC, useEffect } from "react";

interface CreateStorePageProps {}

const CreateStorePage: FC<CreateStorePageProps> = ({}) => {
  const isOpen = UseStoreModel((state) => state.isOpen);
  const onOpen = UseStoreModel((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return <div className="p-6 ">CreateStorePage</div>;
};

export default CreateStorePage;
