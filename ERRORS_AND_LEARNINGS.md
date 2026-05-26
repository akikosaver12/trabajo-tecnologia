# Errores y Aprendizajes Históricos

## 1. Registro de Errores y Soluciones

### Error 001: Error 42710 al ejecutar SQL en Supabase
**Fecha:** 2026-05-26
**Síntoma:** `ERROR: 42710: policy "Permitir inserciones públicas" for table "registrados" already exists` al intentar ejecutar el script de configuración `supabase-schema.sql` por segunda vez.
**Causa:** La cláusula `create policy` en PostgreSQL no es idempotente por defecto si la política ya existe.
**Solución:** Se actualizó `supabase-schema.sql` para agregar `drop policy if exists "Permitir inserciones públicas" on public.registrados;` antes del `create policy`. Esto permite ejecutar el script de configuración múltiples veces de forma segura.
