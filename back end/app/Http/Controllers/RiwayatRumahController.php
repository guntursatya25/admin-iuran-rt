<?php

namespace App\Http\Controllers;

use App\Models\RiwayatRumah;
use Illuminate\Http\Request;

class RiwayatRumahController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $riwayat = RiwayatRumah::all();
        return response()->json($riwayat);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $riwayat = RiwayatRumah::where("riwayat_id",$id)->get();
        if (!$riwayat) {
            return response()->json(['message' => 'Data riwayat rumah tidak ditemukan'], 404);
        }
        return response()->json($riwayat);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
