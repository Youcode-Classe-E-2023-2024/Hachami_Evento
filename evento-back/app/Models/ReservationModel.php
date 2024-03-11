<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EventModel;
use App\Models\User;

class ReservationModel extends Model
{
    use HasFactory;

    protected $fillable = ['event_id', 'user_id', 'slug'];
    protected $table = 'reservations';

    public function event()
    {
        return $this->belongsTo(EventModel::class , 'event_id');
    }

    /**
     * Get the user associated with the reservation.
     */
    public function user()
    {
        return $this->belongsTo(User::class ,'user_id', 'id');
    }
}
