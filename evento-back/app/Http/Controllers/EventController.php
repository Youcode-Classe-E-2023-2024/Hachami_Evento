<?php

namespace App\Http\Controllers;

use App\Models\EventModel;

use Illuminate\Http\Request;
use App\Http\Requests\EventRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class EventController extends Controller
{
    //

    public function index(Request $request)
    {
        $title = $request->query('title');
        $category = $request->query('category');

        // Query events with pagination
        $events = EventModel::with(['organizator:id,name,email'])
            ->where('status', 'accepted')
            ->when($title, function ($query) use ($title) {
                return $query->where('title', 'like', '%' . $title . '%');
            })
            ->when($category, function ($query) use ($category) {
                return $query->where('category_id', $category);
            })
            ->paginate(6);

        return response()->json($events);
    }

    public function store(EventRequest $request)
    {
        try {
            $user = Auth::user();
            $validatedData = $request->validated();
            $validatedData['organizator_id'] = $user->id;


            $event = EventModel::create($validatedData);
            $files = $request->file('images');
            if (!empty($files)) {
                $event->addMedia($files)
                    ->usingName($request->title)
                    ->toMediaCollection();
                return response()->json(['message' => 'Event created successfully', 'data' => $event], 201);

            } else {
                return response()->json(['error' => 'Erro in uploading image'], 403);
            }

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }




    }

    public function confirmEvent($id)
    {
        $event = EventModel::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        if ($event->status === 'accepted') {
            return response()->json(['message' => 'Event is already accepted'], 422);
        }

        $event->update(['status' => 'accepted']);


        return response()->json(['message' => 'Event status changed to accepted', 'data' => $event], 200);
    }
}
