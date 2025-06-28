import fs from 'fs';

const packagePath = 'pages/package.json';
const packageJson = JSON.parse(fs.readFileSync(packagePath));

packageJson.dependencies['element-plus-formkit'] = 'latest';

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));