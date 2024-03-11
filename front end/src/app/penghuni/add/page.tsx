"use client";
import { BASE_URL_API } from "@/components/constants";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddPenghuniProps {}

async function getData() {
  const res = await fetch(BASE_URL_API + "rumah");
  const data = await res.json();

  return data;
}
const AddPenghuni: FC<AddPenghuniProps> = ({}) => {
  const router = useRouter();
  type Rumah = {
    rumah_id: number;
  };
  const [dataRumah, setDataRumah] = useState<Rumah[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setDataRumah(result);
    };

    fetchData();
  }, []);

  const formSchema = z.object({
    nama: z.string().min(2).max(50),
    no_tlp: z.string().min(11).max(13),
    foto_ktp: z
      .any()
      .refine((file) => file?.length == 1, "File is required.")
      .refine(
        (file) =>
          file[0]?.type === "image/png" ||
          file[0]?.type === "image/jpeg" ||
          file[0]?.type === "image/jpg",
        "Must be a png, jpeg or jpg."
      )
      .refine((file) => file[0]?.size <= 5000000, `Max file size is 5MB.`),
    rumah_id: z.string().refine((val) => val.length > 0, {
      message: "Harus Pilih Rumah",
    }),
    statusPenghuni: z.string().refine((val) => val.length > 0, {
      message: "Harus Pilih Status Huni",
    }),
    status_nikah: z.string().refine((val) => val.length > 0, {
      message: "Harus Pilih Status Pernikahan",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      no_tlp: "",
      foto_ktp: "",
      rumah_id: "",
      statusPenghuni: "",
      status_nikah: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("namaLengkap", values.nama);
      formData.append("nomorTelepon", values.no_tlp);
      formData.append("fotoKTP", values.foto_ktp[0]);
      formData.append("statusPenghuni", values.statusPenghuni);
      formData.append("rumah_id", values.rumah_id);
      formData.append("statusNikah", values.status_nikah);

      const response = await fetch(BASE_URL_API + "penghuni", {
        method: "POST",
        body: formData,
      });
      router.push("/penghuni/list");
      //   const data = await response.json();
      //   console.log("Response:", formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fileRef = form.register("foto_ktp");
  const [preview, setPreview] = useState<string | null>(null);
  const handFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold">Add Penghuni</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 mt-3"
        >
          <div className="flex">
            <div className="w-[50%] px-2 space-y-3">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="no_tlp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="No Telepon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="foto_ktp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Foto KTP</FormLabel>
                      <FormControl>
                        <Input
                          id="picture"
                          type="file"
                          {...fileRef}
                          onChange={handFileChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {preview && (
                  <div className="mt-2">
                    <Image
                      src={preview}
                      alt="preview"
                      width={200}
                      height={200}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="w-[50%] px-2 space-y-3">
              <FormField
                control={form.control}
                name="rumah_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NO/ID Rumah</FormLabel>
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
                        {dataRumah &&
                          dataRumah.map(
                            (item: { rumah_id: number }, index: number) => (
                              <SelectItem
                                key={index}
                                value={item.rumah_id.toString()}
                              >
                                {item.rumah_id}
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
                name="statusPenghuni"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Penghuni</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status Penghuni" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="kontrak">Kontrak</SelectItem>
                        <SelectItem value="tetap">Tetap</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status_nikah"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Pernikahan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status Pernikahan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sudah">Sudah</SelectItem>
                        <SelectItem value="belum">Belum</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddPenghuni;
