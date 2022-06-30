<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Api\V1\StoreClientRequest;
use App\Http\Requests\Api\V1\UpdateClientRequest;
use App\Http\Resources\Api\V1\ClientResource;
use App\Http\Resources\Api\V1\ClientsResource;
use App\Models\Client;
use App\Services\Client\ClientService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClientController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        $clients = Client::query();
        if($request->has('search')) {
            $clients->where('first_name', 'LIKE', '%' . $request->search . '%')
                ->orWhere('last_name', 'LIKE', '%' . $request->search . '%')
                ->orWhere('phone', 'LIKE', '%' . $request->search . '%');
        }
        $clients = $clients->paginate(env('ITEM_PER_PAGE'));
        return $this->sendSuccess(ClientsResource::collection($clients), '', true);
    }

    public function all(): JsonResponse
    {
        $clients = Client::all();
        return $this->sendSuccess(ClientsResource::collection($clients));
    }

    public function show(Client $client): JsonResponse
    {
        return $this->sendSuccess(ClientResource::make($client));
    }

    public function store(StoreClientRequest $request, ClientService $service): JsonResponse
    {
        $service->store($request->validated());
        return $this->sendSuccess('Item successfully created');
    }

    public function update(UpdateClientRequest $request, Client $client, ClientService $service): JsonResponse
    {

        $client = $service->update($client, $request->validated());
        return $this->sendSuccess(ClientResource::make($client), 'Item successfully updated');
    }

    public function destroy(Client $client, ClientService $service): JsonResponse
    {
        $service->delete($client);
        $clients = Client::query()->paginate(env('ITEM_PER_PAGE'));
        return $this->sendSuccess(ClientsResource::collection($clients), 'Item successfully deleted', true);
    }

}
