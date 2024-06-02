<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coleccion extends Model
{
    use HasFactory;

    protected $table="colecciones";
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'imagen',
        'nombre',
        'formato',
        'thickness',
        'wearlayer',
        'typology',
        'total_thickness',
    ];

    public function acabados()
    {
        return $this->hasMany(Acabado::class);
    }
    /**
     * Get the column names for the table.
     *
     * @return array
     */
    public static function getColumnNames()
    {
        return [
            'Imagen',
            'Nombre',
            'Formato',
            'Thickness',
            'Wearlayer',
            'Typology',
            'Total thickness',
        ];
    }

}
