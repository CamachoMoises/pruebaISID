<?php

namespace App\Jobs;

use App\Services\ApiSyncService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SyncDataJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;
    public $retryAfter = 60;
    public function __construct()
    {
        //
    }

    public function handle(ApiSyncService $syncService): void
    {
        try {
            Log::info('Sincronización iniciada por job');
            $result = $syncService->syncAll();
            Log::info('Sincronización completada exitosamente');
        } catch (\Exception $e) {
            Log::error('Error en sincronización: ' . $e->getMessage());
            throw $e;
        }
    }
    public function failed(\Throwable $exception): void
    {
        Log::error('Job de sincronización falló: ' . $exception->getMessage());
    }
}
