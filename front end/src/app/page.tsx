"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BASE_URL_API } from "@/components/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Ringkasan Iuran Setahun",
    },
  },
};
export const options2 = {
  responsive: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Ringkasan Saldo Sisa Setahun",
    },
  },
};

export default function Home() {
  const [chartData, setChartData] = useState(null);
  const [saldo, setSaldo] = useState(null);
  const [saldo2, setSaldo2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL_API + "getdatachart");
        const data = await response.json();
        const response2 = await fetch(BASE_URL_API + "getsaldo");
        const data2 = await response2.json();
        setChartData(data);
        setSaldo(data2);
        const sisaSaldoData = data.datasets[0].data.map(
          (pemasukan: any, index) => {
            const pengeluaran = data.datasets[1].data[index];
            return pemasukan - pengeluaran;
          }
        );

        // Update data dengan label 'Sisa Saldo' dan data sisa saldo yang telah dihitung
        const updatedSaldoData: any = {
          labels: data.labels,
          datasets: [
            {
              label: "Sisa Saldo",
              data: sisaSaldoData,
              backgroundColor: "rgba(75, 192, 192, 0.5)", // Ganti warna latar sesuai keinginan
            },
          ],
        };
        setSaldo2(updatedSaldoData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="w-[30%]">
        <Card>
          <CardHeader>
            <CardTitle>Saldo</CardTitle>
            <CardDescription>Sisa Saldo Keseluruhan</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {saldo?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-3 w-full h-auto">
        {saldo2 && (
          <Bar className="mt-2" options={options2} data={saldo2} width={700} height={300} />
        )}
         {chartData && (
          <Bar options={options} data={chartData} width={700} height={300} />
        )}
      </div>
    </>
  );
}
