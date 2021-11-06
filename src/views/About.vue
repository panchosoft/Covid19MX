<template>
  <main role="main" class="flex-shrink-0 about">
    <div class="container">
      <h1 class="pt-3">Mapa interactivo de COVID-19 en M&eacute;xico</h1>
      <p>
        &Uacute;ltima actualizaci&oacute;n: <mark>{{ buildDateTime }}</mark
        >.
      </p>
      <p class="lead">
        Este sitio web fue desarrollado en base a la informaci&oacute;n oficial
        publicada por el Gobierno Federal de M&eacute;xico y la
        Secretar&iacute;a de Salud, los datos utilizados en las gr&aacute;ficas
        provienen de los archivos publicados por Gabriel Carranco en
        <a
          target="_blank"
          href="https://github.com/carranco-sga/Mexico-COVID-19"
        >
          @carranco-sga</a
        >.
      </p>

      <p class="lead">
        Mi plan es continuar actualizando el portal con nuevas gr&aacute;ficas,
        estad&iacute;sticas, y ademas seguir agregando mejoras de dise&ntilde;o
        y rendimiento. El c&oacute;digo fuente y los datos pre-procesados se
        encuentran disponibles en el siguiente repositorio en Github:
      </p>
      <p>
        <a
          href="https://github.com/panchosoft/Covid19MX"
          target="_blank"
          class="mb-0"
          >https://github.com/panchosoft/Covid19MX</a
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
    <div class="container">
      <ul
        class="list-group list-group-horizontal border-0 mx-auto justify-content-center"
      >
        <li class="list-group-item">
          <img
            src="/img/icons/aws.png"
            title="Hospedado en Amazon Web Services (S3 + Cloudfront)"
          />
        </li>
        <li class="list-group-item">
          <a href="https://vuejs.org/" target="_blank"
            ><img
              src="/img/icons/vue.png"
              title="Desarrollado usando Vue.js framework"
          /></a>
        </li>
        <li class="list-group-item">
          <a
            href="https://github.com/panchosoft/Covid19MX"
            target="_blank"
            class="mb-0"
            ><img
              src="/img/icons/github.png"
              title="Código fuente disponible en Github"
          /></a>
        </li>
        <li class="list-group-item mt-2">
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps"
            target="_blank"
            class="mb-0"
            ><img
              class="pwa-icon"
              src="/img/icons/pwa.png"
              title="Progressive Web App"
          /></a>
        </li>
      </ul>
      <br />
    </div>
  </main>
</template>
<style scoped>
.list-group-item {
  border: none;
  padding-left: 10px;
  padding-right: 10px;
  background: transparent;
}
.list-group-item img {
  width: 48px;
  height: 48px;
}
.pwa-icon {
  width: 70px !important;
  height: 26px !important;
}
.container {
    max-width: 1150px;
}
</style>
<script>
export default {
  name: "AboutView",
  data: function () {
    return {
      buildDateTime: this.getBuildTime(),
    };
  },
  methods: {
    getBuildTime() {
      // Get build time from root <HTML> element
      var buildTime = document.documentElement.dataset.buildTimestamp;

      if (buildTime) {
        return new Date(buildTime).toLocaleString();
      }
    },
  },
};
</script>
