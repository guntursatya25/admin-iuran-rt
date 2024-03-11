"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { FaPlus } from "react-icons/fa";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <div className="pb-3 mb-8 border-b border-border flex flex-row items-center justify-between">
      <div>
        <div>Company</div>
        <div>Twitter</div>
      </div>
      <div>
        <Button variant={"default"}>
          <FaPlus className="mr-3" />
          Post a Job
        </Button>
      </div>
    </div>
  );
};

export default Header;
