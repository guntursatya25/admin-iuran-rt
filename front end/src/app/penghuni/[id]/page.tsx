"use client";
import React, { useEffect, useState } from "react";
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
import Image from "next/image";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { BASE_URL_API } from "@/components/constants";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

async function getData(id: string) {
  const res = await fetch(
    BASE_URL_API + "penghuni/" + id
  );
  const datas = await res.json();

  return datas;
}
async function getDataRumah() {
  const res = await fetch(BASE_URL_API + "rumah");
  const data = await res.json();

  return data;
}
const EditPenghuni = ({ params }: { params: { id: string } }) => {
  type Penghuni = {
    penghuni_id: number;
    status_huni: string;
    rumah_id: number;
    nama: string;
    no_tlp: string;
    status_nikah: string;
    foto_ktp: string;
  };
  const [data, setData] = useState<Penghuni | null>(null);
  const router = useRouter();
  type Rumah = {
    rumah_id: number;
  };
  const [dataRumah, setDataRumah] = useState<Rumah[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDataRumah();
      setDataRumah(result);
    };

    fetchData();
  }, []);

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
  const formSchema = z.object({
    nama: z.string().min(2).max(50),
    no_tlp: z.string().min(11).max(13),
    foto_ktp: z.any(),
    rumah_id: z.any(),
    statusPenghuni: z.string(),
    status_nikah: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(params.id);
        setData(result);
        // form.setValue("nama", result?.nama || "");
        // form.setValue("no_tlp", result?.no_tlp || "");
        // form.setValue("statusPenghuni", result?.status_huni || "");
        // form.setValue("status_nikah", result?.status_nikah || "");
        // form.setValue("rumah_id", result?.rumah_id || "");
        form.reset({
          nama: result?.nama || "",
          no_tlp: result?.no_tlp || "",
          statusPenghuni: result?.status_huni || "",
          status_nikah: result?.status_nikah || "",
          rumah_id: result?.rumah_id || "",
        });
        if (result?.foto_ktp) {
          setPreview(
            result?.foto_ktp
              ? `http://127.0.0.1:8000/assets/img/${result.foto_ktp}`
              : null
          );
        }

        console.log("data ", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id, form]);

  const fileRef = form.register("foto_ktp");
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData2 = new FormData();
      formData2.append("namaLengkap", values.nama);
      formData2.append("nomorTelepon", values.no_tlp);
      formData2.append("statusPenghuni", values.statusPenghuni);
      formData2.append("rumah_id", values.rumah_id);
      formData2.append("statusNikah", values.status_nikah);
      if(values.foto_ktp){
        formData2.append("fotoKTP", values.foto_ktp[0]);
      }

      const datanya = {
        rumah_id: values.rumah_id,
        namaLengkap: values.nama,
        nomorTelepon: values.no_tlp,
        statusPenghuni: values.statusPenghuni,
        statusNikah: values.status_nikah,
      };

      // console.log("FormData: ", datanya);
      //   const response = await fetch(BASE_URL_API + "penghuni/" + params.id, {
      //     method: "PUT",
      //     body: formData2,
      //   });

      const response = await axios.put(
        BASE_URL_API + "penghuni/" + params.id,
        datanya
      );
      router.push("/penghuni/list");

      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Edit Penghuni</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 mt-3"
          //   encType="multipart/form-data"
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
                          disabled
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
                      //   value={data?.rumah_id.toString()}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
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
                        <SelectItem value="0">Tidak Ada</SelectItem>
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
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status Penghuni" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="kontrak">Kontrak</SelectItem>
                        <SelectItem value="tetap">Tetap</SelectItem>
                        <SelectItem value="pindah">Pindah</SelectItem>
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
                      {...field}
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

export default EditPenghuni;
