import dayjs from 'dayjs';
const toString = Object.prototype.toString;

/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, 'Function');
}

/**
 * @description: 是否已定义
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined';
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};
/**
 * @description: 是否为对象
 */
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object');
};

/**
 * @description:  是否为时间
 */
export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}

/**
 * @description:  是否为数值
 */
export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}
/**
 * @description:  是否为AsyncFunction
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'AsyncFunction');
}
/**
 * @description:  是否为promise
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (
    is(val, 'Promise') &&
    isObject(val) &&
    isFunction(val.then) &&
    isFunction(val.catch)
  );
}
/**
 * @description:  是否为字符串
 */
export function isString(val: unknown): val is string {
  return is(val, 'String');
}

/**
 * @description:  是否为boolean类型
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

/**
 * @description: 是否客户端
 */
export const isClient = () => {
  return typeof window !== 'undefined';
};

/**
 * @description: 是否为浏览器
 */
export const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window');
};

export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

export const isServer = typeof window === 'undefined';

// 是否为图片节点
export function isImageDom(o: Element) {
  return o && ['IMAGE', 'IMG'].includes(o.tagName);
}

/**
 * @description 处理首字母大写 abc => Abc
 * @param str
 */
export const changeStr = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * @description 异步导入组件
 * @param cateName 组件的分类
 * @param compName 组件名称
 * @return {Promise<*>}
 */
export const getAsyncComp = async (cateName, compName = 'index.vue') => {
  const result = await import(
    /* webpackChunkName: "[request]" */ `@/components/${cateName}/${compName}`
  );
  return result.default;
};

/**
 * @description 随机生成颜色
 * @param {string} type
 * @return {string}
 */
export const randomColor = (type: 'rgb' | 'hex' | 'hsl'): string => {
  switch (type) {
    case 'rgb':
      return window.crypto.getRandomValues(new Uint8Array(3)).toString();
    case 'hex':
      return (
        '#' +
        Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, `${Math.random() * 10}`)
      );
    case 'hsl':
      // 在25-95%范围内具有饱和度，在85-95%范围内具有亮度
      return [
        360 * Math.random(),
        100 * Math.random() + '%',
        100 * Math.random() + '%'
      ].toString();
  }
};

/**
 * 复制文本
 * @param text
 */
export const copyText = (text: string) => {
  return new Promise(resolve => {
    const copyInput = document.createElement('input'); //创建一个input框获取需要复制的文本内容
    copyInput.value = text;
    document.body.appendChild(copyInput);
    copyInput.select();
    document.execCommand('copy');
    copyInput.remove();
    resolve(true);
  });
};

/**
 * @description 判断字符串是否是base64
 * @param {string} str
 */
export const isBase64 = (str: string): boolean => {
  if (str === '' || str.trim() === '') {
    return false;
  }
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
};
// 对象转JSON
export const toJSON = obj => {
  return JSON.stringify(obj, (key, value) => {
    switch (true) {
      case typeof value === 'undefined':
        return 'undefined';
      case typeof value === 'symbol':
        return value.toString();
      case typeof value === 'function':
        return value.toString();
      default:
        break;
    }
    return value;
  });
};

/***
 * @description 是否是生产环境
 */
export const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV!);
export const IS_DEV = ['development'].includes(process.env.NODE_ENV!);

/***
 * @description 格式化日期
 * @param time
 */
export const formatDate = time => dayjs(time).format('YYYY-MM-DD HH:mm:ss');

/**
 *  @description 将一维数组转成树形结构数据
 * @param items
 * @param id
 * @param link
 */
export const generateTree = (items, id = 0, link = 'parent') => {
  return items
    .filter((item: { [x: string]: number }) => item[link] == id)
    .map((item: { departmentid: number | undefined }) => ({
      ...item,
      slots: { title: 'name' },
      children: generateTree(items, item.departmentid)
    }));
};

/**
 *
 * @param {string} viewPath 页面的路径 `@/view/${viewPath}`
 * @param {string} viewFileName  页面文件 默认 index.vue
 */
export const getAsyncPage = (viewPath: string, viewFileName = 'index') => {
  if (viewPath.endsWith('.vue')) {
    return () =>
      import(/* webpackChunkName: "[request]" */ `@/views/${viewPath}`);
  } else {
    return () =>
      import(
        /* webpackChunkName: "[request]" */ `@/views/${viewPath}/${viewFileName}.vue`
      );
  }
};

/**
 * / _ - 转换成驼峰并将view替换成空字符串
 * @param {*} name name
 */
export const toHump = name => {
  return name
    .replace(/[\-\/\_](\w)/g, (all, letter) => {
      return letter.toUpperCase();
    })
    .replace('views', '');
};
