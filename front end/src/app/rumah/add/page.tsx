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
import React, { FC } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { BASE_URL_API } from "@/components/constants";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  alamat: z.string().min(2).max(50),
});

interface addRumahProps {}

const AddRumah: FC<addRumahProps> = ({}) => {
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
  return (
    <div>
      <h1 className="text-3xl font-bold">Add Rumah</h1>
      <Form {...form}>
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
      </Form>
    </div>
  );
};

export default AddRumah;
