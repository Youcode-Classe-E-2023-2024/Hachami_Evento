<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use App\Models\CategoryModel;

class EventModel extends Model implements HasMedia
{
    use HasFactory , InteractsWithMedia;

    protected $table = 'events';

    protected $fillable = [
        'title',
        'description',
        'category_id',
        'event_date',
        'location',
        'ticketsEvent',
        'status',
    ];

    public function category()
    {
        return $this->belongsTo(CategoryModel::class, 'category_id');
    }
}
