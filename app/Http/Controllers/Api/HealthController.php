<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class HealthController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $health = [
            'status' => 'ok',
            'database' => $this->checkDatabase(),
            'cache' => $this->checkCache(),
        ];

        $isHealthy = !in_array('disconnected', $health);

        return $this->success($health, $isHealthy ? 'Healthy' : 'Degraded', $isHealthy ? 200 : 503);
    }

    private function checkDatabase(): string
    {
        try {
            DB::connection()->getPdo();
            return 'connected';
        } catch (\Throwable) {
            return 'disconnected';
        }
    }

    private function checkCache(): string
    {
        try {
            Cache::store()->put('health_check', true, 5);
            Cache::store()->forget('health_check');
            return 'connected';
        } catch (\Throwable) {
            return 'disconnected';
        }
    }
}
