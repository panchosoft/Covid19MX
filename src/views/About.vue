<template>
  <main role="main" class="flex-shrink-0 about">
    <div class="container">
      <h1 class="mt-5">Mapa interactivo de COVID-19 en M&eacute;xico</h1>
      <p>Datos actualizados al <mark>16/4/2020 09:04 PM CDT</mark>.</p>
      <p class="lead">
        Este sitio web fue desarrollado en base a la informaci&oacute;n oficial
        publicada por el Gobierno Federal de M&eacute;xico y la
        Secretar&iacute;a de Salud. Los datos utilizados en las gr&aacute;ficas
        provienen de los archivos publicados por Gabriel Carranco en
        <a
          target="_blank"
          href="https://github.com/carranco-sga/Mexico-COVID-19"
        >
          @carranco-sga</a
        >
        y se actualizan diariamente.
      </p>

      <p class="lead">
        Mi plan es continuar actualizando el portal con mejoras y nuevas
        gr&aacute;ficas, y adem&aacute;s publicar el c&oacute;digo fuente
        completo en Github pr&oacute;ximamente. Si deseas consumir los datos
        utilizados por esta aplicaci&oacute;n en formato JSON, puedes utilizar
        los siguientes archivos:
      </p>
      <p>
        <a
          href="https://covid19mexico.net/data/mx_timeline.json"
          target="_blank"
          class="mb-0"
          >/data/mx_timeline.json</a
        ><br />
        <a
          href="https://covid19mexico.net/data/mx_total_timeline.json"
          target="_blank"
          class="mb-0"
          >/data/mx_total_timeline.json</a
        >
      </p>
      <p class="lead pb-4">
        Sitio web mantenido por Francisco Leyva (<a
          target="_blank"
          href="https://twitter.com/panchosoft"
          >@panchosoft</a
        >), "De mi rancho, a tu cocina".
      </p>
    </div>
  </main>
</template>
<style scoped>
.about {
  height: 920px;
}
</style>
