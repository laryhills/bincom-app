<script>
  import { onMount } from 'svelte'
  import axios from 'axios'
  import toastr from 'toastr'
  import toastrConfig from '../ui/toastr-config'
  import { showMobileMenu } from '../stores/menu'
  import { add, parseISO } from 'date-fns'
  import format from 'date-fns/format'
  // export let params
  // export let currentRoute

  let lgaList = []
  let puList = []
  let lgaID
  let puID
  let loadingPu = false
  let loadingSave = false
  let lgaResults = []
  let party = []
  let dataEntryOfficer = ''
  let userIPAddress = '191.168.1.1'

  const loadPuList = async () => {
    loadingPu = true
    puList = []
    puID = ''
    try {
      let response = await axios.get(
        `${process.env.API_ROOT}/api/pu/list/${lgaID}`
      )
      if (!response.data.get) {
        loadingPu = false
      } else {
        puList = await response.data.result
        loadingPu = false
      }
    } catch (e) {
      console.log(e)
      loadingPu = false
    }
  }

  const saveResults = async () => {
    loadingSave = true
    let sv = false
    party.forEach(async (p) => {
      if (p.partyscore != 0) {
        let formData = {
          polling_unit_uniqueid: puID,
          party_abbreviation: p.partyname,
          party_score: p.partyscore,
          entered_by_user: dataEntryOfficer,
          date_entered: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          user_ip_address: userIPAddress,
        }
        try {
          let response = await axios.post(
            `${process.env.API_ROOT}/api/pu`,
            formData
          )
          if (!response.data.save) {
            loadingSave = false
            toastr.warning(response.data.message)
          } else {
            sv = await true
            loadingSave = false
          }
        } catch (e) {
          loadingResults = false
          console.log(e)
        }
      }
    })
    if (sv) {
      toastr.success('Results Saved')
    }
    await party.forEach((element) => {
      element.partyscore = 0
    })
  }

  const getLGAResults = async () => {
    loadingResults = true
    lgaResults = await []
    try {
      let response = await axios.get(`${process.env.API_ROOT}/api/lga/${lgaID}`)
      if (!response.data.find) {
        loadingResults = false
        toastr.warning(response.data.message)
      } else {
        loadingResults = false
        lgaResults = await response.data.result
      }
    } catch (e) {
      loadingResults = false
      console.log(e)
    }
  }

  onMount(async () => {
    await showMobileMenu.set(false)
    try {
      let response = await axios.get(`${process.env.API_ROOT}/api/lga/list`)
      if (!response.data.get) {
        toastr.warning(response.data.message)
      } else {
        lgaList = await response.data.result
      }
    } catch (e) {
      console.log(e)
    }
    try {
      let response = await axios.get(`${process.env.API_ROOT}/api/party/`)
      if (!response.data.get) {
        toastr.warning(response.data.message)
      } else {
        party = await response.data.result
        await party.forEach((element) => {
          element.partyscore = 0
        })
      }
    } catch (e) {
      console.log(e)
    }
  })
</script>

<svelte:head>
  <title>Add Results</title>
</svelte:head>

<div class="section pt-4 pb-0">
  <div class="card is-shadowless">
    <div class="card-header"><p class="card-header-title">Add Results</p></div>
    <div class="card-content">
      <div class="content">
        <form
          action=""
          on:submit|preventDefault={saveResults}
          autocomplete="off"
        >
          <div class="field">
            <div class="control">
              <div class="select px-2">
                <select disabled>
                  <option selected disabled value="">Delta State</option>
                </select>
              </div>
              <div class="select px-2">
                <select bind:value={lgaID} on:change={loadPuList}>
                  <option selected disabled value="">Choose LGA</option>
                  {#each lgaList as lga}
                    <option value={lga.lga_id}>{lga.lga_name}</option>
                  {/each}
                </select>
              </div>
              <div class="select px-2">
                <select bind:value={puID} disabled={puList.length == 0}>
                  {#if !lgaID}
                    <option selected disabled value="">Choose LGA First</option>
                  {:else if loadingPu}
                    <option selected disabled value=""
                      >Loading Polling Units</option
                    >
                  {:else if puList.length == 0}
                    <option selected disabled value="">No Polling Units</option>
                  {:else}
                    <option selected disabled value=""
                      >Choose Polling Unit</option
                    >
                  {/if}
                  {#each puList as pu}
                    <option value={pu.uniqueid}
                      >{`${pu.polling_unit_number} - ${pu.polling_unit_name}`}</option
                    >
                  {/each}
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              {#each party as p}
                <div class="field">
                  <label for="" class="label">{p.partyname}</label>
                  <div class="control">
                    <input
                      bind:value={p.partyscore}
                      type="text"
                      class="input"
                      style="width: auto;"
                      disabled={!puID}
                      required
                    />
                  </div>
                </div>
              {/each}
              <div class="field">
                <label for="" class="label">Data Entry Officer Name</label>
                <div class="control">
                  <input
                    bind:value={dataEntryOfficer}
                    type="text"
                    class="input"
                    style="width: auto;"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <button
              class="button is-success "
              class:is-loading={loadingSave}
              disabled={!puID}
              type="submit"
            >
              Save Results
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
