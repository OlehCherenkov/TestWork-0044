<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckApiKey
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->header('Api-Key') != config('app.api_key')) {
            return response('Invalid or empty API KEY');
        }
        return $next($request);
    }
}
