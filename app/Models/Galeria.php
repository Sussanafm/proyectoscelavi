<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Galeria extends Model
{
    use HasFactory;

    protected $table="galeria";
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'imagen',
        'acabado_id',
        'order',
    ];
    public function acabado()
    {
        return  $this->belongsTo(Acabado::class);
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
            'Acabado',
            'Orden',
        ];
    }
}
