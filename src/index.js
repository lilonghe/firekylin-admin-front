import dva from 'dva';
import './index.css';
import createHistory from "history/createBrowserHistory";
import './init';
// 1. Initialize
const app = dva({
  history: createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/session').default);
app.model(require('./models/system').default);
app.model(require('./models/post').default);
app.model(require('./models/cate').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#app');
