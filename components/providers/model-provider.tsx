"use client";

import { FC, useState, useEffect } from "react";
import StoreModel from "../models/store-model";

interface ModelProviderProps {}

const ModelProvider: FC<ModelProviderProps> = ({}) => {
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);
  if (!isMount) {
    return null;
  }
  return (
    <>
      <StoreModel />
    </>
  );
};

export default ModelProvider;
