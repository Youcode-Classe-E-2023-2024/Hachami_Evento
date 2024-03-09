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
use App\Models\CategoryModel;

class EventController extends Controller
{
    //

    public function index(Request $request)
    {
        $title = $request->query('title');
        $categoryName = $request->query('category');

        $categoryId = CategoryModel::where('name', $categoryName)->value('id');

        $events = EventModel::with(['organizator:id,name,email', 'category'])
            ->where('status', 'accepted')
            ->when($title, function ($query) use ($title) {
                return $query->where('title', 'like', '%' . $title . '%');
            })
            ->when($categoryId, function ($query) use ($categoryId) {
                return $query->where('category_id', $categoryId);
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
            if ($request->hasFile('images')) {
                $files = $request->file('images');

                $event->addMedia($files)
                    ->usingName($request->title)
                    ->toMediaCollection();
            } else {
                return response()->json(['error' => 'No image uploaded'], 403);
            }

            return response()->json(['message' => 'Event created successfully', 'data' => $event], 201);

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
