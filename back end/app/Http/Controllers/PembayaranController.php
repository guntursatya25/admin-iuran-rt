<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Http\Requests\UpdatePembayaranRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class PembayaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payment = Pembayaran::all();
        return response()->json($payment);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info($request->all());

        $validator = Validator::make($request->all(), [
            'jumlah_iuran' => 'required',
            'jenis_iuran' => 'required|in:bulanan,tahunan',
            'status_bayar' => 'required',
            'status_uang' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $iuran = new Pembayaran();
        $iuran->status_uang = $request->status_uang;
        $iuran->penghuni_id = $request->penghuni_id;
        $iuran->jumlah_iuran = $request->jumlah_iuran;
        $iuran->jenis_iuran = $request->jenis_iuran;
        $iuran->status_bayar = $request->status_bayar;
        $iuran->save();

        return response()->json(['message' => 'Data pembayaran berhasil ditambahkan'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $penghuni = Pembayaran::find($id);
        if (!$penghuni) {
            return response()->json(['message' => 'Data pembayaran tidak ditemukan'], 404);
        }
        return response()->json($penghuni);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pembayaran $pembayaran)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $id, Request $request)
    {
        $payment = Pembayaran::where('id', $id)->first();
        if (!$payment) {
            return response()->json(['message' => 'Data iuran tidak ditemukan'], 404);
        }
        $payment->status_uang = $request->status_uang;
        $payment->penghuni_id = $request->penghuni_id;
        $payment->jumlah_iuran = $request->jumlah_iuran;
        $payment->jenis_iuran = $request->jenis_iuran;
        $payment->status_bayar = $request->status_bayar;
        $payment->save();
        return response()->json(['message' => 'Data iuran berhasil diupdate'], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pembayaran $pembayaran)
    {
        //
    }

    public function getSaldo(){
        $pemasukan = Pembayaran::where('status_uang', 'masuk')->sum('jumlah_iuran');
        $pengeluaran = Pembayaran::where('status_uang', 'keluar')->sum('jumlah_iuran');
        $saldo = $pemasukan - $pengeluaran;
        return response()->json($saldo);
    }
    public function getChartData()
    {
        $pemasukanData = Pembayaran::where('status_uang', 'masuk')
            ->where('status_bayar', 'lunas')
            ->selectRaw('SUM(jumlah_iuran) as total, MONTH(updated_at) as month')
            ->groupByRaw('MONTH(updated_at)')
            ->pluck('total', 'month')
            ->toArray();

        $pengeluaranData = Pembayaran::where('status_uang', 'keluar')
            ->where('status_bayar', 'lunas')
            ->selectRaw('SUM(jumlah_iuran) as total, MONTH(updated_at) as month')
            ->groupByRaw('MONTH(updated_at)')
            ->pluck('total', 'month')
            ->toArray();

        $labels = array_map(function ($month) {
            return Carbon::create(null, $month)->format('F');
        }, range(1, 12));

        $formattedPemasukanData = [];
        $formattedPengeluaranData = [];

        foreach ($labels as $key => $month) {
            $formattedPemasukanData[] = $pemasukanData[$key + 1] ?? 0;
            $formattedPengeluaranData[] = $pengeluaranData[$key + 1] ?? 0;
        }

        return response()->json([
            'labels' => $labels,
            'datasets' => [
                [
                    'label' => 'Pemasukan',
                    'data' => $formattedPemasukanData,
                    'backgroundColor' => 'rgba(255, 99, 132, 0.5)',
                ],
                [
                    'label' => 'Pengeluaran',
                    'data' => $formattedPengeluaranData,
                    'backgroundColor' => 'rgba(53, 162, 235, 0.5)',
                ],
            ],
        ]);
    }
}
