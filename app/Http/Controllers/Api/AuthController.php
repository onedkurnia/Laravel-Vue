<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private AuthService $authService,
    ) {}

    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login($request->validated());

        if (!$result) {
            return $this->error('Invalid credentials', 401);
        }

        return $this->success($result, 'Login successful');
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request->user());

        return $this->success(message: 'Logged out successfully');
    }

    public function me(Request $request): JsonResponse
    {
        return $this->success($request->user());
    }
}
