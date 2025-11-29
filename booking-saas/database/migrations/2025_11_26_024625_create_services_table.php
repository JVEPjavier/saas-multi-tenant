<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('duration'); // minutos
            $table->decimal('price', 10, 2);
            $table->string('color', 7)->default('#10B981');
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->string('image_url', 500)->nullable();
            $table->string('category', 100)->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('tenant_id');
            $table->index('is_active');
            $table->index('category');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};