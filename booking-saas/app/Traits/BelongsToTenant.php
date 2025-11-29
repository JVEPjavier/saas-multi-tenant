<?php

namespace App\Traits;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait BelongsToTenant
{
    /**
     * Boot del trait
     */
    protected static function bootBelongsToTenant(): void
    {
        // Cuando se crea un modelo, asignar automáticamente el tenant_id
        static::creating(function ($model) {
            if (! isset($model->tenant_id) && auth()->check()) {
                $model->tenant_id = auth()->user()->tenant_id;
            }
        });

        // Scope global: solo mostrar registros del tenant actual
        static::addGlobalScope('tenant', function (Builder $builder) {
            if (auth()->check() && auth()->user()->tenant_id) {
                $builder->where($builder->getModel()->getTable() . '.tenant_id', auth()->user()->tenant_id);
            }
        });
    }

    /**
     * Relación con Tenant
     */
    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    /**
     * Scope para ignorar el filtro de tenant (usar con cuidado)
     */
    public function scopeWithoutTenantFilter($query)
    {
        return $query->withoutGlobalScope('tenant');
    }

    /**
     * Scope para un tenant específico
     */
    public function scopeForTenant($query, int $tenantId)
    {
        return $query->withoutGlobalScope('tenant')
                     ->where('tenant_id', $tenantId);
    }
}
