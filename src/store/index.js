import {createStore} from 'vuex';
import authModule from "./modules/authModule";
import commentsModule from "./modules/commentsModule";
import postsModule from './modules/postsModule';

const store = createStore({
    modules: [
        authModule,
        commentsModule,
        postsModule
    ]
});

export default store;