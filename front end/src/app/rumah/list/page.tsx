"use client"
import { useEffect, useState } from "react";
import { DataTable } from "@/components/Table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import React, { FC } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { BASE_URL_API } from "@/components/constants";
import { useRouter } from "next/navigation";

interface ListRumahProps {}

type Rumah = {
  rumah_id: number;
  status: string;
}
const columns: ColumnDef<Rumah>[] =[
  {
    accessorKey: "rumah_id",
    header: "NO/ID Rumah",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.status)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

async function getData() {
  const res = await fetch(BASE_URL_API + "rumah");
  const data = await res.json();

  return data;
}

const ListRumah: FC<ListRumahProps> = () => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const columns: ColumnDef<Rumah>[] =[
    {
      accessorKey: "rumah_id",
      header: "NO/ID Rumah",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(data.status)}
              >
                Copy payment ID
              </DropdownMenuItem> */}
              <DropdownMenuItem onClick={() => router.push(`/rumah/${data.rumah_id}`)}>View</DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []); 

  return (
    <div>
      <h1 className="text-3xl font-bold">List Rumah</h1>
      {data && <DataTable columns={columns} data={data} kolom="status" />}
    </div>
  );
};

export default ListRumah;
