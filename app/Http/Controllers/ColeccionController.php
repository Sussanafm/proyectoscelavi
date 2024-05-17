<?php

namespace App\Http\Controllers;

use App\Models\Coleccion;
use App\Http\Requests\StoreColeccionRequest;
use App\Http\Requests\UpdateColeccionRequest;
use Inertia\Inertia;
use mysql_xdevapi\Collection;

class ColeccionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filas = Coleccion::all();
        if (!$filas->isEmpty()) {
            $campos = $filas[0]->getFillable();
            $datos=true;
        }else{
            $campos=[];
            $datos=false;
        }
        $tabla="colecciones";
        return Inertia::render('Admin/Colecciones/Index', compact('tabla','campos','filas','datos'));

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        info("ColeccionController => create");
        $formatos=config("formatos");
        $thickness=config("thickness");
        $wearlayer=config("wearlayer");
        return Inertia::render('Admin/Colecciones/Create', compact('formatos','thickness','wearlayer'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreColeccionRequest $request)
    {
        $coleccion = new Coleccion($request->input());
        $coleccion->save();
        return redirect (route('colecciones.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Coleccion $coleccion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Coleccion $coleccion)
    {
        info("ColeccionController => create");
        info ($coleccion);
        $formatos=config("formatos");
        $thickness=config("thickness");
        $wearlayer=config("wearlayer");
        return Inertia::render('Admin/Colecciones/Edit',['fila'=>$coleccion,'nombre'=>"colecciones",'formatos'=>$formatos,'thickness'=>$thickness,'wearlayer'=>$wearlayer]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateColeccionRequest $request, Coleccion $coleccion)
    {
        $datos = $request->input();
        $coleccion->update($datos);
        return redirect (route('colecciones.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coleccion $coleccion)
    {
        $coleccion->delete();
        return redirect (route('colecciones.index'));
    }
}
