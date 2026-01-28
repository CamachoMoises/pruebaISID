<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('instructor_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->decimal('price', 8, 2)->default(0);
            $table->enum('status', ['borrador', 'publicado', 'archivado'])->default('borrador');
            $table->decimal('average_rating', 3, 2)->default(0);
            $table->unsignedInteger('total_ratings')->default(0);
            $table->unsignedInteger('total_students')->default(0);
            $table->timestamps();
            $table->softDeletes();

            // Índices
            $table->index('instructor_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
