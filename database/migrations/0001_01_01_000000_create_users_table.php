<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('id_user');
            $table->string('type_document', 10);
            $table->string('name_user', 50);
            $table->string('last_name', 50);
            $table->string('email', 150)->unique();
            $table->string('password', 255);
            $table->string('user_phone', 20)->nullable();
            $table->string('user_address', 200)->nullable();
            $table->string('city', 100)->nullable();
            $table->boolean('edit_data')->default(0);
            $table->boolean('delete_data')->default(0);
            $table->boolean('view_data')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
