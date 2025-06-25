import { GitContributors } from "D:/Project/formkit-component/element-plus-formkit/pages/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-_4e6e01b015b1b1850757bf46ba686127/node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js";
import { GitChangelog } from "D:/Project/formkit-component/element-plus-formkit/pages/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-_4e6e01b015b1b1850757bf46ba686127/node_modules/@vuepress/plugin-git/lib/client/components/GitChangelog.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  },
};
