<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAcabadoRequest;
use App\Http\Requests\UpdateAcabadoRequest;
use App\Models\Acabado;
use App\Models\Coleccion;
use Inertia\Inertia;

class AcabadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filas = Acabado::all();
        if (!$filas->isEmpty()) {
            $campos = $filas[0]->getFillable();
            $datos=true;
        }else{
            $campos=[];
            $datos=false;
        }
        $tabla="acabados";
        return Inertia::render('Admin/Acabados/Index', compact('tabla','campos','filas','datos'));

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        info("AcabadoController => create");
        $colecciones=Coleccion::all();
        $colores=config("colores");
        return Inertia::render('Admin/Acabados/Create', compact('colecciones','colores'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAcabadoRequest $request)
    {
        $acabado = new Acabado($request->input());
        $acabado->save();
        return redirect (route('acabados.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Acabado $acabado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Acabado $acabado)
    {
        info("AcabadoController => create");
        info ($acabado);
        $colecciones=Coleccion::all();
        $colores=config("colores");
        return Inertia::render('Admin/Acabados/Edit',['fila'=>$acabado,'nombre'=>"acabados",'colecciones'=>$colecciones,'colores'=>$colores]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAcabadoRequest $request, Acabado $acabado)
    {
        $datos = $request->input();
        $acabado->update($datos);
        return redirect (route('acabados.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Acabado $acabado)
    {
        $acabado->delete();
        return redirect (route('acabados.index'));
    }
}
