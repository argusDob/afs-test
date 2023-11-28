<template>
  <div class="card">
    <div class="card__indicator"></div>
    <div class="card__details">
      <div class="card__details--first-block">
        <div class="card__details--first-block__price">
          <span>$</span><span>{{ transfer.amount }}</span>
        </div>
        <div class="card__details--first-block__state">
          <span class="card__details--first-block__state--day">STATE</span>
          <span class="card__details--first-block__state--time">
            {{ transfer.state }}</span
          >
        </div>
      </div>
      <div class="card__details--second-block">
        <div class="card__details--second-block__fullname">
          <span v-if="transfer.toSecurityHolder">{{
            transfer.toSecurityHolder.fullName
          }}</span>
        </div>
        <div class="card__details--second-block---infos">
          <div
            v-if="transfer.securityClass"
            class="card__details--second-block---infos__details"
          >
            <span>SECURITY CLASS</span>
            <span>{{ transfer.securityClass.name }}</span>
          </div>
          <div class="card__details--second-block---infos__details">
            <span>TYPE</span>
            <span>{{ transfer.type }}</span>
          </div>
          <div class="card__details--second-block---infos__details">
            <span>RECORD DATE</span>
            <span>{{ transfer.recordDate }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Transaction } from "../../types/types";

@Component({
  name: "TransferRow",
})
export default class TransferRow extends Vue {
  @Prop({ required: true }) transfer!: Transaction;
}
</script>

<style lang="scss" scoped src="../TransferRow/TransferRow.scss"></style>
