import { createStore } from 'vuex'
import user from './modules/user'
import permission from './modules/permission'
const store  = createStore({
    modules: {
        user,
        permission
    }
})
export default store