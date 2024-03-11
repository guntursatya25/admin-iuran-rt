<?php

namespace App\Http\Controllers;

use App\Models\Penghuni;
use App\Models\RiwayatRumah;
use App\Models\Rumah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PenghuniController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $penghuni = Penghuni::all();
        return response()->json($penghuni);
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
        // Log::info($request->all());

        $validator = Validator::make($request->all(), [
            'namaLengkap' => 'required|string|max:255',
            'fotoKTP' => 'required|image',
            'statusPenghuni' => 'required|in:kontrak,tetap',
            'nomorTelepon' => 'required|string|max:15',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $rumah = $request->rumah_id;
        $penghuni = new Penghuni();
        $penghuni->rumah_id = $rumah;
        $penghuni->nama = $request->namaLengkap;
        // $nama_gambar = $request->file('fotoKTP')->getClientOriginalName();
        $fotoKTPPath = $request->file('fotoKTP')->storeAs('foto_ktp', $request->namaLengkap);
        $penghuni->foto_ktp = $fotoKTPPath;
        $penghuni->status_huni = $request->statusPenghuni;
        $penghuni->no_tlp = $request->nomorTelepon;
        $penghuni->status_nikah = $request->statusNikah;
        $penghuni->save();

        $rumah = Rumah::find($request->rumah_id);
        $rumah->status = 'terhuni';
        $rumah->save();
        // $penghuni->rumah->rumah_id;
        // $penghuni->rumah->status = 'terhuni';
        // $penghuni->rumah->save();
        
        $riwayatRumah = new RiwayatRumah();
        $riwayatRumah->penghuni_id = $penghuni->penghuni_id;
        $riwayatRumah->rumah_id = $penghuni->rumah_id;
        $riwayatRumah->save();
        return response()->json(['message' => 'Data rumah berhasil ditambahkan'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $penghuni = Penghuni::find($id);
        if (!$penghuni) {
            return response()->json(['message' => 'Data penghuni tidak ditemukan'], 404);
        }
        return response()->json($penghuni);
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
    public function update(string $id, Request $request )
    {
        // Log::info($request->all());
        $request->validate([
            'namaLengkap' => 'required|string|min:2|max:50',
            'nomorTelepon' => 'required|string|min:11|max:13',
            'statusPenghuni' => 'required|string',
            'rumah_id' => 'required',
            'fotoKTP' => 'image',
            'statusNikah' => 'required|string',
        ]);

        $penghuni = Penghuni::where('penghuni_id', $id)->first();
        if (!$penghuni) {
            return response()->json(['message' => 'Data rumah tidak ditemukan'], 404);
        }
        $penghuni->nama = $request->namaLengkap;
        // $nama_gambar = $request->file('fotoKTP')->getClientOriginalName();
        if ($request->hasFile('fotoKTP')) {
        $penghuni->foto_ktp = $request->file('fotoKTP')->storeAs('foto_ktp', $request->namaLengkap);
            $previousFotoKTP = $penghuni->foto_ktp;
            if ($previousFotoKTP) {
                Storage::delete($previousFotoKTP);
            }
        }
        $penghuni->rumah_id = $request->rumah_id;
        $penghuni->status_huni = $request->statusPenghuni;
        $penghuni->no_tlp = $request->nomorTelepon;
        $penghuni->status_nikah = $request->statusNikah;
        $penghuni->save();

        $riwayatRumah = new RiwayatRumah();
        $riwayatRumah->penghuni_id = $penghuni->penghuni_id;
        $riwayatRumah->rumah_id = $penghuni->rumah_id;
        $riwayatRumah->save();

        return response()->json(['message' => 'Data penghuni berhasil diupdate'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $penghuni = Penghuni::findOrFail($id);
        if (!$penghuni) {
            return response()->json(['message' => 'Data penghuni tidak ditemukan'], 404);
        }
        $previousFotoKTP = $penghuni->foto_ktp;
        if ($previousFotoKTP) {
            Storage::delete($previousFotoKTP);
        }

        $rumah = Rumah::find($penghuni->rumah_id);
        $rumah->status = 'terhuni';
        $rumah->save();

        $penghuni->delete();
        return response()->json(['message' => 'Data penghuni berhasil dihapus'], 200);
    }

    public function getPenghuni()
    {
        $penghuni = Penghuni::whereIn('status_huni', ['kontrak', 'tetap'])->get();
        return response()->json($penghuni);
    }
}
