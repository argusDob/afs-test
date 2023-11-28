<template>
  <div class="input-text">
    <label class="input-text__label" :for="inputId">{{ label }}</label>
    <input
      class="input-text__field"
      v-model="value"
      :id="inputId"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :min="min"
      @keyup="handleKeyUp"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

import { ValidationReport } from "@/types/types";

@Component
export default class InputText extends Vue {
  @Prop({
    type: String,
    required: true,
    validator: (value: string) => {
      return ["text", "email", "password", "number"].includes(value);
    },
  })
  type!: string;
  @Prop({
    type: String,
    required: true,
    validator: (value: string) => {
      return value.trim().length > 0;
    },
  })
  name!: string;
  @Prop({ type: String, required: true }) placeholder!: string;
  @Prop({ type: String, required: true }) label!: string;
  @Prop({ type: Boolean, required: false, default: false })
  autocomplete!: boolean;
  @Prop({ type: String, required: false }) min!: string;

  value = "";
  inputId = "";
  validationReport: ValidationReport = {
    name: null,
    value: null,
    isValid: null,
  };

  handleKeyUp(): void {
    this.setupValidation();
    this.$emit("change", this.validationReport);
  }

  setupValidation(): void {
    const isNumberInput = this.type === "number";
    const convertedValue =
      isNumberInput && this.value ? Number(this.value) : this.value;

    this.validationReport = {
      value: convertedValue,
      name: this.name,
      isValid: this.value ? true : false,
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  created() {
    this.inputId = "input-" + Math.random().toString(36).substr(2, 9);
  }
}
</script>

<style scoped lang="scss" src="./InputText.scss"></style>
