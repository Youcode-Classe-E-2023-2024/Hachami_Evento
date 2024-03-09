<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use App\Models\CategoryModel;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class EventModel extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $table = 'events';

    protected $fillable = [
        'title',
        'description',
        'category_id',
        'organizator_id',
        'event_date',
        'location',
        'ticketsEvent',
        'status',
        'price',
    ];

    public function category()
    {
        return $this->belongsTo(CategoryModel::class, 'category_id');
    }

    public function organizator()
    {
        return $this->belongsTo(User::class, 'organizator_id', 'id');
    }
}
