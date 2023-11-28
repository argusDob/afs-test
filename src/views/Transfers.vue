<template>
  <div class="transfers">
    <h1 class="title is-1">Transfers</h1>
    <input-text v-bind="fields" @change="hanldeSearch" />
    <div>
      <div class="transfers__button">
        <button class="primary-button" @click="updateTransfers">
          Update transfers
        </button>
      </div>
      <transition name="transition">
        <section>
          <div v-if="searchedTransfers.length">
            <transfer-row
              :key="transfer.transactionIdentifier"
              v-for="transfer in searchedTransfers"
              :transfer="transfer"
            />
          </div>
          <h1 v-else>No Transactions found</h1>
        </section>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TransferRow from "../components/TransferRow/TransferRow.vue";
import InputText from "../components/InputText/InputText.vue";

import { Transaction, InputFields, ValidationReport } from "@/types/types";
import { searchInputFields } from "@/assets/forms.config";
import ApiClient from "@/services/api.client";
import convertDateFormat from "@/utils/dateUtils";

@Component({
  name: "Transfers",
  components: { TransferRow, InputText },
})
export default class Transfers extends Vue {
  searchTerms = "";
  transfers: Transaction[] = [];

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get searchedTransfers() {
    const searchTerm = this.searchTerms.toLowerCase();

    if (!searchTerm) {
      return this.transfers;
    }
    const filterFunctions = [
      (transfer: Transaction) =>
        transfer.type.toLowerCase().includes(searchTerm),
      (transfer: Transaction) =>
        transfer.recordDate &&
        transfer.recordDate.toString().toLowerCase().includes(searchTerm),
      // Add more filter functions for additional criteria
      // (You can have a total of 10 filter functions here)
    ];

    // Apply any filter function and combine the results
    return this.transfers.filter((transfer: Transaction) =>
      filterFunctions.some((filterFn) => filterFn(transfer))
    );
  }

  get fields(): InputFields[] {
    return searchInputFields;
  }

  hanldeSearch(validationReport: ValidationReport): void {
    if (typeof validationReport.value === "string") {
      this.searchTerms = validationReport.value;
    }
  }

  async loadData(): Promise<Transaction[]> {
    try {
      const data: Transaction[] = await ApiClient.getTransfers();

      const transfers = data.map((transaction: Transaction) => {
        if (transaction.recordDate != null) {
          return {
            ...transaction,
            recordDate: convertDateFormat(transaction.recordDate),
          };
        } else {
          return {
            ...transaction,
          };
        }
      });
      this.transfers = transfers;
    } catch (error) {
      console.log(error, "Unexpexted error.");
    }
    return [];
  }

  updateTransfers(): void {
    this.transfers.forEach(() => {
      this.$set(
        this.transfers,
        "forgottenProperty",
        `Important data: ${(Math.random() * 100000000).toString().slice(1, 8)}`
      );
    });

    this.transfers[0] = {
      splitFactor: null,
      exDate: null,
      amount: 10000,
      companyId: "568fa387-43d1-499a-bba2-25089f5a881a",
      notes: null,
      pricePerShare: null,
      recordDate: "2021-07-01",
      securityClassId: "ab983cfe-a932-4e25-98ea-f5928a839fe1",
      securityClass: { name: "Common" },
      state: "OLD",
      toSecurityHolderId: "dd971e7f-386b-45dd-93e1-666fbeed0a55",
      toSecurityHolder: {
        fullName: "Jeff Dunlap",
        type: "PERSON",
      },
      transactionIdentifier: "41095fdb-6b52-4257-aef8-dc523d782e53",
      positionWithinDay: 3,
      type: "ISSUE_STOCK",
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async mounted() {
    await this.loadData();
  }
}
</script>
<style scoped lang="scss">
.transfers {
  &__button {
    display: flex;
    justify-content: flex-end;
    margin: 8px 0 8px 0;
  }
}
</style>
