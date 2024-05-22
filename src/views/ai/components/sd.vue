<template>
  <div>
    <section
            class="draw_infomation pb-32"
            v-if="midj_check_radio == 'basic_do'"
          >
            <section class="flex flex-col space-y-16 rounded-10 p-4 bg-gray-7">
              <div class="relative">
                <div>
                  <h5
                    class="left-panel-setting-block__title font-18 text-gray-2 mr-4 flex justify-between"
                  >
                    绘画描述
                    <a-tooltip content="翻译为英文">
                      <a-button
                        size="small"
                        @click="translate()"
                        :loading="draw_loading"
                        type="primary"
                        status="success"
                        shape="round"
                      >
                        <template #icon>
                          <icon-language />
                        </template>
                      </a-button>
                    </a-tooltip>
                  </h5>
                </div>
              </div>
              <div class="!mt-4 fade-box draw_des_clip">
                <section
                  class="w-full relative border-gray-5 pb-0 rounded-8 bg-white-1 hover:border-primary-base transition-border"
                >
                  <a-textarea
                    v-model="input2"
                    class="bg-white pb-10"
                    :auto-size="{ minRows: 7, maxRows: 7 }"
                    type="textarea"
                    :max-length="2000"
                    show-word-limit
                    allow-clear
                    placeholder="请用英文输入Prompt，参考形式：画面主体，细节描述，修饰词"
                  />
                </section>
              </div>
            </section>
            <a-upload
              class="avatar-uploader"
              :action="actions"
              :show-file-list="false"
              :headers="{ Authorization: 'Bearer ' + token }"
              @before-upload="beforeUpload"
              @success="picSuccess"
              draggable
            >
              <template #upload-button>
                <div>
                  <div
                    class="arco-upload-list-picture mt-2 rounded-10 w-100 custom-upload-avatar"
                    v-if="imageUrl"
                  >
                    <div
                      class="edui-left-panel__reference-img-container mt-0 rounded-10"
                    >
                      <span class="left-panel-setting-block__title"
                        >参考图</span
                      >
                      <div class="upload-file">
                        <div
                          class="upload-file__upload upload-file__upload--white gda-dropdown-trigger"
                          style="width: 56px; height: 56px"
                        >
                          <img class="w-auto rounded-10" :src="imageUrl" />
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
            <a-button
              type="primary"
              status="danger"
              @click="deletePic"
              class="w-100"
              shape="round"
              v-if="imageUrl"
            >
              <template #icon>
                <icon-delete />
              </template>
              删除图片
            </a-button>

            <!--model select-->
            <div class="left-panel-setting-block__header">
              <div class="left-panel-setting-block__title mt-2 fs-5">
                模型选择
                <a-tooltip
                  content="MJ：通用模型
                        NIJI：动漫风格模型"
                >
                  <icon-exclamation-circle class="font-18 ml-1" />
                </a-tooltip>
              </div>
            </div>
            <a-row :gutter="10" class="flex justify-content-center mj_version">
              <a-col
                :span="12"
                class="version-item"
                @click="version = 1"
                :class="version == 1 ? 'active' : ''"
              >
                <button
                  class="relative overflow-hidden border-2 rounded-xl dark:border-neutral-700"
                >
                  <div
                    class="absolute flex items-center justify-center w-full h-full"
                  >
                    <div class="model-card__title"><span>MJ</span></div>
                  </div>
                  <img
                    class="object-cover w-full h-full rounded-xl"
                    src="@/assets/images/mj.jpg"
                  />
                </button>
              </a-col>
              <a-col
                :span="12"
                class="version-item"
                @click="version = 2"
                :class="version == 2 ? 'active' : ''"
              >
                <button
                  class="relative overflow-hidden border-2 rounded-xl dark:border-neutral-700"
                >
                  <div
                    class="absolute flex items-center justify-center w-full h-full"
                  >
                    <div class="model-card__title"><span>NIJI</span></div>
                  </div>
                  <img
                    class="object-cover w-full h-full rounded-xl"
                    src="@/assets/images/niji.jpg"
                  />
                </button>
              </a-col>
            </a-row>
            <div class="flex items-center justify-between space-x-2 mt-2">
              <span class="w-[70px]">版本</span>
              <div class="flex-1" v-if="version == 1">
                <a-select v-model="version_me" placeholder="选择版本">
                  <a-option
                    v-for="item of mj_version"
                    :value="item.value"
                    :label="item.label"
                  />
                </a-select>
              </div>
              <div class="flex-1" v-else>
                <a-select v-model="version_nj" placeholder="选择版本">
                  <a-option
                    v-for="item of nj_version"
                    :value="item.value"
                    :label="item.label"
                  />
                </a-select>
              </div>
            </div>
            <div
              class="flex items-center justify-between space-x-2 mt-2"
              v-if="version == 1"
            >
              <span class="w-[70px]">RAW</span>
              <div class="flex-1">
                <a-switch v-model="mj_row" />
              </div>
              <a-tooltip
                content="呈现的人物写实感更加逼真,人物细节、光源、流畅度也更加接近原始作品"
              >
                <icon-exclamation-circle class="font-18 ml-1" />
              </a-tooltip>
            </div>
            <div class="mt-2" v-if="version == 2">
              <div class="left-panel-setting-block__header">
                <div class="left-panel-setting-block__title mt-2 fs-5">
                  风格选择
                  <a-tooltip
                    content="根据你想生成的图片选择对应的风格，效果更佳哦"
                  >
                    <icon-exclamation-circle class="font-18 ml-1" />
                  </a-tooltip>
                </div>
              </div>
              <a-row :gutter="10" class="mj_version style_choose">
                <a-col
                  :span="12"
                  class="version-item mb-2"
                  @click="niji_style = 1"
                  :class="niji_style == 1 ? 'active' : ''"
                >
                  <button
                    class="relative overflow-hidden border-2 rounded-xl dark:border-neutral-700"
                  >
                    <div
                      class="absolute flex items-center justify-center w-full h-full"
                    >
                      <div class="model-card__title"><span>动漫</span></div>
                    </div>
                    <img
                      class="object-cover w-full h-full rounded-xl"
                      src="@/assets/images/normal_niji.png"
                    />
                  </button>
                </a-col>
                <a-col
                  :span="12"
                  class="version-item"
                  @click="niji_style = 2"
                  :class="niji_style == 2 ? 'active' : ''"
                >
                  <button
                    class="relative overflow-hidden border-2 rounded-xl dark:border-neutral-700"
                  >
                    <div
                      class="absolute flex items-center justify-center w-full h-full"
                    >
                      <div class="model-card__title"><span>可爱</span></div>
                    </div>
                    <img
                      class="object-cover w-full h-full rounded-xl"
                      src="@/assets/images/cute_niji.png"
                    />
                  </button>
                </a-col>
                <a-col
                  :span="12"
                  class="version-item"
                  @click="niji_style = 3"
                  :class="niji_style == 3 ? 'active' : ''"
                >
                  <button
                    class="relative overflow-hidden border-2 rounded-xl dark:border-neutral-700"
                  >
                    <div
                      class="absolute flex items-center justify-center w-full h-full"
                    >
                      <div class="model-card__title"><span>丰富</span></div>
                    </div>
                    <img
                      class="object-cover w-full h-full rounded-xl"
                      src="@/assets/images/dr_niji.png"
                    />
                  </button>
                </a-col>
                <a-col
                  :span="12"
                  class="version-item"
                  @click="niji_style = 4"
                  :class="niji_style == 4 ? 'active' : ''"
                >
                  <button
                    class="relative overflow-hidden border-2 rounded-xl dark:border-neutral-700"
                  >
                    <div
                      class="absolute flex items-center justify-center w-full h-full"
                    >
                      <div class="model-card__title"><span>风景</span></div>
                    </div>
                    <img
                      class="object-cover w-full h-full rounded-xl"
                      src="@/assets/images/scene_niji.png"
                    />
                  </button>
                </a-col>
              </a-row>
            </div>

            <!--model select end-->
            <div class="left-panel-setting-block__header">
              <div class="left-panel-setting-block__title mt-2 fs-5">
                图片比例
                <a-tooltip content="参数释义：生成图片尺寸比例">
                  <icon-exclamation-circle class="font-18 ml-1" />
                </a-tooltip>
              </div>
            </div>
            <a-dropdown :popup-max-height="false" class="bili_main">
              <section
                class="w-full p-1 flex-center justify-between bg-white-1 rounded-8 cursor-pointer border hover:border-primary-base transition-border border-transparent"
              >
                <div class="flex-center space-x-20">
                  <div class="flex-center bg-gray-6 w-20 rounded-6 pr-6">
                    <div
                      class="flex items-center justify-center w-5 h-5 mx-auto my-2 aspect-box-wrapper"
                    >
                      <div
                        class="border-2 border-gray-600 rounded aspect-box dark:border-neutral-700"
                        :style="`width:${bili[choose_bili - 1].width}%;height:${
                          bili[choose_bili - 1].height
                        }%`"
                      ></div>
                    </div>
                    <span class="text-gray-2 text-12 font-600">{{
                      bili[choose_bili - 1].name
                    }}</span>
                  </div>
                  <span class="text-gray-2 text-14 font-600">{{
                    bili[choose_bili - 1].title
                  }}</span>
                </div>
              </section>
              <template #content>
                <a-doption
                  v-for="(b, b_index) in bili"
                  @click="choose_bili = b.value"
                >
                  <div class="w-100 flex justify-content-between p-1">
                    <div class="flex-center rounded-6 w-20 bg-gray-6 mr-6 pl-2">
                      <div
                        class="flex items-center justify-center w-5 h-5 mx-auto my-2 aspect-box-wrapper"
                      >
                        <div
                          class="border-2 border-gray-600 rounded aspect-box dark:border-neutral-700"
                          :style="`width:${b.width}%;height:${b.height}%`"
                        ></div>
                      </div>
                      <span
                        class="text-14 ml-1 mr-3 text-gray-2 font-600 large:text-12 large:mr-0"
                        >{{ b.name }}</span
                      >
                    </div>
                    <span class="text-gray-2 text-14 font-600 left-83">{{
                      b.title
                    }}</span>
                  </div>
                </a-doption>
              </template>
            </a-dropdown>

            <!--model can -->
            <div class="left-panel-setting-block__header">
              <div class="left-panel-setting-block__title mt-2 fs-5">参数</div>
            </div>
            <div class="flex items-center justify-between space-x-2 mt-2">
              <span class="w-[70px]">画质</span>
              <div class="flex-1">
                <a-select v-model="pic_select" placeholder="画质选择">
                  <a-option
                    v-for="item of pic_quality"
                    :value="item.value"
                    :label="item.label"
                  />
                </a-select>
              </div>
              <a-tooltip content="参数释义：更高质量需要更长的时间处理更多细节">
                <icon-exclamation-circle class="font-18 ml-1" />
              </a-tooltip>
            </div>
            <div class="flex items-center justify-between space-x-2 mt-2">
              <span class="w-[70px]">混乱</span>
              <div class="flex-1">
                <a-input-number v-model="chaos" :min="0" :max="100" />
              </div>
              <a-tooltip
                content="参数释义：较高值将产生意想不到的结果和成分 较低值具有更可靠、可重复的结果"
              >
                <icon-exclamation-circle class="font-18 ml-1" />
              </a-tooltip>
            </div>
            <div class="left-panel-setting-block__header">
              <div class="left-panel-setting-block__title fs-5">
                风格化
                <a-tooltip
                  content="参数释义：数值越高，画面表现也会更具丰富性和艺术性"
                >
                  <icon-exclamation-circle class="font-18 ml-1" />
                </a-tooltip>
              </div>
            </div>
            <div class="filters-container">
              <div class="filters-wrapper filter-tabst">
                <ul class="filter-tabs">
                  <li>
                    <button class="filter-button" @click="change_s(50, 0)">
                      低
                    </button>
                  </li>
                  <li>
                    <button class="filter-button" @click="change_s(100, 100)">
                      中
                    </button>
                  </li>
                  <li>
                    <button class="filter-button" @click="change_s(250, 200)">
                      高
                    </button>
                  </li>
                  <li>
                    <button class="filter-button" @click="change_s(750, 300)">
                      强烈
                    </button>
                  </li>
                </ul>
                <div class="filter-slider" aria-hidden="true">
                  <div
                    class="filter-slider-rect"
                    :style="{ transform: 'translateX(' + xPos + '%)' }"
                  >
                    &nbsp;
                  </div>
                </div>
              </div>
            </div>
            <!--<a-input-number class="mt-2" v-model="style" :min="0" :max="750"/>-->
            <div class="left-panel-setting-block__header">
              <div class="left-panel-setting-block__title mt-2 fs-5">
                设定信息
              </div>
            </div>

            <div class="flex items-center justify-between space-x-2 mt-2">
              <span class="w-[70px]">携带参数</span>
              <div class="flex-1">
                <a-switch v-model="is_pic" />
              </div>
            </div>
          </section>
          <section class="draw_infomation pb-32" v-else>
            <a-upload
              class="avatar-uploader"
              :action="''"
              :auto-upload="false"
              :show-file-list="false"
              @before-upload="beforeUpload"
              @success="TextSuccess"
              draggable
            >
              <template #upload-button>
                <div>
                  <div
                    class="arco-upload-list-picture mt-2 rounded-10 !w-full custom-upload-avatar"
                    v-if="text_imageUrl"
                  >
                    <div
                      class="edui-left-panel__reference-img-container mt-0 rounded-10"
                    >
                      <span class="left-panel-setting-block__title"
                        >参考图</span
                      >
                      <div class="upload-file">
                        <div
                          class="upload-file__upload upload-file__upload--white gda-dropdown-trigger"
                          style="width: 56px; height: 56px"
                        >
                          <img class="w-auto rounded-10" :src="text_imageUrl" />
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
            <a-button
              type="primary"
              status="danger"
              @click="text_imageUrl = ''"
              class="w-100"
              shape="round"
              v-if="imageUrl"
            >
              <template #icon>
                <icon-delete />
              </template>
              删除图片
            </a-button>
            <a-button
              type="primary"
              size="large"
              class="w-full my-3 rounded"
              @click="midj_ai_describe()"
            >
              <template #icon>
                <icon-command />
              </template>
              生成图生文
            </a-button>
          </section>
  </div>
</template>

<script lang='ts' setup>
  import { reactive, ref} from 'vue'
</script>

<style lang='scss' scoped></style>