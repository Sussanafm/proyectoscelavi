<?php

namespace App\Http\Controllers;


use App\Models\Acabado;
use App\Models\Coleccion;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;


class HomeController extends Controller
{
    public function index()
    {
        $imagenUrl = asset('storage/images/img/img1_fondo_2160x850.jpg');
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

    public function showAcabados(string $id, string $nombre){
        $imagenUrl = asset('storage/images/img/img2_fondo_2160x850.jpg');
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
}
