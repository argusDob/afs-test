<template>
  <div class="security-class">
    <message-block :messageBlock="message" />
    <form class="security-class__form" @submit.prevent="submitForm">
      <div v-for="(field, index) in formsFiedls" :key="index">
        <input-text v-bind="field" @change="handleInputsFields" />
      </div>
      <button class="primary-button" type="submit">Save</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { v4 as uuidv4 } from "uuid";

import InputText from "@/components/InputText/InputText.vue";
import MessageBlock from "@/components/MessageBlock/MessageBlock.vue";

import { securityClassForm } from "@/assets/forms.config";
import { TableData, Message, InputFields } from "@/types/types";

type ValidationReport = {
  name: string;
  value: string | number | undefined;
  isValid: boolean;
};

@Component({
  components: { InputText, MessageBlock },
})
export default class SecurityClassForm extends Vue {
  validationReportList: ValidationReport[] = [];
  messageBlock = {};

  @Getter("notifications/getMessage") message!: Message;
  @Action("form/updateTable") updateTable!: (newTableRow: TableData) => void;
  @Action("notifications/updateMessage") updateMessage!: (
    newTableRow: Message
  ) => void;

  get formsFiedls(): InputFields[] {
    return securityClassForm;
  }

  submitForm(): void {
    const isValid = this.handleValidation();
    if (isValid) {
      const formsData = this.transformValuesToFormData();
      this.updateTable(formsData);
    } else {
      let message = { message: "All fields are mandatory", type: "warning" };
      this.updateMessage(message);
    }
  }

  handleValidation(): boolean {
    const isEveryFieldValid = this.validationReportList.every(
      (report) => report.isValid
    );
    const isEveryFieldChecked =
      this.formsFiedls.length === this.validationReportList.length;

    return isEveryFieldValid && isEveryFieldChecked;
  }

  transformValuesToFormData(): TableData {
    type TransformedData = {
      [key: string]: string | number | undefined;
    };

    const transformedObject = this.validationReportList.reduce(
      (transformedData: TransformedData, currentReport) => {
        const key = currentReport.name as keyof TransformedData;

        transformedData[key] = currentReport.value;
        transformedData["id"] = uuidv4();
        return transformedData;
      },
      {} as TableData
    );

    return transformedObject;
  }

  handleInputsFields(validationReport: ValidationReport): void {
    const existingReport = this.validationReportList.find(
      (report) => report.name === validationReport.name
    );

    if (existingReport) {
      Object.assign(existingReport, validationReport);
    } else {
      this.validationReportList.push(validationReport);
    }
  }
}
</script>

<style scoped lang="scss" src="./SecurityClassForm.scss"></style>
