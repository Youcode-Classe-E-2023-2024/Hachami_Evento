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
        } else {
            dd('empty');
        }




        return response()->json(['message' => 'Event created successfully', 'data' => $event], 201);
    }
}
