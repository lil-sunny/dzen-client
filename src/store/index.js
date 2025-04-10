import {createStore} from 'vuex';
import authModule from "./modules/authModule";
import commentsModule from "./modules/commentsModule";

const store = createStore({
    modules: [
        authModule,
        commentsModule
    ]
});

export default store;