<template>
  <div class="home">
    <div class="home__button-wrapper">
      <button class="primary-button" @click="openModal">Create</button>
    </div>
    <h1>This is a table with some important data</h1>
    <b-table
      v-if="theTableData.length > 0"
      :data="theTableData"
      :columns="columns"
    ></b-table>
    <!-- <security-class-data-grid /> -->
    <modal ref="modalRef" @reset-modal="onCloseModal">
      <template v-slot:title>Create Security class</template>
      <template v-slot:body>
        <security-class-form />
      </template>
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import SecurityClassForm from "@/components/SecurityClassForm/SecurityClassForm.vue";
import Modal from "@/components/GenericModal/GenericModal.vue";

import { getColumns } from "@/assets/data";
import ApiClient from "@/services/api.client";
import { Message, TableData, Column } from "@/types/types";

@Component({
  components: { SecurityClassForm, Modal },
})
export default class Home extends Vue {
  @Action("notifications/updateMessage") updateMessage!: (
    message: Message
  ) => void;
  @Action("dynamicTable/updateTable") updateTable!: (message: null) => void;
  @Getter("dynamicTable/getTableRow") newTableRow!: TableData;

  tableData: TableData[] = [];
  loading = false;

  get theTableData(): TableData[] {
    const clonedData = this.tableData;

    const additionalData = this.newTableRow;
    if (additionalData !== null) {
      const isNewRecord = !clonedData.some(
        (item) =>
          item.id === additionalData.id || item.name === additionalData.name
      );

      this.processRecord(additionalData, isNewRecord, clonedData);
    }
    return this.calculateDynamicTotals(clonedData);
  }

  get columns(): Column[] {
    return getColumns();
  }

  setupMessage(isNewRecord: boolean): void {
    let message = isNewRecord
      ? "A new security class has been added"
      : "Security classes should be unique";
    let type = isNewRecord ? "success" : "warning";

    this.updateMessage({ message, type });
  }

  processRecord(
    additionalData: TableData,
    isNewRecord: boolean,
    clonedData: TableData[]
  ): void {
    if (Object.prototype.hasOwnProperty.call(additionalData, "id")) {
      if (isNewRecord) {
        clonedData.push(additionalData);
        this.setupMessage(isNewRecord);
      }
      this.setupMessage(isNewRecord);
    }
  }

  async loadData(): Promise<TableData[]> {
    try {
      const data: TableData[] = await ApiClient.getSecurityClass();
      this.loading = true;

      const transformedData = data.map((dataItem: TableData) => ({
        ...dataItem,
        randomNumber: Math.random(),
      }));

      this.tableData = transformedData;

      this.loading = false;
    } catch (error) {
      console.log(error, "Unexpexted error.");
    }
    return [];
  }

  calculateDynamicTotals(tableData: TableData[]): TableData[] {
    interface InitialTotals extends Partial<TableData> {
      id: string;
      name: string;
    }
    let totals: InitialTotals = { id: "total", name: "Total" };
    for (const item of tableData) {
      for (const key of Object.keys(item) as Array<keyof TableData>) {
        const value = item[key];

        if (key !== "id" && key !== "name" && typeof value === "number") {
          totals[key] = (totals[key] || 0) + value;
        }
      }
    }
    return [...tableData, totals];
  }

  openModal(): void {
    const modalComponent = this.$refs.modalRef as InstanceType<typeof Modal>;
    if (modalComponent) {
      modalComponent.openModal();
    }
  }

  onCloseModal(): void {
    const messageBlock = {
      message: undefined,
      type: undefined,
    };
    this.updateTable(null);
    this.updateMessage(messageBlock);
  }

  // mounted works fine if your ide complains about it
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async mounted() {
    await this.loadData();
  }
}
</script>

<style scoped lang="scss">
.home {
  &__button-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-right: 8px;
  }
}
</style>
@/services/api.client
