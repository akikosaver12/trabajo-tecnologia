-- ========================================================
-- ESQUEMA DE BASE DE DATOS PARA LANDING PAGE (SUPABASE)
-- ========================================================
--
-- Ejecuta este script en el Editor SQL de tu panel de Supabase.
--

-- 1. Creación de la Tabla de Registrados
create table if not exists public.registrados (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    nombre text not null,
    email text not null,
    celular text,
    metodo_registro text not null check (metodo_registro in ('traditional', 'google'))
);

-- 2. Habilitar la Seguridad a Nivel de Fila (Row Level Security - RLS)
-- Esto protege tu base de datos para que los usuarios no puedan leer o alterar otros registros.
alter table public.registrados enable row level security;

-- 3. Crear Políticas de Seguridad RLS

-- Política A: Permitir a CUALQUIERA (público / anon) insertar registros (registro al webinar)
drop policy if exists "Permitir inserciones públicas" on public.registrados;
create policy "Permitir inserciones públicas"
on public.registrados
for insert
with check (true);

-- Política B: Bloquear la lectura pública de registros
-- Solo los usuarios autenticados con rol de servicio (Service Role / Dashboard) pueden leer los datos.
-- Por defecto, al no definir una política de "select" para el rol 'anon', Supabase bloquea toda lectura anónima.

-- 4. Opcional: Crear un índice en el correo electrónico para búsquedas eficientes
create index if not exists registrados_email_idx on public.registrados (email);
