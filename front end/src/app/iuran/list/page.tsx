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
import { BASE_URL_API } from "@/components/constants";
import { useRouter } from "next/navigation";

interface DaftarIuranProps {}

type Payment = {
  id: number;
  penghuni_id: number;
  jenis_iuran: string;
  status_bayar: string;
  jumlah_iuran: string;
  status_uang: string;
};



async function getData() {
  const res = await fetch(BASE_URL_API + "pembayaran");
  const data = await res.json();

  return data;
}

const DaftarIuran: FC<DaftarIuranProps> = ({}) => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "penghuni_id",
      header: "Penghuni ID",
    },
    {
      accessorKey: "jumlah_iuran",
      header: "Nominal",
    },
    {
      accessorKey: "jenis_iuran",
      header: "Jenis Iuran",
    },
    {
      accessorKey: "status_bayar",
      header: "Status Bayar",
    },
    {
      accessorKey: "status_uang",
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
                  onClick={() => {
                    router.push(`/iuran/${data.id}`);
                  }}
                >
                  Edit
                </DropdownMenuItem>
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
      <h1 className="text-3xl font-bold">Daftar Iuran</h1>
      {data && <DataTable columns={columns} data={data} kolom="status_bayar" />}
    </div>
  );
};

export default DaftarIuran;
