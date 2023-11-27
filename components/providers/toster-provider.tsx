"use client";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
interface TosterProviderProps {}

const TosterProvider: FC<TosterProviderProps> = ({}) => {
  return <Toaster position="top-center" gutter={5} />;
};

export default TosterProvider;
