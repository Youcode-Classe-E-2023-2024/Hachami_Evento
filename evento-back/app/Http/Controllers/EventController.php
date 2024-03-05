<?php

namespace App\Http\Controllers;

use App\Models\EventModel;

use Illuminate\Http\Request;
use App\Http\Requests\EventRequest;
use Illuminate\Support\Facades\Log;

class EventController extends Controller
{
    //

    public function store(EventRequest $request)
    {
        $validatedData = $request->validated();

        $event = EventModel::create($validatedData);

        foreach ($request->file('images') as $index => $file) {
            $event->addMedia($file)
                ->usingName($request->title . '_' . ($index + 1))
                ->toMediaCollection();
        }

        return response()->json(['message' => 'Event created successfully', 'data' => $event], 201);

    }
}
