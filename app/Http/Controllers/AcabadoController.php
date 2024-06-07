<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAcabadoRequest;
use App\Http\Requests\UpdateAcabadoRequest;
use App\Models\Acabado;
use App\Models\Coleccion;
use App\Models\Galeria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AcabadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //$filas = Acabado::all();
        $filas = Acabado::select("acabados.id as id", "colecciones.nombre as coleccion_id", "acabados.nombre as nombre", "descripcion", "color", "precio_m2")
            ->join("colecciones", "colecciones.id", "=", "acabados.coleccion_id")
            ->get();
        if (!$filas->isEmpty()) {
            $campos = $filas[0]->getFillable();
            $columnas = Acabado::getColumnNames();
            $datos=true;
        }else{
            $campos=[];
            $columnas=[];
            $datos=false;
        }
        $tabla="acabados";
        return Inertia::render('Admin/Acabados/Index', compact('tabla','campos','filas','datos','columnas'));

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

        $validatedData = $request->validated();
        $acabado = new Acabado($validatedData);
        $acabado->save();

        $coleccion=Coleccion::where("id",$acabado->coleccion_id)->first();
        $imagenes=[];

        // Procesar las imágenes si existen
        if ($request->hasFile('imagenes')) {
            foreach ($request->file('imagenes') as $imagen) {

                // Obtener la extensión original de la imagen
                $extension = $imagen->getClientOriginalExtension();

                // Construir el nombre del archivo
                $fileName = $coleccion->nombre . '_' . $acabado->nombre . '_' . uniqid() . '.' . $extension;

                // Almacenar la imagen con el nombre de archivo personalizado
                $path = $imagen->storeAs('images/acabados', $fileName, 'public');

                // Guardar el path de la imagen en los datos validados
                $imagenes[] = $path;
            }

            $ultimo = Galeria::select('order')->where('acabado_id','=',$acabado->id)->orderby('order','DESC')->first();
            $ultimoOrder = $ultimo ? $ultimo->order : 0; // Si no se encuentra ningún registro, se empieza desde 0
            // Crear una nueva instancia de Galeria y guardar los datos
            foreach ($imagenes as $imagen) {
                $galeria = new Galeria();
                $galeria->acabado_id = $acabado->id;
                $galeria->imagen = $imagen;
                $galeria->order = ++$ultimoOrder; // Incrementar antes de asignar
                $galeria->save();
            }
        }
        session()->flash("success","Se ha creado el acabado $acabado->nombre");
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
        $imagenes=Galeria::where('acabado_id','=',$acabado->id)->get();

        // Agregar la URL completa de la imagen
        $imagenes->transform(function ($imagen) {
            $imagen->imagen = asset('storage/' .$imagen->imagen);
            return $imagen;
        });
        info ($imagenes);
        return Inertia::render('Admin/Acabados/Edit',['fila'=>$acabado,'nombre'=>"acabados",'colecciones'=>$colecciones,'colores'=>$colores,'imagenes'=>$imagenes]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAcabadoRequest $request, Acabado $acabado)
    {
        // Validación de los datos
        $validatedData = $request->validated();

        // Actualización de los campos del acabado
        $acabado->update($validatedData);

        session()->flash("success","Se ha actualizado el acabado $acabado->nombre");
        // Redirigir con un mensaje de éxito
        return response()->json(['message' => 'Imágenes agregadas con éxito.']);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Acabado $acabado)
    {
        $acabado->delete();
        return redirect (route('acabados.index'));
    }

    /**
     * Almacenar una nueva imagen para el acabado.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Acabado  $acabado
     */
    public function storeImages(Request $request, Acabado $acabado)
    {
        try {
            // Validar las imágenes enviadas
            $request->validate([
                'imagenes_new.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Obtener la colección
            $coleccion = Coleccion::where("id", $acabado->coleccion_id)->first();

            // Procesar las imágenes nuevas si existen
            if ($request->hasFile('imagenes_new')) {
                $imagenes = [];
                foreach ($request->file('imagenes_new') as $imagen) {
                    // Obtener la extensión original de la imagen
                    $extension = $imagen->getClientOriginalExtension();

                    // Construir el nombre del archivo
                    $fileName = $coleccion->nombre . '_' . $acabado->nombre . '_' . uniqid() . '.' . $extension;

                    // Almacenar la imagen con el nombre de archivo personalizado
                    $path = $imagen->storeAs('images/acabados', $fileName, 'public');

                    // Guardar el path de la imagen en el array de imágenes
                    $imagenes[] = $path;
                }

                $ultimo = Galeria::select('order')->where('acabado_id', '=', $acabado->id)->orderby('order', 'DESC')->first();
                $ultimoOrder = $ultimo ? $ultimo->order : 0; // Si no se encuentra ningún registro, se empieza desde 0

                // Antes del bucle foreach
                Log::info('Contenido de $imagenes:', $imagenes);

                // Crear una nueva instancia de Galeria y guardar los datos
                foreach ($imagenes as $imagen) {
                    Log::info('Contenido de $imagen:', [$imagen]);
                    Galeria::create([
                        'acabado_id' => $acabado->id,
                        'imagen' => $imagen,
                        'order' => ++$ultimoOrder, // Incrementar antes de asignar
                    ]);
                }
            }

            // Redirigir con un mensaje de éxito
            return response()->json(['message' => 'Imágenes agregadas con éxito.']);
        } catch (\Exception $e) {
            // Registrar el error para depuración
            Log::error('Error al almacenar imágenes: ' . $e->getMessage());
            return response()->json(['error' => 'Ocurrió un error al guardar las imágenes.'], 500);
        }
    }

}
