"use client";
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
import { useRouter } from "next/navigation";
import AlertsDelete from "@/components/layouts/components/alertsDelete";
import axios from "axios";
import { BASE_URL_API } from "@/components/constants";

interface ListPenghuniProps {}

type Penghuni = {
  rumah_id: number;
  penghuni_id: number;
  status_huni: string;
  nama: string;
};

async function getData() {
  const res = await fetch(BASE_URL_API + "penghuni");
  const data = await res.json();

  return data;
}
const ListPenghuni: FC<ListPenghuniProps> = ({}) => {
  const router = useRouter();

  const [data, setData] = useState(null);
  const columns: ColumnDef<Penghuni>[] = [
    {
      accessorKey: "penghuni_id",
      header: "Penghuni ID",
    },
    {
      accessorKey: "nama",
      header: "Nama",
    },
    {
      accessorKey: "rumah_id",
      header: "NO/ID Rumah",
    },
    {
      accessorKey: "status_huni",
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
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/penghuni/${data.penghuni_id}`);
                }}
              >
                Edit
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => handleDelete(data.penghuni_id)}>
                Delete
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const handleDelete = (penghuniId: number) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");

    if (shouldDelete) {
      deleteData(penghuniId);
    }
  };

  const deleteData = async (id: number) => {
    try {
      await axios.delete(
        `${BASE_URL_API}penghuni/${id}`
      );
      router.refresh();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">List Penghuni</h1>
        {data && <DataTable columns={columns} data={data} kolom="nama" />}
      </div>
    </>
  );
};

export default ListPenghuni;
