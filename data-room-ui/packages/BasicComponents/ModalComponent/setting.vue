<template>
  <div class="bs-setting-wrap">
    <el-form
      ref="form"
      :model="config"
      label-width="100px"
      label-position="left"
      class="setting-body bs-el-form"
    >
      <div>
        <slot name="top" />

        <!-- 位置设置 -->
        <SettingTitle>位置</SettingTitle>
        <div class="lc-field-body">
          <PosWhSetting :config="config" />
        </div>

        <!-- 旋转设置 -->
        <SettingTitle>旋转</SettingTitle>
        <div class="lc-field-body">
          <RotateSetting :config="config" />
        </div>

        <!-- 表格基础设置 -->
        <SettingTitle>表格设置</SettingTitle>
        <div class="lc-field-body">
          <el-form-item label="行高(px)">
            <el-input-number
              v-model="config.customize.rowHeight"
              class="bs-el-input-number"
              controls-position="right"
              :min="30"
              :max="80"
            />
          </el-form-item>

          <el-form-item label="表格尺寸">
            <el-select
              v-model="config.customize.tableSize"
              popper-class="bs-el-select"
              class="bs-el-select"
            >
              <el-option label="大" value="medium"></el-option>
              <el-option label="中" value="small"></el-option>
              <el-option label="小" value="mini"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="斑马纹">
            <el-switch
              v-model="config.customize.stripe"
              active-color="#409EFF"
              inactive-color="#C0C4CC"
            />
          </el-form-item>
        </div>

        <!-- 轮播模式 -->
        <SettingTitle>轮播模式</SettingTitle>
        <div class="lc-field-body">
          <el-form-item label="启用轮播">
            <el-switch
              v-model="config.customize.isCarousel"
              active-color="#409EFF"
              inactive-color="#C0C4CC"
            />
          </el-form-item>

          <template v-if="config.customize.isCarousel">
            <el-form-item label="自动播放">
              <el-switch
                v-model="config.customize.autoPlay"
                active-color="#409EFF"
                inactive-color="#C0C4CC"
              />
            </el-form-item>

            <el-form-item label="轮播间隔(ms)" v-if="config.customize.autoPlay">
              <el-input-number
                v-model="config.customize.carouselInterval"
                class="bs-el-input-number"
                controls-position="right"
                :min="1000"
                :max="10000"
                :step="500"
              />
            </el-form-item>

            <el-form-item label="每页显示行数">
              <el-input-number
                v-model="config.customize.carouselPageSize"
                class="bs-el-input-number"
                controls-position="right"
                :min="1"
                :max="20"
              />
            </el-form-item>

            <el-form-item label="动画类型">
              <el-select
                v-model="config.customize.animationType"
                popper-class="bs-el-select"
                class="bs-el-select"
              >
                <el-option label="滑动" value="slide"></el-option>
                <el-option label="淡入淡出" value="fade"></el-option>
                <el-option label="缩放" value="zoom"></el-option>
                <el-option label="翻转" value="flip"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="动画时长(ms)">
              <el-input-number
                v-model="config.customize.animationDuration"
                class="bs-el-input-number"
                controls-position="right"
                :min="100"
                :max="1000"
                :step="50"
              />
            </el-form-item>
          </template>
        </div>

        <!-- 弹窗设置 -->
        <SettingTitle>弹窗设置</SettingTitle>
        <div class="lc-field-body">
          <el-form-item label="启用弹窗">
            <el-switch
              v-model="config.customize.enableModal"
              active-color="#409EFF"
              inactive-color="#C0C4CC"
            />
          </el-form-item>

          <template v-if="config.customize.enableModal">
            <el-form-item label="弹窗标题">
              <el-input
                v-model="config.customize.dialogTitle"
                class="bs-el-input"
                clearable
              />
            </el-form-item>

            <el-form-item label="弹窗宽度(%)">
              <el-input-number
                v-model="config.customize.dialogWidth"
                class="bs-el-input-number"
                controls-position="right"
                :min="20"
                :max="90"
              />
            </el-form-item>

            <el-form-item label="API基础URL">
              <el-input
                v-model="config.customize.apiBaseUrl"
                class="bs-el-input"
                placeholder="http://47.92.253.145:9102/api/v1"
                clearable
              />
            </el-form-item>
          </template>
        </div>

        <!-- 边框设置 -->
        <SettingTitle>边框设置</SettingTitle>
        <div class="lc-field-body">
          <el-form-item label="显示边框">
            <el-switch
              v-model="config.customize.showBorder"
              active-color="#409EFF"
              inactive-color="#C0C4CC"
            />
          </el-form-item>

          <template v-if="config.customize.showBorder">
            <el-form-item label="边框模式">
              <el-select
                v-model="config.customize.borderMode"
                popper-class="bs-el-select"
                class="bs-el-select"
              >
                <el-option label="外边框" value="outer"></el-option>
                <el-option label="内边框" value="inner"></el-option>
                <el-option label="完整边框" value="full"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="边框宽度(px)">
              <el-input-number
                v-model="config.customize.borderWidth"
                class="bs-el-input-number"
                controls-position="right"
                :min="1"
                :max="5"
              />
            </el-form-item>

            <el-form-item label="边框颜色">
              <ColorPicker
                v-model="config.customize.borderColor"
                :predefine="predefineThemeColors"
              />
            </el-form-item>

            <el-form-item label="边框样式">
              <el-select
                v-model="config.customize.borderStyle"
                popper-class="bs-el-select"
                class="bs-el-select"
              >
                <el-option label="实线" value="solid"></el-option>
                <el-option label="虚线" value="dashed"></el-option>
                <el-option label="点线" value="dotted"></el-option>
                <el-option label="双线" value="double"></el-option>
              </el-select>
            </el-form-item>
          </template>
        </div>

        <!-- 表头样式 -->
        <SettingTitle>表头样式</SettingTitle>
        <div class="lc-field-body">
          <el-form-item label="背景颜色">
            <ColorPicker
              v-model="config.customize.headerBgColor"
              :predefine="predefineThemeColors"
            />
          </el-form-item>

          <el-form-item label="文字颜色">
            <ColorPicker
              v-model="config.customize.headerTextColor"
              :predefine="predefineThemeColors"
            />
          </el-form-item>

          <el-form-item label="字体大小">
            <el-input-number
              v-model="config.customize.headerFontSize"
              class="bs-el-input-number"
              controls-position="right"
              :min="10"
              :max="24"
            />
          </el-form-item>

          <el-form-item label="字体粗细">
            <el-select
              v-model="config.customize.headerFontWeight"
              popper-class="bs-el-select"
              class="bs-el-select"
            >
              <el-option label="正常" value="normal"></el-option>
              <el-option label="粗体" value="bold"></el-option>
              <el-option label="更粗" value="bolder"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <!-- 单元格样式 -->
        <SettingTitle>单元格样式</SettingTitle>
        <div class="lc-field-body">
          <el-form-item label="背景颜色">
            <ColorPicker
              v-model="config.customize.cellBgColor"
              :predefine="predefineThemeColors"
            />
          </el-form-item>

          <el-form-item label="文字颜色">
            <ColorPicker
              v-model="config.customize.cellTextColor"
              :predefine="predefineThemeColors"
            />
          </el-form-item>

          <el-form-item label="字体大小">
            <el-input-number
              v-model="config.customize.cellFontSize"
              class="bs-el-input-number"
              controls-position="right"
              :min="10"
              :max="20"
            />
          </el-form-item>

          <el-form-item label="奇数行背景" v-if="config.customize.stripe">
            <ColorPicker
              v-model="config.customize.oddRowBgColor"
              :predefine="predefineThemeColors"
              show-alpha
            />
          </el-form-item>

          <el-form-item label="偶数行背景" v-if="config.customize.stripe">
            <ColorPicker
              v-model="config.customize.evenRowBgColor"
              :predefine="predefineThemeColors"
              show-alpha
            />
          </el-form-item>
        </div>

        <!-- 列宽配置 -->
        <SettingTitle>列宽配置</SettingTitle>
        <div class="lc-field-body">
          <div class="field-tip">配置表格各列的宽度，留空则自动分配</div>
          <div v-for="(column, index) in columnSettings" :key="index" class="column-setting-item">
            <div class="column-info">
              <span class="column-name">{{ column.name || `列${index + 1}` }}</span>
              <span class="column-key">({{ column.key }})</span>
            </div>
            <div class="column-controls">
              <el-input-number
                v-model="column.width"
                class="bs-el-input-number"
                controls-position="right"
                :min="50"
                :max="500"
                placeholder="自动"
                style="width: 120px;"
              />
              <span class="unit">px</span>
              <el-select
                v-model="column.align"
                class="bs-el-select"
                style="width: 80px; margin-left: 10px;"
              >
                <el-option label="左" value="left"></el-option>
                <el-option label="中" value="center"></el-option>
                <el-option label="右" value="right"></el-option>
              </el-select>
            </div>
          </div>
          <div v-if="columnSettings.length === 0" class="no-columns">
            暂无列配置，请先配置表格列数据
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { predefineColors } from 'data-room-ui/js/utils/colorList'
import ColorPicker from 'data-room-ui/ColorPicker'
import SettingTitle from 'data-room-ui/SettingTitle'
import PosWhSetting from 'data-room-ui/BigScreenDesign/RightSetting/PosWhSetting'
import RotateSetting from 'data-room-ui/BigScreenDesign/RightSetting/RotateSetting'

