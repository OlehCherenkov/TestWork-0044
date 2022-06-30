<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Api\V1\StoreReportRequest;
use App\Http\Requests\Api\V1\UpdateReportRequest;
use App\Http\Resources\Api\V1\ReportResource;
use App\Http\Resources\Api\V1\ReportsResource;
use App\Models\Report;
use App\Services\Report\ReportService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReportController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        $reports = Report::query();
        if($request->has('search')) {
            $reports->with(['client', 'pet'])
                ->whereHas('pet', function ($query) use ($request) {
                    $query->where('name', 'LIKE', '%' . $request->search . '%');
                })
                ->orWhereHas('client', function ($query) use ($request) {
                    $query->where('first_name', 'LIKE', '%' . $request->search . '%')
                        ->orWhere('last_name', 'LIKE', '%' . $request->search . '%');
                });
        }
        $reports = $reports->paginate(env('ITEM_PER_PAGE'));
        return $this->sendSuccess(ReportsResource::collection($reports), '', true);
    }

    public function all(): JsonResponse
    {
        $reports = Report::all();
        return $this->sendSuccess(ReportsResource::collection($reports));
    }

    public function show(Report $report): JsonResponse
    {
        return $this->sendSuccess(ReportResource::make($report));
    }

    public function store(StoreReportRequest $request, ReportService $service): JsonResponse
    {
        $service->store($request->validated());
        return $this->sendSuccess('Item successfully created');
    }

    public function update(UpdateReportRequest $request, Report $report, ReportService $service): JsonResponse
    {

        $report = $service->update($report, $request->validated());
        return $this->sendSuccess(ReportResource::make($report), 'Item successfully updated');
    }

    public function destroy(Report $report, ReportService $service): JsonResponse
    {
        $service->delete($report);
        $reports = Report::query()->paginate(env('ITEM_PER_PAGE'));
        return $this->sendSuccess(ReportsResource::collection($reports), 'Item successfully deleted', true);
    }

}
