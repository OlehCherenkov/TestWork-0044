<?php

namespace App\Services\Pet;

use App\Models\Pet;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class PetService
{
    public function store(array $data): bool
    {
        $image = $this->storeImage($data['photo']);
        $data['photo'] = $image;
        Pet::query()->create($data);
        return true;
    }

    public function update(Pet $pet, array $data): Pet
    {
        if (!filter_var($data['photo'], FILTER_VALIDATE_URL)) {
            $this->removeImage($pet->photo);
            $image = $this->storeImage($data['photo']);
            $data['photo'] = $image;
        } else {
            unset($data['photo']);
        }
        $pet->update($data);
        return $pet;
    }

    public function delete(Pet $pet): bool
    {
        $this->removeImage($pet->photo);
        return $pet->delete();
    }

    private function storeImage($image): string
    {
        $name = md5(time()).'.png';
        $fullPath = storage_path('app/public/images/pets/');
        $shortPath = '/public/images/pets';
        if(!Storage::exists($shortPath)) {
            Storage::makeDirectory($shortPath);
        }
        Image::make($image)->save($fullPath.$name, 100, 'png');
        return 'storage/images/pets/'.$name;
    }

    private function removeImage($image): void
    {
        $path = str_replace('storage', 'public', $image);
        $file = storage_path('app/'.$path);
        if(Storage::exists($file)) {
            Storage::delete($file);
        }
    }
}
