export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"D:/Project/formkit-component/element-plus-formkit/pages/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":""} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Project/formkit-component/element-plus-formkit/pages/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/Project/formkit-component/element-plus-formkit/pages/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
