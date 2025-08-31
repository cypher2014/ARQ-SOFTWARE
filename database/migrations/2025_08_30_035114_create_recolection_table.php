<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('recolections', function (Blueprint $table) {
            $table->id('id_recolection');
            $table->unsignedBigInteger('id_agenda');
            $table->integer('total_recolection')->nullable();
            $table->decimal('total_price', 10, 2)->nullable();
            $table->string('observation', 250)->nullable();
            $table->timestamps();

            $table->foreign('id_agenda')->references('id_agenda')->on('agenda')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recolection');
    }
};
