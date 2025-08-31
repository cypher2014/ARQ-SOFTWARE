<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('admons_users', function (Blueprint $table) {
            $table->id('id_users');
            $table->string('name_user', 50);
            $table->string('last_name', 50);
            $table->string('email', 150)->unique();
            $table->string('password', 255);
            $table->string('user_phone', 20)->nullable();
            $table->string('user_position', 100)->nullable();
            $table->string('city', 100)->nullable();
            $table->boolean('role_admon')->default(0);
            $table->boolean('role_courier')->default(0);
            $table->boolean('role_gestor')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admons_users');
    }
};
