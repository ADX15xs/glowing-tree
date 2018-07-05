import Vue from 'vue'
import Router from 'vue-router'
//- part1-flag
import flag from '@/components/bottomRouter/part1-flag/flag'
import flagDtl from '@/components/bottomRouter/part1-flag/flagTodayDetailed'

//- part2-friends
import contacts from '@/components/bottomRouter/part2-friends/contacts'
import friendDtl from '@/components/bottomRouter/part2-friends/friendDetailed'
import Search from '@/components/bottomRouter/part2-friends/searchresult'

//- part3-overview
import overview from '@/components/bottomRouter/part3-overview/overview'

//- part4-achievement
import achievement from '@/components/bottomRouter/part4-achievement/achievement'
import dayList from '@/components/bottomRouter/part4-achievement/dayList'
import weekList from '@/components/bottomRouter/part4-achievement/weekList'
import monthList from '@/components/bottomRouter/part4-achievement/monthList'

//- part5-setting
import set from '@/components/bottomRouter/part5-setting/set'
import userInfo from '@/components/bottomRouter/part5-setting/userInfo'
import theme from '@/components/bottomRouter/part5-setting/theme'
import personal from '@/components/bottomRouter/part5-setting/personal'
import About from '@/components/bottomRouter/part5-setting/about'
import donateUs from '@/components/bottomRouter/part5-setting/donateUs'

//- login-register
import Login from '@/components/login-register/Login'
import Reg from '@/components/login-register/Reg'


Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    { path: '/', component: flag },
    { path: '/flagDtl', component: flagDtl },

    { path: '/cnt', component: contacts },
    { path: '/friendDtl', component: friendDtl},

    { path: '/ovv', component: overview },
    
    { path: '/ach', component: achievement },
    { path: '/dayList', component: dayList },
    { path: '/weekList', component: weekList },
    { path: '/monthList', component: monthList },

    { path: '/set', component: set },
    { path: '/userInfo', component: userInfo },
    { path: '/theme', component: theme },
    { path: '/personal', component: personal },
    { path: '/about', component:About },
    { path: '/donateUs', component: donateUs },

    { path: '/login', component:Login },
    { path: '/register', component:Reg },

    { path: '/search', component:Search },
  ]
})
