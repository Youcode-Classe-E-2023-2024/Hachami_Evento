<?php

namespace App\Http\Controllers;

use App\Models\EventModel;

use Illuminate\Http\Request;
use App\Http\Requests\EventRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    //

    public function store(EventRequest $request)
    {
        $validatedData = $request->validated();

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
