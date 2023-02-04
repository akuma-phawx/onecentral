import { createApp } from 'vue';
import './scss/styles.scss';
import App from '@/App.vue';
import store from './stores/store';

// Import our custom CSS
import './scss/styles.scss';

createApp(App).use(store).mount('#app');
