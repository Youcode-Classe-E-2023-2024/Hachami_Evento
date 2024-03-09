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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title', 500);
            $table->string('description', 1000);
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('organizator_id');
            $table->dateTime('event_date');
            $table->string('location', 600);
            $table->integer('ticketsEvent');
            $table->float('price');
            $table->string('status')->default('pending'); 
    
            $table->timestamps();
    
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('organizator_id')->references('id')->on('users')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
