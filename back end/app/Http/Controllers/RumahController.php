<?php

namespace App\Http\Controllers;

use App\Models\Rumah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class RumahController extends Controller
{

    public function index()
    {
        $rumah = Rumah::all();
        return response()->json($rumah);
    }

    public function create()
    {
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'alamat' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $rumah = new Rumah();
        $rumah->alamat = $request->alamat;
        $rumah->status = $request->status;
        $rumah->save();

        return response()->json(['message' => 'Data rumah berhasil ditambahkan'], 201);
    }

    public function edit(string $id)
    {
    }

    public function show($id)
    {
        $rumah = Rumah::find($id);
        if (!$rumah) {
            return response()->json(['message' => 'Data rumah tidak ditemukan'], 404);
        }
        return response()->json($rumah);
    }

    public function update(Request $request, $id)
    {
        $rumah = Rumah::find($id);
        if (!$rumah) {
            return response()->json(['message' => 'Data rumah tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'alamat' => 'string|max:255',
            'status' => 'in:dihuni,tidak dihuni',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $rumah->alamat = $request->alamat ?? $rumah->alamat;
        $rumah->status = $request->status ?? $rumah->status;
        $rumah->save();

        return response()->json(['message' => 'Data rumah berhasil diperbarui'], 200);
    }

    public function destroy($id)
    {
        $rumah = Rumah::find($id);
        if (!$rumah) {
            return response()->json(['message' => 'Data rumah tidak ditemukan'], 404);
        }

        $rumah->delete();
        return response()->json(['message' => 'Data rumah berhasil dihapus'], 200);
    }
}
