<script setup lang="ts">
import { useCanvasStore } from "@/store/modules/canvas";
import { onMounted, ref } from "vue";
import {
  ElUpload,
  ElIcon,
  ElButton,
  ElForm,
  ElColorPicker,
  ElMessage,
  type UploadFile,
  type UploadRawFile,
} from "element-plus";
import {
  UploadFilled,
  Delete,
  Download,
  EditPen,
  Close,
  RefreshRight,
  RefreshLeft,
} from "@element-plus/icons-vue";
import { fabric } from "fabric";
// import { useGeneratorStore } from "@/stores/generator";
import EraserIcon from "../icons/EraserIcon.vue";
import BrushFilled from "../icons/BrushFilled.vue";
import FormSlider from "./FormSlider.vue";
import { convertToBase64 } from "@/utils/base64";

// const store = useGeneratorStore();
const canvasStore = useCanvasStore();

const upload = ref();

async function handleChange(uploadFile: UploadFile) {
  if (!(uploadFile.raw as UploadRawFile).type.includes("image")) {
    ElMessage.error("请上传图片！");
    upload.value!.clearFiles();
    return;
  }
  const base64File = (await convertToBase64(
    uploadFile.raw as UploadRawFile
  )) as string;
  canvasStore.generatorImageProps.sourceImage = base64File;
  canvasStore.drawing = false;
  fabric.Image.fromURL(base64File, canvasStore.newImage);
}

function removeImage() {
  canvasStore.generatorImageProps.sourceImage = "";
  canvasStore.resetCanvas();
}

onMounted(() => {
  canvasStore.createNewCanvas("canvas");
  canvasStore.generatorImageProps.sourceImage &&
    fabric.Image.fromURL(
      canvasStore.generatorImageProps.sourceImage,
      canvasStore.newImage
    );
});
</script>

<template>
  <el-upload
    drag
    ref="upload"
    :auto-upload="false"
    @change="handleChange"
    :limit="1"
    multiple
    v-if="!canvasStore.generatorImageProps.sourceImage"
  >
    <el-icon :size="100"><upload-filled /></el-icon>
    <!-- <div>Drop file here OR <em>click to upload</em></div> -->
    <template #tip>
      <div>
        <!-- <div class="center-horizontal" style="margin-top: 5px">OR</div> -->
        <div
          class="center-both"
          style="cursor: pointer; text-decoration: underline; font-size: 1rem"
          @click="
            canvasStore.newBlankImage(
              canvasStore.params.height || 512,
              canvasStore.params.width || 512
            )
          "
        >
          <el-icon :size="20" style="margin-right: 2px"><BrushFilled /></el-icon
          >draw something
        </div>
      </div>
    </template>
  </el-upload>
  <div v-show="canvasStore.generatorImageProps.sourceImage">
    <div class="canvas-container">
      <canvas id="canvas"></canvas>
      <div class="action-buttons" style="left: 10px; right: unset">
        <el-button
          @click="canvasStore.undoAction()"
          :icon="RefreshLeft"
          plain
          :disabled="canvasStore.imageProps.redoHistory.length === 0"
        />
        <el-button
          @click="canvasStore.redoAction()"
          :icon="RefreshRight"
          plain
          :disabled="canvasStore.imageProps.undoHistory.length === 0"
        />
      </div>
      <div class="action-buttons">
        <el-button @click="canvasStore.resetDrawing()" :icon="Close" plain />
        <el-button @click="removeImage" :icon="Delete" plain />
        <el-button @click="canvasStore.downloadMask()" :icon="Download" plain />
        <el-button
          @click="canvasStore.flipErase()"
          :icon="canvasStore.erasing ? EditPen : EraserIcon"
          plain
        />
        <el-color-picker
          v-model="canvasStore.drawColor"
          show-alpha
          v-if="canvasStore.drawing"
        />
      </div>
      <el-form label-width="110px" style="margin-top: 10px">
        <form-slider
          style="margin-bottom: 5px"
          label="Brush Size"
          prop="brushSize"
          v-model="canvasStore.brushSize"
          :min="10"
          :max="100"
          :step="10"
          :change="canvasStore.setBrush"
        />
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.action-buttons {
  display: flex;
  flex-direction: column;
  position: absolute;
  gap: 10px;
  top: 10px;
  right: 10px;
}

.action-buttons > * {
  width: 30px;
  height: 30px;
  margin: 0;
}

.canvas-container {
  position: relative;
}

@media only screen and (max-width: 1280px) {
  .canvas-container {
    transform: scale(0.7);
  }
}
</style>
