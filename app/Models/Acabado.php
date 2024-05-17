<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acabado extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'coleccion_id',
        'descripcion',
        'color',
        'precio_m2',
    ];

    public function coleccion()
    {
        return  $this->belongsTo(Coleccion::class);
    }

    public function imagenes()
    {
        return $this->hasMany(Galeria::class);
    }
}
