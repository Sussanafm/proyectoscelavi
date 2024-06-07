<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index']);
Route::get('/coleccion/{id}/{nombre}', [\App\Http\Controllers\HomeController::class, 'showAcabados']);
Route::get('/acabado/{id}', [\App\Http\Controllers\HomeController::class, 'showAcabado']);
Route::get('/acabado/{id}/{nombreColeccion}/{nombreAcabado}', [\App\Http\Controllers\HomeController::class, 'showGaleria']);


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get("/admin", function(){
    return Inertia::render("Admin/Index");
})->middleware(['auth', 'verified'])->name('admin.index');

Route::resource("admin/colecciones", \App\Http\Controllers\ColeccionController::class)->middleware(['auth', 'verified'])->parameters(['colecciones' => 'coleccion']);
Route::resource("admin/acabados", \App\Http\Controllers\AcabadoController::class)->middleware(['auth', 'verified']);

Route::delete('/imagenes/{id}', [\App\Http\Controllers\GaleriaController::class, 'destroy'])->name('imagenes.destroy');


Route::get('/admin/galeria/{acabado}/index', [\App\Http\Controllers\GaleriaController::class, 'index'])->name('imagenes.index');
Route::put('/admin/galeria/ordenar', [\App\Http\Controllers\GaleriaController::class, 'ordenar'])->name('imagenes.ordenar');

Route::post('/admin/acabados/{acabado}/imagenes', [\App\Http\Controllers\AcabadoController::class, 'storeImages'])->name('acabados.storeImages');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

use App\Http\Middleware\CorsMiddleware;

Route::middleware([CorsMiddleware::class])->group(function () {
    Route::get('/proxy/quotes/{moneda}/{selectedValue}', function ($moneda, $selectedValue) {
        $apiKey = "52653%7COJJsZ7ZRSnbFxGX9shXd";
        $quantity = intval(request('quantity')); // Convertir a entero

        $url = "https://api.cambio.today/v1/quotes/{$moneda}/{$selectedValue}/json?quantity={$quantity}&key={$apiKey}";
        info($url);
        $response = Http::get($url);

        return $response->json();
    });
});


require __DIR__.'/auth.php';
