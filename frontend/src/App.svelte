<script>
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes'
</script>

<main style="overflow: hidden;">
  <Router {routes} />
</main>

<style global>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&family=Roboto:wght@100;300&display=swap');
  * {
    font-family: Roboto;
  }
</style>
