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
      <!-- 参考图 -->
      <a-upload
        class="avatar-uploader"
        :action="''"
        :auto-upload="false"
        :show-file-list="false"
        @before-upload="beforeUpload"
        draggable
      >
        <template #upload-button>
          <div>
            <div
              class="arco-upload-list-picture mt-2 rounded-10 !w-full custom-upload-avatar"
              v-if="imgUrl"
            >
              <div
                class="edui-left-panel__reference-img-container mt-0 rounded-10"
              >
                <span class="left-panel-setting-block__title">参考图</span>
                <div class="upload-file">
                  <div
                    class="upload-file__upload upload-file__upload--white gda-dropdown-trigger"
                    style="width: 56px; height: 56px"
                  >
                    <img class="w-auto rounded-10" :src="imgUrl" />
                  </div>
                </div>
              </div>

              <div class="arco-upload-list-picture-mask rounded-10">
                <IconPlus />
              </div>
            </div>
            <div
              v-else
              class="edui-left-panel__reference-img-container rounded-10"
            >
              <span class="left-panel-setting-block__title">参考图</span>
              <div class="upload-file">
                <div
                  class="upload-file__upload upload-file__upload--white gda-dropdown-trigger"
                  style="width: 56px; height: 56px"
                >
                  <svg
                    role="img"
                    aria-label="cloud-upload"
                    focusable="false"
                    data-icon="cloud-upload"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="gd_design_icon gd_design_icon-cloud-upload"
                  >
                    <path
                      d="M12 3.25C9.23322 3.25 6.85685 4.91427 5.81432 7.29442C3.23861 7.63053 1.25 9.83289 1.25 12.5C1.25 15.3995 3.60051 17.75 6.5 17.75H8V16.25H6.5C4.42893 16.25 2.75 14.5711 2.75 12.5C2.75 10.4736 4.35756 8.82234 6.36655 8.75232L6.87754 8.73451L7.04768 8.25236C7.76807 6.211 9.71438 4.75 12 4.75C14.2856 4.75 16.2319 6.211 16.9523 8.25236L17.1225 8.73451L17.6334 8.75232C19.6424 8.82234 21.25 10.4736 21.25 12.5C21.25 14.5711 19.5711 16.25 17.5 16.25H16V17.75H17.5C20.3995 17.75 22.75 15.3995 22.75 12.5C22.75 9.83289 20.7614 7.63052 18.1857 7.29442C17.1431 4.91427 14.7668 3.25 12 3.25Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M12.75 13.1013V20.5H11.25V13.1013L9.48014 14.5762L8.51986 13.4238L12 10.5237L15.4801 13.4238L14.5199 14.5762L12.75 13.1013Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </template>
      </a-upload>
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
      <!-- 重绘幅度 -->
      <div class="left-panel-setting-block__header">
        <div class="left-panel-setting-block__title mt-2 fs-5">重绘幅度</div>
      </div>

      <a-input-number v-model="form.denoising_strength" :max="1" />
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
      <div class="left-panel-setting-block__header">
        <div class="left-panel-setting-block__title mt-2 fs-5">LORA</div>
      </div>
      <a-select v-model="form.lora" placeholder="请选择LORA">
        <a-option
          v-for="item of LoraOptions"
          :value="item.value"
          :label="item.label"
        />
      </a-select>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { IconPlus } from "@arco-design/web-vue/es/icon";

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
const imgUrl = ref("");

const modelWeightsOptions = reactive([
  {
    label: "4Guofeng4XL_v10RealBeta.safetensors [57fdfblfbe]",
    value: "4Guofeng4XL_v10RealBeta.safetensors [57fdfblfbe]",
  },
  {
    label: "AdamMix SDXL ART2.5DI超现实影视v1.l.safetensors [5af7a43db2]",
    value: "AdamMix SDXL ART2.5DI超现实影视v1.l.safetensors [5af7a43db2]",
  },
  {
    label: "AgainGufengChibi女生国风Q版模型_vL.safetensors [7208cf314]",
    value: "AgainGufengChibi女生国风Q版模型_vL.safetensors [7208cf314]",
  },
  {
    label: "anima_pencil-XL.safetensors [7ed8da12d9]",
    value: "anima_pencil-XL.safetensors [7ed8da12d9]",
  },
  {
    label: "anything-v5-PrtRE.safetensors",
    value: "anything-v5-PrtRE.safetensors",
  },
  {
    label: "dreamshaperXL_v21TurboDPMSDE.safetensors [4496b36d48]",
    value: "dreamshaperXL_v21TurboDPMSDE.safetensors [4496b36d48]",
  },
  {
    label: "Juggernaut XL.safetensors [1fe6c7ec54]",
    value: "Juggernaut XL.safetensors [1fe6c7ec54]",
  },
  {
    label: "juggerxllnpaint_juggerlnpaintV8.safetensors [2ed2cf6e22]",
    value: "juggerxllnpaint_juggerlnpaintV8.safetensors [2ed2cf6e22]",
  },
  {
    label: "majicmixRealistic_v7.safetensors [7c819b6d13]",
    value: "majicmixRealistic_v7.safetensors [7c819b6d13]",
  },
  {
    label: "product design.safetensors [db58f07060]",
    value: "product design.safetensors [db58f07060]",
  },
  {
    label: "realisticVisionV51 v51VAE.safetensors [15012c538f]",
    value: "realisticVisionV51 v51VAE.safetensors [15012c538f]",
  },
  {
    label: "realisticVisionV60B1_v51VAE.safetensors [ef76aa2332]",
    value: "realisticVisionV60B1_v51VAE.safetensors [ef76aa2332]",
  },
  {
    label: "国风_汉服_写实_v20.safetensors [19efc22018]",
    value: "国风_汉服_写实_v20.safetensors [19efc22018]",
  },
  {
    label: "绪儿写实帅哥美女模型东方v4.safetensors [45287alfa]",
    value: "绪儿写实帅哥美女模型东方v4.safetensors [45287alfa]",
  },
  {
    label: "胶片风leosamFilmgirlUltra.p4HK.safetensors [b363551a70]",
    value: "胶片风leosamFilmgirlUltra.p4HK.safetensors [b363551a70]",
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

const beforeUpload = (file: any) => {
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 15;

  if (!isJPG && !isPNG) {
    ElMessage.error("上传图片只能是 JPG/PNG 格式!");
    return false;
  }
  if (!isLt2M) {
    ElMessage.error("上传图片大小不能超过 15MB!");
    return false;
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    imgUrl.value = reader.result; // base64
    form.init_images = [imgUrl.value];
  };
  reader.onerror = function (err) {
    console.log(err);
  };
  return true;
};
</script>

<style lang="scss" scoped></style>
