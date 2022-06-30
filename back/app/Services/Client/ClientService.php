<?php

namespace App\Services\Client;

use App\Models\Client;

class ClientService
{
    public function store(array $data): bool
    {
        Client::query()->create($data);
        return true;
    }

    public function update(Client $client, array $data): Client
    {
        $client->update($data);
        return $client;
    }

    public function delete(Client $client): bool
    {
        return $client->delete();
    }
}
