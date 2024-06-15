<?php

namespace App\Http\Controllers;

use App\Models\Coleccion;
use App\Http\Requests\StoreColeccionRequest;
use App\Http\Requests\UpdateColeccionRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
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
            $columnas = Coleccion::getColumnNames();
            $datos=true;
        }else{
            $campos=[];
            $columnas=[];
            $datos=false;
        }
        $tabla="colecciones";
        return Inertia::render('Admin/Colecciones/Index', compact('tabla','campos','filas','datos','columnas'));

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
        $validatedData = $request->validated();
        $coleccion = new Coleccion($validatedData);


        if ($request->hasFile('imagen')) {
            $imagen= $request->file('imagen');

            // Obtener la extensión original de la imagen
            $extension = $imagen->getClientOriginalExtension();

            // Construir el nombre del archivo
            $fileName = $request->input("nombre") . '_' . uniqid() . '.' . $extension;

            // Almacenar la imagen con el nombre de archivo personalizado
            $path = $imagen->storeAs('images/colecciones', $fileName, 'public');
            $coleccion->imagen = $path;
        }

        $coleccion->save();
        session()->flash("success","Se ha creado la colección $coleccion->nombre");
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
        info("ColeccionController => edit");
        info ($coleccion);
        $formatos=config("formatos");
        $thickness=config("thickness");
        $wearlayer=config("wearlayer");

        $coleccion->imagen=asset('storage/' . $coleccion->imagen);
        return Inertia::render('Admin/Colecciones/Edit',['fila'=>$coleccion,'nombre'=>"colecciones",'formatos'=>$formatos,'thickness'=>$thickness,'wearlayer'=>$wearlayer]);
    }

    public function update(UpdateColeccionRequest $request, Coleccion $coleccion)
    {
        try {
            Log::info('Solicitud de actualización recibida', ['request_data' => $request->input()]);
            // Validar los datos de la solicitud
            $validatedData = $request->validated();

            // Actualizar la colección con los datos validados
            $coleccion->update($validatedData);

            // Redirigir con un mensaje de éxito
            session()->flash("success","Se ha actualizado la colección $coleccion->nombre");
            return response()->json(['message' => 'Colección actualizada con éxito.']);
            //return redirect(route('colecciones.index'))->with('success', 'Colección actualizada con éxito.');
        } catch (\Exception $e) {
            // Registrar el error para depuración
            Log::error('Error al actualizar la colección: ' . $e->getMessage());
            Log::info('Solicitud de actualización recibida', ['request_data' => $request->all()]);
            //return redirect()->back()->with('error', 'Ocurrió un error al actualizar la colección.');
            return response()->json(['message' => 'Ocurrió un error al actualizar la colección.']);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coleccion $coleccion)
    {
        $coleccion->delete();
        return redirect (route('colecciones.index'));
    }

    /**
     * Almacenar una nueva imagen para el acabado.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Acabado  $acabado
     */
    public function updateImage(Request $request, Coleccion $coleccion)
    {
        try {
            // Validar las imágenes enviadas
            $request->validate([
                'imagen_new.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Procesar las imágen nueva si existe
            if ($request->hasFile('imagen_new')) {

                if ($coleccion->imagen) {
                    Storage::disk('public')->delete($coleccion->imagen);
                }

                $imagen = $request->file('imagen_new');

                // Obtener la extensión original de la imagen
                $extension = $imagen->getClientOriginalExtension();

                // Construir el nombre del archivo
                $fileName = $request->input("nombre") . '_' . uniqid() . '.' . $extension;

                // Almacenar la imagen con el nombre de archivo personalizado
                $path = $imagen->storeAs('images/colecciones', $fileName, 'public');
                $coleccion->imagen = $path;

                // Guardar el cambio en la colección
                $coleccion->update();
            }

            // Redirigir con un mensaje de éxito
            return response()->json(['message' => 'Imágen modificada con éxito.']);
        } catch (\Exception $e) {
            // Registrar el error para depuración
            Log::error('Error al almacenar imágenes: ' . $e->getMessage());
            return response()->json(['error' => 'Ocurrió un error al guardar la imágen.'], 500);
        }
    }

}
