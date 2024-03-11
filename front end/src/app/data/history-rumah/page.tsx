"use client"
import { DataTable } from '@/components/Table';
import React, { FC, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { BASE_URL_API } from '@/components/constants';


interface HistoryRumahProps {
  
}

async function getData() {
  const res = await fetch(BASE_URL_API + "riwayatrumah");
  const data = await res.json();
  return data;
}

type Riwayat = {
    penghuni_id: number;
    rumah_id: number;
  }
  export const columns: ColumnDef<Riwayat>[] = [
    {
      accessorKey: "rumah_id",
      header: "NO/ID Rumah",
    },
    {
      accessorKey: "penghuni_id",
      header: "Penghuni ID",
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
               
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

const HistoryRumah: FC<HistoryRumahProps> = ({  }) => {
    const [data, setData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        const result = await getData();
        setData(result);
      }
      fetchData();
    }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">History Penghuni Rumah</h1>
      {data && <DataTable columns={columns} data={data} kolom="rumah_id" />}
    </div>
  )
}

export default HistoryRumah;