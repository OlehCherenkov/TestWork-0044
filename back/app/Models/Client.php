<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'first_name',
        'last_name',
        'address',
        'phone',
    ];

    public function pets(): HasMany
    {
        return $this->hasMany(Pet::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    public function getFullnameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
