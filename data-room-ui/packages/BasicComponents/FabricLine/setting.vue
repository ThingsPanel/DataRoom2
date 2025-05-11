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
        <el-form
          :model="config.customize"
          label-position="left"
          class="setting-body bs-el-form"
          label-width="100px"
        >
          <SettingTitle>位置</SettingTitle>
          <div class="lc-field-body">
            <PosWhSetting :config="config" />
          </div>
          <SettingTitle v-if="config.border">边框</SettingTitle>
          <div class="lc-field-body">
            <BorderSetting
              v-if="config.border"
              label-width="100px"
              :config="config.border"
              :bigTitle='config.title'
            />
          </div>
          <SettingTitle>旋转</SettingTitle>
          <div class="lc-field-body">
            <RotateSetting
              :config="config"
            />
          </div>
          <SettingTitle>基础</SettingTitle>
          <div class="lc-field-body">
            <el-form-item label="标题">
              <el-input
                v-model="config.title"
                class="bs-el-input"
                clearable
              />
            </el-form-item>
            <el-form-item label="绘制模式">
              <el-select
                v-model="config.customize.drawMode"
                placeholder="请选择绘制模式"
                class="bs-el-select"
              >
                <el-option
                  v-for="item in drawModes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <div class="draw-mode-hint" v-if="config.customize.drawMode === 'key_ctrl'">
                按住Ctrl键开始绘制，松开停止
              </div>
            </el-form-item>
            <el-form-item label="线条颜色">
              <ColorPicker
                v-model="config.customize.lineColor"
                :predefine="predefineThemeColors"
              />
            </el-form-item>
            <el-form-item label="线条宽度">
              <el-input-number
                v-model="config.customize.lineWidth"
                class="bs-el-input-number"
                controls-position="right"
                :min="1"
                :max="10"
              />
            </el-form-item>
            <el-form-item label="点颜色">
              <ColorPicker
                v-model="config.customize.pointColor"
                :predefine="predefineThemeColors"
              />
            </el-form-item>
            <el-form-item label="点大小">
              <el-input-number
                v-model="config.customize.pointRadius"
                class="bs-el-input-number"
                controls-position="right"
                :min="2"
                :max="10"
              />
            </el-form-item>
            <el-form-item label="容器ID">
              <el-input
                v-model="config.customize.containerId"
                class="bs-el-input"
                placeholder="默认自动生成"
              />
            </el-form-item>
          </div>
          
          <SettingTitle>数据管理</SettingTitle>
          <div class="lc-field-body">
            <el-form-item>
              <el-button 
                type="danger" 
                size="small" 
                @click="clearData"
              >
                清除所有路径
              </el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-form>
  </div>
</template>

<script>
import SettingTitle from 'data-room-ui/SettingTitle/index.vue'
import BorderSetting from 'data-room-ui/BigScreenDesign/RightSetting/BorderSetting.vue'
import ColorPicker from 'data-room-ui/ColorPicker/index.vue'
import PosWhSetting from 'data-room-ui/BigScreenDesign/RightSetting/PosWhSetting.vue'
import RotateSetting from 'data-room-ui/BigScreenDesign/RightSetting/RotateSetting.vue'
import {predefineColors} from "data-room-ui/js/utils/colorList"
import { DrawModes } from './settingConfig'

export default {
  name: 'FabricLineSetting',
  components: {
    ColorPicker,
    PosWhSetting,
    SettingTitle,
    BorderSetting,
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
  data () {
    return {
      drawModes: DrawModes
    }
  },
  methods: {
    /**
     * 清除所有路径数据
     */
    clearData() {
      this.$confirm('确定要清除所有绘制的路径数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$set(this.config, 'data', [])
        this.$message({
          type: 'success',
          message: '所有路径数据已清除'
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.lc-field-body {
  width: 97%;
  padding: 16px;
}

.draw-mode-hint {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
  line-height: 1.4;
}
</style>