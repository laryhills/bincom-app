<script>
  import { Route } from 'svelte-router-spa'
  import { routeIsActive, Navigate } from 'svelte-router-spa'
  import { showMobileMenu } from '../stores/menu'

  export let currentRoute

  const handleMobileMenu = () => {
    showMobileMenu.set(!$showMobileMenu)
  }
</script>

<nav class="navbar is-transparent">
  <div class="navbar-brand">
    <a href="/" class="navbar-item">
      <img src="/logo.png" alt="brand-logo" style="max-height:45px;" />
    </a>
    <span class="navbar-item" style="font-weight: bold;">2011 Elections </span>
    <div class="navbar-burger" on:click={handleMobileMenu}>
      <span />
      <span />
      <span />
    </div>
  </div>

  <div
    id="navbarExampleTransparentExample"
    class="navbar-menu"
    class:is-active={$showMobileMenu}
  >
    <div class="navbar-start" />

    <div class="navbar-end">
      <div class="navbar-item">
        <p class="control py-1 px-1">
          <Navigate to="/" title="Add Result">Add Result</Navigate>
        </p>
        <p class="control py-1 px-1">
          <Navigate to="/results/polling_unit" title="Polling Units Results">
            Polling Units Results
          </Navigate>
        </p>
        <p class="control py-1 px-1">
          <Navigate to="/results/lga" title="LGA Results">LGA Results</Navigate>
        </p>
      </div>
    </div>
  </div>
</nav>

<section class="main-content">
  <div class="container">
    <div class="section forMobile">
      <Route {currentRoute} />
    </div>
  </div>
</section>
