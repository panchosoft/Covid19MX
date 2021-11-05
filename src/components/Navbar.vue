<template>
  <div>
    <nav class="navbar navbar-dark navbar-expand-lg invisible py-0 py-md-0">
      <a class="navbar-brand" href="#">COVID-19 M&eacute;xico</a>
    </nav>
    <nav
      class="navbar navbar-dark fixed-top navbar-expand-lg py-0 py-md-0 navbar-toggleable-sm"
    >
      <a class="navbar-brand" href="#">COVID-19 M&eacute;xico</a>
      <button
        class="navbar-toggler navbar-toggler-right collapsed position-relative"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span> </span>
        <span> </span>
        <span> </span>
      </button>

      <div class="navbar-collapse collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              >Inicio <span class="sr-only">(current)</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/statistics"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              >Estad&iacute;sticas</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/about"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              >Acerca de</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>

<style scoped>
.navbar {
  background-color: #24292e !important;
}
.router-link-exact-active {
  color: white !important;
}
.navbar-toggler:focus,
.navbar-toggler:active {
  outline: 0;
}
.navbar-dark .navbar-toggler {
  color: #ffffff;
  border-color: transparent;
}
.navbar-toggler span {
  display: block;
  background-color: #fff;
  height: 3px;
  width: 25px;
  margin-top: 4px;
  margin-bottom: 4px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  position: relative;
  left: 0;
  opacity: 1;
}

.navbar-toggler span:nth-child(1),
.navbar-toggler span:nth-child(3) {
  -webkit-transition: transform 0.35s ease-in-out;
  -moz-transition: transform 0.35s ease-in-out;
  -o-transition: transform 0.35s ease-in-out;
  transition: transform 0.35s ease-in-out;
}

.navbar-toggler:not(.collapsed) span:nth-child(1) {
  position: absolute;
  left: 12px;
  top: 10px;
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  transform: rotate(135deg);
  opacity: 0.9;
}

.navbar-toggler:not(.collapsed) span:nth-child(2) {
  height: 12px;
  visibility: hidden;
  background-color: transparent;
}

.navbar-toggler:not(.collapsed) span:nth-child(3) {
  position: absolute;
  left: 12px;
  top: 10px;
  -webkit-transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  transform: rotate(-135deg);
  opacity: 0.9;
}
</style>
