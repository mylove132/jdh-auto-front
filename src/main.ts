import { createApp } from 'vue';
import App from './App.vue';
import { setupAntd } from './plugins';
import { setupRouter } from './router';
import { setupStore } from './store';

const app = createApp(App);
setupAntd(app);
setupStore(app);
setupRouter(app);
app.mount('#app');
