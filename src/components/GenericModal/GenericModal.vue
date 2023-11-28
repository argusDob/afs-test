<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <div class="modal__header">
        <slot name="title">Default Title</slot>
        <button @click.self="closeModal" class="modal__close-button">
          &times;
        </button>
      </div>
      <div class="modal__body">
        <slot name="body">Default content...</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component({
  name: "GenericModal",
})
export default class GenericModal extends Vue {
  isVisible = false;

  @Emit("reset-modal")
  closeModal(): void {
    this.isVisible = false;
  }

  openModal(): void {
    this.isVisible = true;
  }
}
</script>

<style scoped lang="sccs" src="./GenericModal.scss"></style>
