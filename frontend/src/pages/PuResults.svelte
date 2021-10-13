<script>
  import { onMount } from 'svelte'
  import axios from 'axios'
  import toastr from 'toastr'
  import toastrConfig from '../ui/toastr-config'
  import { showMobileMenu } from '../stores/menu'
  // export let params
  // export let currentRoute

  let puList = []
  let puID
  let loadingResults = false
  let puResults = []

  const getLGAResults = async () => {
    loadingResults = true
    puResults = await []
    try {
      let response = await axios.get(`${process.env.API_ROOT}/api/pu/${puID}`)
      if (!response.data.find) {
        loadingResults = false
        toastr.warning(response.data.message)
      } else {
        loadingResults = false
        puResults = await response.data.result
      }
    } catch (e) {
      loadingResults = false
      console.log(e)
    }
  }

  onMount(async () => {
    await showMobileMenu.set(false)
    try {
      let response = await axios.get(`${process.env.API_ROOT}/api/pu/list`)
      if (!response.data.get) {
        toastr.warning(response.data.message)
      } else {
        puList = await response.data.result
      }
    } catch (e) {
      console.log(e)
    }
  })
</script>

<svelte:head>
  <title>Polling Units Results</title>
</svelte:head>

<div class="section pt-4 pb-0">
  <div class="card is-shadowless">
    <div class="card-header">
      <p class="card-header-title">Polling Units Results</p>
    </div>
    <div class="card-content">
      <div class="content">
        {#if puList.legnth !== 0}
          <form
            action=""
            on:submit|preventDefault={getLGAResults}
            autocomplete="off"
          >
            <div class="field">
              <div class="control">
                <div class="select">
                  <select disabled>
                    <option selected disabled value="">Delta State</option>
                  </select>
                </div>
                <div class="select">
                  <select bind:value={puID}>
                    <option selected disabled value=""
                      >Choose Polling Unit</option
                    >
                    {#each puList as pu}
                      <option value={pu.uniqueid}
                        >{`${pu.polling_unit_number} - ${pu.polling_unit_name}`}</option
                      >
                    {/each}
                  </select>
                </div>
                <button
                  class="button is-success "
                  class:is-loading={loadingResults}
                  disabled={!puID}
                  type="submit"
                >
                  Load Results
                </button>
              </div>
            </div>
            <div class="field" />
          </form>
          <div class="table-container">
            <table
              class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            >
              <thead class="sticky">
                <tr>
                  <th>Party Abbreviation</th>
                  <th>Results</th>
                </tr>
              </thead>
              {#if loadingResults}
                <tbody>
                  <tr>
                    <td class="center" colspan="100%">
                      <span> Loading Results </span>
                    </td>
                  </tr>
                </tbody>
              {:else if puResults.length === 0}
                <tbody>
                  <tr>
                    <td class="center" colspan="100%">
                      <span> No Results To Display </span>
                    </td>
                  </tr>
                </tbody>
              {:else}
                <tbody>
                  {#each puResults as result}
                    <tr>
                      <td>{result.party_abbreviation}</td>
                      <td>{result.total_party_score}</td>
                    </tr>
                  {/each}
                </tbody>
              {/if}
            </table>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .sticky {
    background: white;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .center {
    text-align: center;
    font-style: italic;
  }

  .center > span {
    padding: 10px 10px;
    float: left;
    width: 100%;
  }
</style>
