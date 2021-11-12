import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import userModule from './sys/user';
const mockModules: any[] = [];
mockModules.push(userModule);

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}