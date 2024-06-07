<?php

namespace App\Http\Controllers;


use App\Models\Acabado;
use App\Models\Coleccion;
use App\Models\Galeria;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;


class HomeController extends Controller
{
    public function index()
    {
        $imagenUrl = asset('storage/images/img/img2_fondo_2160x850.jpg');
        $coleccion = Coleccion::all();

        return Inertia::render('Front/Index', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'imageUrl' => $imagenUrl,
            'imagenes' => $coleccion,
        ]);
    }

    public function showAcabados($id, string $nombre){
        $imagenUrl = asset('storage/images/img/img1_fondo_2160x850.jpg');
        $acabados = Acabado::where("coleccion_id",$id)->get();

        return Inertia::render('Front/Acabados', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'imageUrl' => $imagenUrl,
            'acabados' => $acabados,
            'nombre' => $nombre,
        ]);
    }

    public function showAcabado($id){
        $galeria = Galeria::where("acabado_id",$id)->orderby("order","ASC")->first();
        return response()->json($galeria);
    }

    public function showGaleria($id,  string $nombreColeccion, string $nombreAcabado){
        $imagenUrl = asset('storage/images/img/img3_fondo_2160x850.jpg');
        $galeria = Galeria::where("acabado_id",$id)->get();
        $acabados = Acabado::where("id",$id)->first();

        $coleccion = Coleccion::where("nombre",$nombreColeccion)->first();

        $monedas=config("monedas");


        return Inertia::render('Front/Galeria', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'imageUrl' => $imagenUrl,
            'acabados' => $acabados,
            'coleccion' => $coleccion,
            'galeria' => $galeria,
            'monedas' => $monedas
        ]);
    }


}
