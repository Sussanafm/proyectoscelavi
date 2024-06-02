<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateGaleriaRequest;
use App\Models\Acabado;
use App\Models\Coleccion;
use App\Models\Galeria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class GaleriaController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Acabado $acabado)
    {

        $filas = Galeria::select("galeria.id as id", "acabados.nombre as acabado_id", "galeria.imagen as imagen", "order")
            ->where("acabado_id","=",$acabado->id)
            ->join("acabados", "acabados.id", "=", "galeria.acabado_id")
            ->orderby("order","asc")
            ->get();
        $coleccion = Coleccion::select("nombre")
            ->where("id","=",$acabado->coleccion_id)
            ->first();
        $coleccionNombre=$coleccion->nombre;

        if (!$filas->isEmpty()) {
            $campos = $filas[0]->getFillable();
            $columnas = Galeria::getColumnNames();
            $datos=true;
        }else{
            $campos=[];
            $columnas=[];
            $datos=false;
        }
        $tabla="galeria";

        return Inertia::render('Admin/Galeria/Index', compact('tabla','campos','filas','datos','columnas','coleccionNombre'));

    }

    public function destroy($id)
    {
        $imagen = Galeria::findOrFail($id);
        $acabadoId = $imagen->acabado_id; // Guarda el acabado_id antes de borrar

        // Elimina la imagen del sistema de archivos
        $imagePath = public_path('storage/' . $imagen->imagen);
        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }

        // Elimina el registro de la imagen de la base de datos
        $imagen->delete();

        // Reordena las imágenes restantes
        $this->reorderImages($acabadoId);

        return response()->json(['message' => $imagePath]);
    }

    public function ordenar(Request $request)
    {
        // Recibe los datos con el nuevo orden de las filas desde el frontend
        $filas = $request->input('filas');

        // Imprime los datos recibidos en la consola
        Log::info('Datos recibidos para ordenar:', $filas);

        foreach ($filas as $fila) {
            // Encuentra la fila en la base de datos por su ID y acabado_id
            $registro = Galeria::where('id', $fila['id'])->first();
            Log::info($registro);
            if ($registro) {
                // Actualiza el campo 'order' con el nuevo orden
                $registro->order = $fila['order'];
                $registro->save();
            }
        }

        return response()->json(['message' => 'El orden ha sido actualizado correctamente']);
        //return redirect (route('acabados.index'));
    }

    private function reorderImages($acabadoId)
    {
        $images = Galeria::where('acabado_id', $acabadoId)->orderBy('order')->get();
        if(isset($images)){
            $order = 0;

            foreach ($images as $image) {
                $image->order = ++$order;
                $image->save();
            }
        }
    }
}
