<?php

namespace App\Models;

use App\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;

class Customer extends Model
{
    use HasFactory, SoftDeletes, HasApiTokens, BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'name',
        'email',
        'phone',
        'birth_date',
        'gender',
        'avatar_url',
        'notes',
        'total_appointments',
        'total_spent',
        'last_appointment_at',
        'is_blocked',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'total_spent' => 'decimal:2',
        'last_appointment_at' => 'datetime',
        'is_blocked' => 'boolean',
    ];

    // Relaciones
    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_blocked', false);
    }

    // Métodos auxiliares
    public function getFullPhoneAttribute(): string
    {
        return $this->phone;
    }
}
