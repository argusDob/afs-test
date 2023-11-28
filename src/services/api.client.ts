import { securityClass, transfers } from "@/assets/data";

import { TableData, Transaction } from "@/types/types";

class ApiClient {
  async getSecurityClass(): Promise<TableData[]> {
    return new Promise<TableData[]>((resolve, reject) => {
      setTimeout(() => {
        if (securityClass.length) {
          resolve(securityClass);
        } else {
          reject("Security Classes not found");
        }
      }, 500);
    });
  }

  async getTransfers(): Promise<Transaction[]> {
    return new Promise<Transaction[]>((resolve, reject) => {
      setTimeout(() => {
        if (transfers.length) {
          resolve(transfers);
        } else {
          reject("Transfers Classes not found");
        }
      }, 500);
    });
  }
}

// The Singleton Pattern ()
export default new ApiClient();
