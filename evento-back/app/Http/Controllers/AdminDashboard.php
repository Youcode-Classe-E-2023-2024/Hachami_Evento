<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventModel;
use App\Models\User;
use App\Models\CategoryModel;


class AdminDashboard extends Controller
{

    public function getDashboardData()
    {
        $acceptedEventsCount = EventModel::where('status', 'accepted')->count();
        $organizerCount = User::role('organizer', 'web')->count();
        $reservatorCount = User::role('reservator', 'web')->count();


        $data = [
            'accepted_events_count' => $acceptedEventsCount,
            'organizer_count' => $organizerCount,
            'reservator_count' => $reservatorCount,
            // 'organizer_permissions' => $organizerPermissions,
            // 'reservator_permissions' => $reservatorPermissions,
        ];

        return response()->json($data);
    }

    public function getEventDetails(Request $request)
    {
        $status = $request->query('status');
        $categoryName = $request->query('category');

        $categoryId = CategoryModel::where('name', $categoryName)->value('id');

        $events = EventModel::with(['organizator:id,name,email', 'category'])
            ->when($status, function ($query) use ($status) {
                return $query->where('status', 'like', '%' . $status . '%');
            })
            ->when($categoryId, function ($query) use ($categoryId) {
                return $query->where('category_id', $categoryId);
            })
            ->paginate(6);

        return response()->json($events);
    }
}
