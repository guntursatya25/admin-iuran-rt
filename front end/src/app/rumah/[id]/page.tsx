"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { FC, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { BASE_URL_API } from "@/components/constants";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/Table";

const formSchema = z.object({
  alamat: z.string().min(2).max(50),
});
type Rumah = {
  rumah_id: number;
  penghuni_id: number;
};
type RiwayatData = {
  riwayat_id: number;
  penghuni_id: number;
  rumah_id: number;
  created_at: string;
  updated_at: string;
};
async function getData(id: number) {
  const res = await fetch(BASE_URL_API + "riwayatrumah/"+ id);
  const data = await res.json();

  return data;
}
const EditRumah = ({ params }: { params: { id: number } }) => {
  const [data, setData] = useState<RiwayatData[] | null>(null);
  const columns: ColumnDef<Rumah>[] = [
    {
      accessorKey: "rumah_id",
      header: "NO/ID Rumah",
    },
    {
      accessorKey: "penghuni_id",
      header: "Penghuni ID",
    },
   
  ];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alamat: "",
    },
  });
  const router = useRouter();
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const body = {
        alamat: values.alamat,
        status: "tidakhuni",
      };

      const response = await fetch(BASE_URL_API + "rumah", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      router.push("/rumah/list");
      // const data = await response.json();
      //   console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(params.id);
     
    //   console.log("data2: ", filteredRiwayatData);
      setData(result);
    };

    fetchData();
  }, [params.id]);

//   console.log("data : ", data);
  return (
    <>
      {/* <h1 className="text-3xl font-bold">Edit Rumah</h1> */}
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="w-[50%]">
            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Alamat rumah"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form> */}
      <div className="mt-10">
        <h3 className="font-bold">Riwayat Penghuni Rumah</h3>
        {data && <DataTable columns={columns} data={data} kolom="rumah_id" />}
        {/* <ul>
          {data &&
            data.map((riwayat: any) => (
              <li key={riwayat.riwayat_id}>
                <p>Rumah ID: {riwayat.rumah_id}</p>
                <p>Created At: {riwayat.created_at}</p>
              </li>
            ))}
        </ul> */}
      </div>
    </>
  );
};

export default EditRumah;