export default {
  name: 'ModalComponentSetting',
  components: {
    ColorPicker,
    SettingTitle,
    PosWhSetting,
    RotateSetting
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    predefineThemeColors: {
      type: Array,
      default: () => predefineColors
    }
  },
  data() {
    return {}
  },
  computed: {
    columnSettings() {
      // 根据配置的表格列生成列设置
      if (!this.config.customize.columnSettings) {
        this.$set(this.config.customize, 'columnSettings', [])
      }

      // 如果有维度字段配置，同步生成列设置
      if (this.config.displayOption?.dimensionField?.value?.length) {
        const dimensions = this.config.displayOption.dimensionField.value
        const existingSettings = this.config.customize.columnSettings

        // 为新的维度字段创建设置项
        dimensions.forEach(dim => {
          const existing = existingSettings.find(setting => setting.key === dim.field)
          if (!existing) {
            existingSettings.push({
              key: dim.field,
              name: dim.name || dim.field,
              width: null,
              align: 'left'
            })
          } else {
            // 更新名称
            existing.name = dim.name || dim.field
          }
        })

        // 移除不存在的维度字段设置
        this.config.customize.columnSettings = existingSettings.filter(setting =>
          dimensions.some(dim => dim.field === setting.key)
        )
      }

      return this.config.customize.columnSettings || []
    }
  },
  watch: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.lc-field-body {
  width: 97%;
  padding: 12px 16px;
}

.field-tip {
  font-size: 12px;
  color: #909399;
  margin-bottom: 10px;
  line-height: 1.4;
}

.column-setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  .column-info {
    flex: 1;

    .column-name {
      font-size: 13px;
      color: #303133;
      font-weight: 500;
    }

    .column-key {
      font-size: 11px;
      color: #909399;
      margin-left: 5px;
    }
  }

  .column-controls {
    display: flex;
    align-items: center;

    .unit {
      font-size: 12px;
      color: #909399;
      margin-left: 5px;
    }
  }
}

.no-columns {
  text-align: center;
  color: #909399;
  font-size: 12px;
  padding: 20px 0;
}
</style>
