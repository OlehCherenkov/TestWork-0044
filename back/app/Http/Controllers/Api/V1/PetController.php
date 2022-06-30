<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Api\V1\StorePetRequest;
use App\Http\Requests\Api\V1\UpdatePetRequest;
use App\Http\Resources\Api\V1\PetResource;
use App\Http\Resources\Api\V1\PetsResource;
use App\Models\Pet;
use App\Services\Pet\PetService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PetController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        $pets = Pet::query();
        if($request->has('search')) {
            $pets->with('client')->where('name', 'LIKE', '%' . $request->search . '%')
                ->orWhereHas('client', function ($query) use ($request) {
                    $query->where('first_name', 'LIKE', '%' . $request->search . '%')
                        ->orWhere('last_name', 'LIKE', '%' . $request->search . '%');
                });
        }
        $pets = $pets->paginate(env('ITEM_PER_PAGE'));
        return $this->sendSuccess(PetsResource::collection($pets), '', true);
    }

    public function all(): JsonResponse
    {
        $clients = Pet::all();
        return $this->sendSuccess(PetsResource::collection($clients));
    }

    public function show(Pet $pet): JsonResponse
    {
        return $this->sendSuccess(PetResource::make($pet));
    }

    public function store(StorePetRequest $request, PetService $service): JsonResponse
    {
        $service->store($request->validated());
        return $this->sendSuccess('Item successfully created');
    }

    public function update(UpdatePetRequest $request, Pet $pet, PetService $service): JsonResponse
    {

        $pet = $service->update($pet, $request->validated());
        return $this->sendSuccess(PetResource::make($pet), 'Item successfully updated');
    }

    public function destroy(Pet $pet, PetService $service): JsonResponse
    {
        $service->delete($pet);
        $pets = Pet::query()->paginate(env('ITEM_PER_PAGE'));
        return $this->sendSuccess(PetsResource::collection($pets), 'Item successfully deleted', true);
    }

}
