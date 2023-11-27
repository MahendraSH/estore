import { FC } from "react";
import BillbordClient from "./_components/billbord-client";

interface BillbordsPageProps {}

const BillbordsPage: FC<BillbordsPageProps> = ({}) => {
  return (
    <div className="flex flex-col  ">
      <div className=" flex-1 space-y-4 p-8 pt-6 ">
        <BillbordClient />
      </div>
    </div>
  );
};

export default BillbordsPage;
