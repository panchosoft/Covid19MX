<template>
  <div>
    <nav class="navbar navbar-dark navbar-expand-lg invisible">
      <a class="navbar-brand" href="#">COVID-19 M&eacute;xico</a>
    </nav>
    <nav class="navbar navbar-dark fixed-top navbar-expand-lg">
      <a class="navbar-brand" href="#">COVID-19 M&eacute;xico</a>
      <button
        class="navbar-toggler mt-1"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <svg
          class="bi bi-list"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/"
              >Inicio <span class="sr-only">(current)</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">Acerca de</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style>
.navbar {
  background-color: #24292e !important;
}
</style>
