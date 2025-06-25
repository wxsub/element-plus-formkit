export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"History\":{\"path\":\"/category/history/\",\"indexes\":[0,1]},\"Category A\":{\"path\":\"/category/category-a/\",\"indexes\":[2,3,4,5,6,7,8,9,10,11,12,13]},\"Category B\":{\"path\":\"/category/category-b/\",\"indexes\":[2,3,4,5,6,7,8,10,11,12]},\"Category C\":{\"path\":\"/category/category-c/\",\"indexes\":[14,15]}}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{\"WWI\":{\"path\":\"/tag/wwi/\",\"indexes\":[1]},\"WWII\":{\"path\":\"/tag/wwii/\",\"indexes\":[0]},\"tag A\":{\"path\":\"/tag/tag-a/\",\"indexes\":[5,6,7,8,9,13]},\"tag B\":{\"path\":\"/tag/tag-b/\",\"indexes\":[5,6,7,8,9,13]},\"tag C\":{\"path\":\"/tag/tag-c/\",\"indexes\":[2,3,4,10,11,12]},\"tag D\":{\"path\":\"/tag/tag-d/\",\"indexes\":[2,3,4,10,11,12]},\"tag E\":{\"path\":\"/tag/tag-e/\",\"indexes\":[14,15]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

