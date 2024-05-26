<template>
  <div>
    <section class="draw_infomation pb-32">
      <section class="flex flex-col space-y-16 rounded-10 p-4 bg-gray-7 mb-3">
        <div class="relative">
          <div>
            <h5
              class="left-panel-setting-block__title font-18 text-gray-2 mr-4 flex justify-between"
            >
              提示词
            </h5>
          </div>
        </div>
        <div class="!mt-4 fade-box draw_des_clip">
          <section
            class="w-full relative border-gray-5 pb-0 rounded-8 bg-white-1 hover:border-primary-base transition-border"
          >
            <a-textarea
              v-model="form.prompt"
              class="bg-white pb-10"
              :auto-size="{ minRows: 3, maxRows: 3 }"
              type="textarea"
              :max-length="75"
              show-word-limit
              allow-clear
              placeholder="提示词"
            />
          </section>
        </div>
      </section>
      <!-- 反向提示词 -->
      <section class="flex flex-col space-y-16 rounded-10 p-4 bg-gray-7">
        <div class="relative">
          <div>
            <h5
              class="left-panel-setting-block__title font-18 text-gray-2 mr-4 flex justify-between"
            >
              反向提示词
            </h5>
          </div>
        </div>
        <div class="!mt-4 fade-box draw_des_clip">
          <section
            class="w-full relative border-gray-5 pb-0 rounded-8 bg-white-1 hover:border-primary-base transition-border"
          >
            <a-textarea
              v-model="form.negative_prompt"
              class="bg-white pb-10"
              :auto-size="{ minRows: 3, maxRows: 3 }"
              type="textarea"
              :max-length="75"
              show-word-limit
              allow-clear
              placeholder="反向提示词"
            />
          </section>
        </div>
      </section>
      <!-- 宽度 -->
      <div class="left-panel-setting-block__header">
        <div class="left-panel-setting-block__title mt-2 fs-5">宽度</div>
      </div>
      <a-input-number v-model="form.width" :min="64" :max="2048" />
      <!-- 高度 -->
      <div class="left-panel-setting-block__header">
        <div class="left-panel-setting-block__title mt-2 fs-5">高度</div>
      </div>
      <a-input-number v-model="form.height" :min="64" :max="2048" />
      <!-- 取样步骤 -->
      <div class="left-panel-setting-block__header">
        <div class="left-panel-setting-block__title mt-2 fs-5">取样步骤</div>
      </div>
      <a-input-number v-model="form.steps" :min="1" :max="150" />
      <!-- 产生批次 -->
      <div class="left-panel-setting-block__header">
        <div class="left-panel-setting-block__title mt-2 fs-5">产生批次</div>
      </div>
      <a-input-number v-model="form.n_iter" :min="1" :max="100" />
      <!-- 每批数量 -->
      <div class="left-panel-setting-block__header">
        <div class="left-panel-setting-block__title mt-2 fs-5">每批数量</div>
      </div>
      <a-input-number v-model="form.batch_size" :min="1" :max="8" />
      <!-- 随机种子 -->
      <div class="left-panel-setting-block__header">
        <div class="left-panel-setting-block__title mt-2 fs-5">随机种子</div>
      </div>
      <a-input-number v-model="form.seed" />
      <!-- 模型权重 -->
      <div class="left-panel-setting-block__header">
        <div class="left-panel-setting-block__title mt-2 fs-5">模型权重</div>
      </div>
      <a-select
        v-model="form.override_settings.sd_model_checkpoint"
        placeholder="请选择模型权重"
      >
        <a-option
          v-for="item of modelWeightsOptions"
          :value="item.value"
          :label="item.label"
        />
      </a-select>
      <!-- LORA -->
      <!-- <div class="left-panel-setting-block__header">
        <div class="left-panel-setting-block__title mt-2 fs-5">LORA</div>
      </div>
      <a-select v-model="form.lora" placeholder="请选择LORA">
        <a-option
          v-for="item of LoraOptions"
          :value="item.value"
          :label="item.label"
        />
      </a-select> -->
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";

const emits = defineEmits(["updateForm"]);

const form = reactive({
  lora: null,
  override_settings: {
    sd_model_checkpoint: "",
  },
});

const LoraOptions = reactive([
  {
    label: "test",
    value: "1111",
  },
]);

const modelWeightsOptions = reactive([
  {
    label: "4Guofeng4XL_v10RealBeta.safetensors",
    value: "4Guofeng4XL_v10RealBeta.safetensors",
  },
  {
    label: "AdamMix SDXL ART2.5DI超现实影视_vl.1.safetensors",
    value: "AdamMix SDXL ART2.5DI超现实影视_vl.1.safetensors",
  },
  {
    label: "AgainGufengChibi女生国风Q版模型_vl.safetensors",
    value: "AgainGufengChibi女生国风Q版模型_vl.safetensors",
  },
  {
    label: "anima pencil-XL.safetensors",
    value: "anima pencil-XL.safetensors",
  },
  {
    label: "anything-v5-PrtRE.safetensors",
    value: "anything-v5-PrtRE.safetensors",
  },
  {
    label: "dreamshaperXL_v21TurboDPMSDE.safetensors",
    value: "dreamshaperXL_v21TurboDPMSDE.safetensors",
  },
  { label: "Juggernaut XL.safetensors", value: "Juggernaut XL.safetensors" },
  {
    label: "juggerxllnpaint_juggerlnpaintV8.safetensors",
    value: "juggerxllnpaint_juggerlnpaintV8.safetensors",
  },
  {
    label: "majicmixRealistic_v7.safetensors",
    value: "majicmixRealistic_v7.safetensors",
  },
  {
    label: "product design.safetensors",
    value: "product design.safetensors",
  },
  {
    label: "realisticVisionV51_v51VAE.safetensors",
    value: "realisticVisionV51_v51VAE.safetensors",
  },
  {
    label: "realisticVisionV60B1_v51VAE.safetensors",
    value: "realisticVisionV60B1_v51VAE.safetensors",
  },
  {
    label: "国风_汉服_写实v20.safetensors",
    value: "国风_汉服_写实v20.safetensors",
  },
  {
    label: "绪儿写实帅哥美女模型东方v4.safetensors",
    value: "绪儿写实帅哥美女模型东方v4.safetensors",
  },
  {
    label: "胶片风leosamFilmgirlUltra.p4HK.safetensors",
    value: "胶片风leosamFilmgirlUltra.p4HK.safetensors",
  },
]);

watch(
  form,
  (val) => {
    emits("updateForm", val);
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss" scoped></style>
