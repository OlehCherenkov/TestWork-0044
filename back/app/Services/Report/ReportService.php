<?php

namespace App\Services\Report;

use App\Models\Report;

class ReportService
{
    public function store(array $data): bool
    {
        Report::query()->create($data);
        return true;
    }

    public function update(Report $report, array $data): Report
    {
        $report->update($data);
        return $report;
    }

    public function delete(Report $report): bool
    {
        return $report->delete();
    }
}
