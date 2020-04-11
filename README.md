# COVID-19 en México (Mapa Interactivo/Dashboard)

Mapa interactivo para monitorear la evolución de COVID-19 en México diariamente.
La interfaz permite filtrar la información por estado, por el número de casos positivos, y por decesos, además de poder consultar datos históricos a través de una línea del tiempo.

Sitio web: [covid19mexico.net](https://covid19mexico.net)

![](https://labs.panchosoft.com/img/covid-19-mx.png)

## Origen de los datos

Los datos utilizados en las gráficas provienen del proyecto publicado en [@carranco-sga](https://github.com/carranco-sga/Mexico-COVID-19) / [Mexico-COVID-19](https://github.com/carranco-sga/Mexico-COVID-19), que a su vez provienen de la información oficial publicada por la Secretaría de Salud de México y el Gobierno Federal. La información se actualiza diariamente en el repositorio origen y en el repositorio de esta aplicación web por igual.

## Tecnología

La aplicación web fue desarrollada como un proyecto del framework [Vue.js](https://vuejs.org/) y [Vue CLI](https://cli.vuejs.org/) y está configurada para producir un sitio web 100% estático que no equiere de una tecnología de backend en particular. Además, el sitio web es un progressive web app" o PWA, por lo que la aplicación puede "instalarse" localmente en dispositivos móviles (iOS y Android) y en PCs que usen Google Chrome, para funcionar localmente sin necesidad de conexión a Internet.

El template original del sitio proviene del proyecto en Github [@amcharts](https://github.com/amcharts/covid-charts) / [covid-charts](https://github.com/amcharts/covid-charts), que además provee el motor de las gráficas.


## Instalación

Utiliza el administrador de paquetes [npm](https://www.npmjs.com/get-npm) para instalar el proyecto y todas sus dependencias automáticamente:

```
npm install
```

## Uso
### Compila el proyecto para desarrollo (hot-reloads)
```
npm run serve
```

### Minifica los archivos y compila el proyecto para producción
```
npm run build
```
Después de ejecutar este comando, el proyecto compilado estará disponible dentro de la carpeta "dist".