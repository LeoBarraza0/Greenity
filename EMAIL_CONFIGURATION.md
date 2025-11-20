# Configuración de Envío de Correos - Greenity

## Resumen
Se ha implementado el sistema de envío de correos electrónicos para el formulario de contacto. Cuando un usuario completa y envía el formulario, se envía un correo a `greenity.contacto@gmail.com` con todos los datos ingresados.

## Configuración Requerida

### 1. Instalar Dependencias
Asegúrate de tener Flask-Mail instalado:
```bash
pip install flask-mail
```

O si usas el archivo requirements.txt:
```bash
pip install -r requirements.txt
```

### 2. Configurar Credenciales de Gmail

Para usar Gmail como servidor SMTP, necesitas:

#### Opción A: Usar App Password (Recomendado)

1. **Habilitar verificación en 2 pasos** en tu cuenta de Google:
   - Ve a [myaccount.google.com](https://myaccount.google.com)
   - Seguridad → Verificación en 2 pasos

2. **Generar una App Password**:
   - Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Selecciona "Correo" y "Otro (nombre personalizado)"
   - Ingresa "Greenity Contacto" como nombre
   - Copia la contraseña generada (16 caracteres)

3. **Configurar variables de entorno**:
   ```bash
   export MAIL_USERNAME=greenity.contacto@gmail.com
   export MAIL_PASSWORD=tu_app_password_aqui
   ```

#### Opción B: Variables de Entorno en Docker

Si usas Docker, agrega estas variables en tu `docker-compose.yaml`:
```yaml
environment:
  - MAIL_USERNAME=greenity.contacto@gmail.com
  - MAIL_PASSWORD=tu_app_password_aqui
```

#### Opción C: Configuración Directa (Solo para desarrollo)

Puedes modificar directamente en `Config/db.py` (NO recomendado para producción):
```python
app.config['MAIL_USERNAME'] = 'greenity.contacto@gmail.com'
app.config['MAIL_PASSWORD'] = 'tu_app_password'
```

## Estructura del Correo

El correo enviado incluye:
- **Asunto**: `[Greenity Contacto] {Asunto del usuario} - {Categoría}`
- **Destinatario**: greenity.contacto@gmail.com
- **Reply-To**: Email del usuario (permite responder directamente)
- **Contenido HTML** con:
  - Nombre completo
  - Email del usuario
  - Categoría de consulta
  - Asunto
  - Mensaje completo

## Endpoint API

### POST `/api/contacto`

**Headers requeridos:**
- `Content-Type: application/json`
- `X-CSRF-Token: {token_csrf}`

**Body (JSON):**
```json
{
  "fullName": "Nombre del usuario",
  "email": "usuario@example.com",
  "category": "general",
  "subject": "Asunto del mensaje",
  "message": "Contenido del mensaje",
  "csrf_token": "token_csrf"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Mensaje enviado exitosamente. Te responderemos en 24 horas."
}
```

**Respuesta de error (400/403/500):**
```json
{
  "success": false,
  "error": "Mensaje de error descriptivo"
}
```

## Seguridad

- ✅ Protección CSRF implementada
- ✅ Validación de campos requeridos
- ✅ Validación de formato de email
- ✅ Manejo de errores robusto

## Troubleshooting

### Error: "SMTP Authentication failed"
- Verifica que estés usando una App Password, no tu contraseña normal
- Asegúrate de que la verificación en 2 pasos esté habilitada

### Error: "Connection refused"
- Verifica que el puerto 587 esté abierto
- Para Gmail, asegúrate de usar `MAIL_USE_TLS=True`

### El correo no llega
- Revisa la carpeta de spam
- Verifica que las credenciales estén correctas
- Revisa los logs del servidor para más detalles

## Notas Importantes

1. **Nunca commits credenciales** en el código fuente
2. Usa variables de entorno para producción
3. Para Gmail, siempre usa App Passwords, nunca contraseñas normales
4. El sistema está configurado para usar TLS en el puerto 587 (Gmail estándar)

