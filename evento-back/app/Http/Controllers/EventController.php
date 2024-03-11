<?php

namespace App\Http\Controllers;

use App\Models\EventModel;

use App\Models\ReservationModel;
use Illuminate\Http\Request;
use App\Http\Requests\EventRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use App\Models\CategoryModel;
use Illuminate\Support\Str;


class EventController extends Controller
{
    //

    public function index(Request $request)
    {
        $title = $request->query('title');
        $categoryName = $request->query('category');

        $categoryId = CategoryModel::where('name', $categoryName)->value('id');

        $events = EventModel::with(['organizator:id,name,email', 'category', 'media'])
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

    public function myevents(Request $request)
    {
        $userId = auth()->user()->id;

        $categoryName = $request->query('category');
        $title = $request->query('title');
        $status = $request->query('status');

        $categoryId = CategoryModel::where('name', $categoryName)->value('id');

        $events = EventModel::with(['organizator:id,name,email', 'category', 'media'])
            ->where('organizator_id', $userId)
            ->when($title, function ($query) use ($title) {
                return $query->where('title', 'like', '%' . $title . '%');
            })
            ->when($categoryId, function ($query) use ($categoryId) {
                return $query->where('category_id', $categoryId);
            })
            ->when($status, function ($query) use ($status) {
                return $query->where('status', $status);
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

            $eventId = $event->id;
            $event = EventModel::with(['category', 'media'])->find($eventId);

            return response()->json(['message' => 'Event created successfully', 'data' => $event], 201);

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }




    }

    public function confirmEvent(Request $request, $id)
    {
        $event = EventModel::find($id);
        $status = $request->Input('status');

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }



        $event->update(['status' => $status]);


        return response()->json(['message' => 'Event status changed to accepted', 'data' => $event], 200);
    }

    public function getEventById($id)
    {
        try {
            // Get the event by ID with related data
            $event = EventModel::with(['organizator:id,name,email', 'media', 'category'])->findOrFail($id);


            $responseData = [
                'event' => $event,
            ];

            return response()->json($responseData);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function getRelatedEvent($id)
    {
        $event = EventModel::findOrFail($id);
        $categoryId = $event->category_id;

        $relatedEvents = EventModel::with(['category', 'media'])
            ->where('category_id', $categoryId) 
            ->where('id', '!=', $id)
            ->take(3)
            ->get();

        return response()->json($relatedEvents);
    }

    public function reserveTicket($id)
    {
        try {
            // Get the event by ID with related data
            $event = EventModel::with(['organizator:id,name,email', 'media', 'category'])->findOrFail($id);

            if ($event->ticketsEvent <= 0) {
                return response()->json(['error' => 'No available tickets'], 403);
            }

            $event->decrement('ticketsEvent');

            $reservation = ReservationModel::create([
                'event_id' => $event->id,
                'user_id' => auth()->user()->id,
                'slug' => Str::slug($event->title . '-' . auth()->user()->id . '-' . now()),
            ]);
            return response()->json(['message' => 'Reservation successful', 'data' => $reservation], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }
}
