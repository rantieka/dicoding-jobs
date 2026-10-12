<?php

namespace App\Http\Controllers;

use App\Models\Vacancy;
use App\Http\Requests\StoreVacancyRequest;
use App\Http\Requests\UpdateVacancyRequest;
use App\Http\Resources\VacancyResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class VacancyController extends Controller
{
    /**
     * Display a listing of the resource.
     * Supports search query by title/keyword.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $search = $request->input('search') ?? $request->input('title');

        $query = Vacancy::query();

        if ($search) {
            $query->search($search);
        }

        if ($request->filled('job_type')) {
            $query->where('job_type', $request->input('job_type'));
        }

        if ($request->filled('location')) {
            $query->where('location', $request->input('location'));
        }

        $vacancies = $query->orderBy('created_at', 'desc')->get();

        return VacancyResource::collection($vacancies);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVacancyRequest $request): JsonResponse
    {
        $vacancy = Vacancy::create($request->validated());

        return (new VacancyResource($vacancy))
            ->additional(['message' => 'Lowongan berhasil dibuat.'])
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Vacancy $vacancy): VacancyResource
    {
        return new VacancyResource($vacancy);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVacancyRequest $request, Vacancy $vacancy): JsonResponse
    {
        $vacancy->update($request->validated());

        return (new VacancyResource($vacancy))
            ->additional(['message' => 'Lowongan berhasil diperbarui.'])
            ->response()
            ->setStatusCode(200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vacancy $vacancy): JsonResponse
    {
        $vacancy->delete();

        return response()->json([
            'message' => 'Lowongan berhasil dihapus.'
        ], 200);
    }
}
