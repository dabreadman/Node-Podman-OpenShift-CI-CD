import TheHomePage from './pages/TheHomePage.vue'
import StatsPage from './pages/StatsPage.vue'


export const routes = [

  {
     path: '/',
     component: TheHomePage,
     meta: {
       metaTags: [
         {
           name: 'Home Page',
           content: 'This is the first page',
         }
       ],
     }
  },
  {
     path: '/stats',
     component: StatsPage,
     meta: {
       metaTags: [
         {
           name: 'Home Page',
           content: 'This is the second page',
         }
       ],
     }
  },

]
