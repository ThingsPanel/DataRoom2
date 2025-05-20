<template>
  <div class="bs-setting-wrap">
    <el-form
      ref="form"
      :model="config"
      class="setting-body bs-el-form"
      label-position="left"
      label-width="90px"
    >
      <el-form
        :model="config.customize"
        class="setting-body bs-el-form"
        label-position="left"
        label-width="90px"
      >
        <SettingTitle>标题</SettingTitle>
        <el-form-item
          class="lc-field-body"
          label="指标卡名称"
        >
          <el-input
            v-model="config.title"
            clearable
          />
        </el-form-item>
        <SettingTitle>位置</SettingTitle>
        <div class="lc-field-body">
          <PosWhSetting :config="config" />
        </div>
        <SettingTitle>旋转</SettingTitle>
        <div class="lc-field-body">
          <RotateSetting
            :config="config"
          />
        </div>
        <SettingTitle>基础配置</SettingTitle>
        <div class="lc-field-body">
          <el-form-item label-width="100px" label="整体字体颜色">
            <ColorPicker
              v-model="config.customize.unitColor"
              :predefine="predefineThemeColors"
            />
          </el-form-item>
          <el-form-item label-width="100px" label="整体字体大小">
            <el-input-number
              v-model="config.customize.unitSize"
              :precision="0"
              class="bs-el-input-number"
              label="请输入字体大小"
            />
          </el-form-item>
          <el-form-item
            label="键名序列"
            label-width="100px"
          >
            <el-input
              v-model="config.customize.secondLine"
              clearable
              placeholder="请输入键名序列，用逗号分隔"
            />
          </el-form-item>
          <el-form-item
            label="键名中文对照"
            label-width="100px"
          >
            <el-input
              type="textarea"
              v-model="config.customize.unit"
              rows="6"
              placeholder="请输入JSON格式的键名对照表，例如: {&quot;LA&quot;:&quot;流量&quot;,&quot;LB&quot;:&quot;电流&quot;}"
            />
          </el-form-item>
        </div>
      </el-form>
    </el-form>
  </div>
</template>
<script>
import SettingTitle from 'data-room-ui/SettingTitle/index.vue'
import ColorPicker from 'data-room-ui/ColorPicker/index.vue'
import {predefineColors} from 'data-room-ui/js/utils/colorList';
import PosWhSetting from 'data-room-ui/BigScreenDesign/RightSetting/PosWhSetting.vue'
import RotateSetting from 'data-room-ui/BigScreenDesign/RightSetting/RotateSetting.vue'
export default {
  name: 'BarSetting',
  components: {
    ColorPicker,
    PosWhSetting,
    SettingTitle,
    RotateSetting
  },
  data () {
    return {
      // 预设主题色
      predefineThemeColors: predefineColors
    }
  },
  computed: {
    config: {
      get () {
        return this.$store.state.bigScreen.activeItemConfig
      },
      set (val) {
        this.$store.state.bigScreen.activeItemConfig = val
      }
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.lc-field-body {
  padding: 12px 16px;
}
</style>
