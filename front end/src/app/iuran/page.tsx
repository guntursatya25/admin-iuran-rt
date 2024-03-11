"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BASE_URL_API } from "@/components/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface TambahIuranProps {}

async function getData() {
  const res = await fetch(BASE_URL_API + "getpenghuni");
  const data = await res.json();
  return data;
}

const TambahIuran: FC<TambahIuranProps> = ({}) => {
  type Penghuni = {
    penghuni_id: number;
  };
  const [dataPenghuni, setDataPenghuni] = useState<Penghuni[] | null>(null);

  const formSchema = z.object({
    penghuni_id: z.string(),
    nominal: z.string({
      required_error: "Nominal harus diisi",
    }),
    jenis_iuran: z.string().refine((val) => val.length > 0, {
      message: "Harus Pilih Jenis Iuran",
    }),
    status_bayar: z.string().refine((val) => val.length > 0, {
      message: "Harus Pilih Status Bayar",
    }),
    status_uang: z.string().refine((val) => val.length > 0, {
      message: "Harus Pilih Status Uang",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      penghuni_id: "",
      nominal: "0",
      jenis_iuran: "",
      status_bayar: "",
      status_uang: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const body = {
        penghuni_id: values.penghuni_id,
        jumlah_iuran: values.nominal,
        status_bayar: values.status_bayar,
        jenis_iuran: values.jenis_iuran,
        status_uang: values.status_uang,
      };

      const response = await fetch(BASE_URL_API + "pembayaran", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      //   router.push("/rumah/list");
      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setDataPenghuni(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Tambah Iuran</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 mt-4"
        >
          <div className="flex">
            <div className="w-[50%] px-3 space-y-3">
              <FormField
                control={form.control}
                name="penghuni_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Penghuni ID</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih NO/ID Rumah" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dataPenghuni &&
                          dataPenghuni.map(
                            (item: { penghuni_id: number }, index: number) => (
                              <SelectItem
                                key={index}
                                value={item.penghuni_id.toString()}
                              >
                                {item.penghuni_id}
                              </SelectItem>
                            )
                          )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nominal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nominal</FormLabel>
                    <FormControl>
                      <Input placeholder="nominal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[50%] px-3 space-y-3">
              <FormField
                control={form.control}
                name="jenis_iuran"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Iuran</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Iuran" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bulanan">Bulanan</SelectItem>
                        <SelectItem value="tahunan">Tahunan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status_bayar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Bayar</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status Bayar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="lunas">Lunas</SelectItem>
                        <SelectItem value="belum">Belum</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status_uang"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status Uang" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="masuk">Pemasukan</SelectItem>
                        <SelectItem value="keluar">Pengeluaran</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="px-3">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
      <div className="mt-3 px-3">
        <p >Nb:</p>
        <p>-Jika ingin menambah pemasukkan wajib isi penghuni id</p>
        <p>-Jika ingin menambah pengeluaran wajib kosongkan penghuni id</p>
      </div>
    </div>
  );
};

export default TambahIuran;
