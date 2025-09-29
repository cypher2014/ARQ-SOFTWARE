<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Authentication Settings
    |--------------------------------------------------------------------------
    |
    | Aquí defines el guard y el broker de contraseñas por defecto que tu
    | aplicación va a utilizar. Puedes cambiarlos si usas autenticaciones múltiples.
    |
    */

    'defaults' => [
        'guard' => env('AUTH_GUARD', 'web'),
        'passwords' => env('AUTH_PASSWORD_BROKER', 'users'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Aquí defines cada "guard" de autenticación que usará tu aplicación.
    | El driver "session" se usa para requests vía navegador.
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'admin' => [
            'driver' => 'session',
            'provider' => 'admons',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | Aquí defines cómo se obtienen los usuarios para cada guard.
    | Puedes usar "eloquent" (modelos Eloquent) o "database" (query builder).
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        'admons' => [
            'driver' => 'eloquent',
            'model' => App\Models\Admons::class, // 👈 asegúrate de que este modelo exista y sus campos coincidan con la tabla
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Reset Settings
    |--------------------------------------------------------------------------
    |
    | Aquí defines la configuración para la recuperación de contraseñas.
    | Puedes definir diferentes brokers para cada tipo de usuario.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],

        'admons' => [
            'provider' => 'admons',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    |
    | Define en segundos el tiempo durante el cual una contraseña confirmada
    | sigue siendo válida antes de pedir confirmación de nuevo.
    |
    */

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),
];


