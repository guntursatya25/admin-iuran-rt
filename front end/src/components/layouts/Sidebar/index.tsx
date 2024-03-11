"use client";
import { Button } from "@/components/ui/button";
import React, { FC } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { TbSmartHome } from "react-icons/tb";
import { MdOutlineHouse } from "react-icons/md";
import { useRouter } from "next/navigation";
import { GoPeople } from "react-icons/go";
import { GoDatabase } from "react-icons/go";
import { FaHistory } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { CiCircleList } from "react-icons/ci";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, UserRound } from "lucide-react";
interface SidebarProps {}
const Sidebar: FC<SidebarProps> = ({}) => {
  const router = useRouter();
  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-1 ">
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary "
              onClick={() => router.push("/")}
            >
              <TbSmartHome className="mr-2 text-lg" /> Home
            </Button>
            {/* <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary "
              onClick={() => router.push("/rumah")}
            >
              <MdOutlineHouse className="mr-2 text-lg" /> Rumah
            </Button> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none hover:text-primary"
                >
                  <GoPeople className="mr-2 text-lg" /> Penghuni
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/penghuni/add")}>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Add</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/penghuni/list")}>
                    <CiCircleList className="mr-2 h-4 w-4" />
                    <span>List</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none hover:text-primary"
                >
                  <MdOutlineHouse className="mr-2 text-lg" /> Rumah
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/rumah/add")}>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Add</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/rumah/list")}>
                    <CiCircleList className="mr-2 h-4 w-4" />
                    <span>List</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/data/history-rumah")}>
                    <FaHistory className="mr-2 h-4 w-4" />
                    <span>Riwayat Rumah</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none hover:text-primary"
                >
                  <GiReceiveMoney className="mr-2 text-lg" /> Iuran
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/iuran")}>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Iuran</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/iuran/list")}>
                    <CiCircleList className="mr-2 h-4 w-4" />
                    <span>List</span>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem onClick={() => router.push("/rumah/list")}>
                    <GiReceiveMoney className="mr-2 h-4 w-4" />
                    <span>Iuran</span>
                  </DropdownMenuItem> */}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
          <Button
            variant={"ghost"}
            className="w-full text-red-500 justify-start rounded-none hover:text-red-200 hover:bg-red-500  "
          >
            <AiOutlineLogout className="mr-2 text-lg" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
