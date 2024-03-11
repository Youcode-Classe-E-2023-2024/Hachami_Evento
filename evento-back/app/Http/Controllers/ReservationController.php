<?php

namespace App\Http\Controllers;

use App\Models\ReservationModel;
use Illuminate\Http\Request;

class ReservationController extends Controller
{

    public function getUserReservations(Request $request)
    {
        $userId = auth()->id();

        $titleFilter = $request->input('title');

        // Use the query builder to filter by user_id and title
        $query = ReservationModel::where('user_id', $userId)
            ->when($titleFilter, function ($query) use ($titleFilter) {
                return $query->whereHas('event', function ($eventQuery) use ($titleFilter) {
                    $eventQuery->where('title', 'like', '%' . $titleFilter . '%');
                });
            })
            ->with('event');

        // Paginate the results with 3 items per page
        $perPage = $request->input('per_page', 8);
        $reservations = $query->paginate($perPage);

        return response()->json($reservations);
    }

}
