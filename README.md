# Reportes Intermunicipales

PWA estática para captura y concentrado local, sin backend ni dependencias externas.

Sitio: https://chimeco795.github.io/ReportesIntermunicipales/

## Uso

1. Abrir el sitio con conexión en Chrome Android o Windows y esperar la primera carga.
2. Usar **Instalar aplicación** cuando Chrome lo ofrezca en la página, en su menú o en la barra de direcciones. La promoción depende del navegador; en una ventana privada puede no aparecer.
3. La vista **Capturar reporte** permite seleccionar municipio y tipo, redactar un reporte y copiar el mensaje incluso sin conexión. Se recuerda el municipio en este navegador. Para enviar por WhatsApp se necesita conexión y confirmar el destinatario y el envío dentro de WhatsApp.
4. En **Concentrado**, pegar el mensaje completo con su código `COI1:` e importar. Un código idéntico no se importa dos veces. El filtro permite consultar por municipio.
5. **Descargar Excel** genera un archivo `.xlsx` con todos los reportes almacenados, independientemente del filtro visible, también sin conexión.

Los reportes se guardan únicamente en `localStorage` del navegador del coordinador. **No hay sincronización entre dispositivos ni respaldo automático.** Borrar los datos del sitio elimina el concentrado. Descargar y respaldar el Excel periódicamente. No usar este prototipo como repositorio de datos confidenciales.

## Publicación y mantenimiento

GitHub Pages utiliza el workflow `.github/workflows/pages.yml`, activado por cada push a `main`. Publica únicamente HTML, manifest, Service Worker e íconos. En Settings → Pages, la fuente debe ser **GitHub Actions**.

`start_url`, `scope`, íconos y registro del Service Worker usan rutas relativas para funcionar bajo `/ReportesIntermunicipales/`. El `id` del manifest identifica explícitamente `/ReportesIntermunicipales/` para no confundirse con otras aplicaciones del dominio. El formulario y el exportador no cargan bibliotecas ni servicios remotos.

Tras modificar archivos de la aplicación, incrementar la versión `CACHE` de `sw.js` para renovar los recursos precargados. El Service Worker solo elimina cachés con el prefijo propio y usa la página guardada cuando no hay red. La primera visita sí requiere conexión.

El repositorio no contiene reportes reales ni archivos del concentrado.
