import HomePage from './pages/Home'
import CountryPage from './pages/Country'

export default {
  root: 'home',
  routes: [
    {
      path: 'home',
      component: HomePage,
    },
    {
      path: 'country/:cioc',
      component: CountryPage,
    },
  ],
}
