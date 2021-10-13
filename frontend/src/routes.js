// import Login from './pages/public/Login.svelte'
// import AdminDashboard from './pages/admin/AdminDashboard.svelte'
// import Tags from './pages/admin/Tags.svelte'
// import ManageAdmin from './pages/admin/ManageAdmin.svelte'
// import AddTag from './pages/admin/AddTag.svelte'
// import UploadTags from './pages/admin/UploadTags.svelte'
// import Tag from './pages/admin/Tag.svelte'
// import PrintTags from './pages/admin/PrintTags.svelte'
// import ScanTag from './pages/admin/ScanTag.svelte'
// import Page404 from './pages/public/Page404.svelte'

import AddResult from './pages/AddResult.svelte'
import LgaResults from './pages/LgaResults.svelte'
import PuResults from './pages/PuResults.svelte'
import MainLayout from './pages/MainLayout.svelte'

// Also update adminRoutes in utilities

const routes = [
  {
    name: '/',
    redirectTo: 'results/add',
  },
  // {
  //   name: 'tag/:tagNo',
  //   component: Tag,
  // },
  // {
  //   name: '/lga_results',
  //   component: LgaResults,
  // },
  // {
  //   name: '/tags',
  //   redirectTo: 'admin/tags',
  //   isExcludedFromNav: true,
  // },

  // using nested for all result pages
  {
    name: '/results',
    component: MainLayout,
    nestedRoutes: [
      {
        name: 'add',
        component: AddResult,
      },
      {
        name: 'lga',
        component: LgaResults,
      },
      {
        name: 'polling_unit',
        component: PuResults,
      },
      // {
      //   name: 'tags',
      //   component: Tags,
      //   path: 'tags',
      //   label: 'All Vehicle Tags',
      // },
      // {
      //   name: 'manage-admin',
      //   component: ManageAdmin,
      // },
      // {
      //   name: 'add-tag',
      //   component: AddTag,
      // },
      // {
      //   name: 'upload-tags',
      //   component: UploadTags,
      // },
      // {
      //   name: 'scan',
      //   component: ScanTag,
      // },
    ],
  },

  // { name: '/login', component: Login, isExcludedFromNav: true },
  // { name: '404', component: Page404 },
]

export { routes }
