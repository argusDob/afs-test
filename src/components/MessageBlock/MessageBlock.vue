<template>
  <div v-if="messageBlock.message" :class="[additionalClasses]">
    <p>{{ messageBlock.message }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import { Message } from "@/types/types";

@Component({
  name: "MessageBlock",
})
export default class MessageBlock extends Vue {
  @Prop({
    type: Object,
    required: true,
    default: () => ({ message: undefined, type: undefined }),
  })
  messageBlock!: Message;

  get additionalClasses(): string[] {
    const typeClass = this.messageBlock.type
      ? `message-block--${this.messageBlock.type}`
      : "";
    return ["message-block", typeClass].filter(Boolean);
  }
}
</script>

<style scoped lang="scss" src="./MessageBlock.scss"></style>
