import {createStore} from 'vuex';
import authModule from "./modules/authModule";

const store = createStore({
    modules: [
        authModule
    ]
});

export default store;