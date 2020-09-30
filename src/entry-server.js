import { createApp } from './app.js';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, store, router, App } = createApp();

    router.push(context.url)

    router.onReady(() => {
        const matchedComponents = router.getMatchedComponents()

        console.log(context.url)
        console.log(matchedComponents)

        if (!matchedComponents.length) {
            return reject({ code: 404})
        }
      
        Promise.all(matchedComponents.map(component => {
            if (component.asyncData) {
                return component.asyncData({ store })
            }
        })).then((result) => {
          // 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中
          context.state = store.state;
      
          console.log(222);
          console.log(store.state);
          console.log(context.state);
          console.log(context);
      
          resolve(app);
        }, reject);
    })
  });
}