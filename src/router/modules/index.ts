// generate components map
export const constantRouterComponents: Array<string> = [];

// auto load
const modulesFiles = import.meta.globEager('./*.ts');

for (const md in modulesFiles) {
  constantRouterComponents.push(modulesFiles[md].default);
}
