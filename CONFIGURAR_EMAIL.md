# 🔧 Configuración Rápida de Email - Solución al Error "Authentication Required"

## ❌ Error que estás viendo:
```
Error: (530, b'5.7.0 Authentication Required...')
```

Este error significa que **Gmail no puede autenticar** porque falta la contraseña o está mal configurada.

## ✅ Solución Paso a Paso

### Paso 1: Generar App Password de Gmail

**IMPORTANTE:** Gmail NO acepta contraseñas normales. Necesitas una "App Password".

1. **Habilita verificación en 2 pasos** (si no la tienes):
   - Ve a: https://myaccount.google.com/security
   - Activa "Verificación en 2 pasos"

2. **Genera una App Password**:
   - Ve a: https://myaccount.google.com/apppasswords
   - Selecciona "Correo" como aplicación
   - Selecciona "Otro (nombre personalizado)"
   - Escribe: "Greenity Contacto"
   - Haz clic en "Generar"
   - **Copia la contraseña de 16 caracteres** (se ve así: `abcd efgh ijkl mnop`)

### Paso 2: Configurar en Docker (Si usas Docker)

Edita el archivo `docker-compose.yaml` y agrega la contraseña:

```yaml
environment:
  - MAIL_PASSWORD=abcd efgh ijkl mnop  # Pega tu App Password aquí (sin espacios o con espacios, ambos funcionan)
```

**Ejemplo completo:**
```yaml
environment:
  - DB_HOST=db
  - DB_PORT=3306
  - DB_USER=root
  - DB_PASSWORD=12345
  - DB_NAME=greenity_db
  - MAIL_SERVER=smtp.gmail.com
  - MAIL_PORT=587
  - MAIL_USE_TLS=True
  - MAIL_USERNAME=greenity.contacto@gmail.com
  - MAIL_PASSWORD=abcd efgh ijkl mnop  # ← TU APP PASSWORD AQUÍ
  - MAIL_DEFAULT_SENDER=greenity.contacto@gmail.com
```

### Paso 3: Reiniciar Docker

```bash
docker-compose down
docker-compose up --build
```

### Paso 4: Si NO usas Docker (Desarrollo Local)

Crea un archivo `.env` en la raíz del proyecto:

```bash
MAIL_USERNAME=greenity.contacto@gmail.com
MAIL_PASSWORD=abcd efgh ijkl mnop
```

O exporta las variables antes de ejecutar:

**Windows (PowerShell):**
```powershell
$env:MAIL_USERNAME="greenity.contacto@gmail.com"
$env:MAIL_PASSWORD="abcd efgh ijkl mnop"
python app.py
```

**Windows (CMD):**
```cmd
set MAIL_USERNAME=greenity.contacto@gmail.com
set MAIL_PASSWORD=abcd efgh ijkl mnop
python app.py
```

**Linux/Mac:**
```bash
export MAIL_USERNAME=greenity.contacto@gmail.com
export MAIL_PASSWORD=abcd efgh ijkl mnop
python app.py
```

## 🔍 Verificar que Funciona

1. Reinicia tu aplicación
2. Ve a la página de contacto
3. Completa el formulario
4. Envía el mensaje
5. Deberías ver: "¡Mensaje enviado!" en lugar del error

## ⚠️ Errores Comunes

### "Sigo viendo el error"
- ✅ Verifica que copiaste la App Password completa (16 caracteres)
- ✅ Asegúrate de haber reiniciado Docker/la aplicación
- ✅ Verifica que la verificación en 2 pasos esté activada

### "No puedo generar App Password"
- Asegúrate de tener verificación en 2 pasos activada
- Si usas cuenta de Google Workspace, puede que necesites permisos de administrador

### "Funciona en local pero no en Docker"
- Verifica que agregaste `MAIL_PASSWORD` en `docker-compose.yaml`
- Reinicia con `docker-compose down && docker-compose up --build`

## 📝 Notas Importantes

1. **NUNCA** uses tu contraseña normal de Gmail
2. **SIEMPRE** usa una App Password
3. **NO** subas el archivo `.env` o `docker-compose.yaml` con la contraseña a Git
4. La App Password se ve así: `abcd efgh ijkl mnop` (puedes copiarla con o sin espacios)

## 🆘 ¿Necesitas Ayuda?

Si después de seguir estos pasos sigues teniendo problemas:
1. Verifica los logs del servidor para ver el error completo
2. Asegúrate de que la cuenta `greenity.contacto@gmail.com` existe
3. Verifica que la App Password sea para "Correo" y no para otra aplicación

