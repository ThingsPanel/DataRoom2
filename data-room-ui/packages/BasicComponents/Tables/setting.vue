<template>
  <div>
    <el-form
      ref="form"
      :model="config"
      :rules="customRules"
      label-width="120px"
      label-position="left"
      class="setting-body bs-el-form"
    >
      <SettingTitle>基础</SettingTitle>
      <div class="lc-field-body">
        <el-form-item
          label="名称"
        >
          <el-input
            v-model="config.title"
            clearable
          />
        </el-form-item>
       
      </div>
      <SettingTitle v-if="config.border">组件外部边框</SettingTitle>
      <div class="lc-field-body">
        <BorderSetting
          v-if="config.border"
          label-width="120px"
          :config="config.border"
          :big-title="config.title"
        />
      </div>
      <SettingTitle>位置</SettingTitle>
      <div class="lc-field-body">
        <PosWhSetting
          :config="config"
          label-width="120px"
        />
      </div>
      <SettingTitle>旋转</SettingTitle>
      <div class="lc-field-body">
        <RotateSetting
          :config="config"
        />
      </div>
      <SettingTitle>列配置</SettingTitle>
      <div class="lc-field-body">
        <el-alert
          title="说明：此处配置将覆盖列的默认宽度和对齐方式。列的顺序和包含哪些列由'数据'面板中的'表格列'配置决定。"
          type="info"
          show-icon
          :closable="false"
          style="margin-bottom: 10px;"
        />
        <div
          v-for="(colSetting) in config.customize.columnSettings"
          :key="colSetting.key"
          style="margin-bottom: 15px; padding: 10px; border: 1px solid #eee; border-radius: 4px;"
        >
          <el-form-item :label="'列: ' + (colSetting.name || colSetting.key)">
            <!-- Displaying column name for context -->
          </el-form-item>
          <el-form-item label="列宽 (px)">
            <el-input-number
              v-model="colSetting.width"
              controls-position="right"
              :min="0"
              placeholder="自动"
              style="width:100%"
            />
          </el-form-item>
          <el-form-item label="对齐方式">
            <el-select
              v-model="colSetting.align"
              placeholder="默认 (居中)"
              style="width:100%"
              clearable
            >
              <el-option label="左对齐" value="left" />
              <el-option label="居中" value="center" />
              <el-option label="右对齐" value="right" />
            </el-select>
          </el-form-item>
        </div>
        <div v-if="!config.customize.columnSettings || config.customize.columnSettings.length === 0">
          <p>暂无列配置。请先在'数据'面板配置表格列，或等待数据加载后自动同步列信息。</p>
        </div>
      </div>
      <SettingTitle>表格样式</SettingTitle>
      <div class="lc-field-body">
        <el-form-item label="显示表格边框">
          <el-switch v-model="config.customize.border" />
        </el-form-item>
        <el-form-item v-if="config.customize.border" label="表格边框颜色">
          <ColorPicker
            v-model="config.customize.borderColor"
            placeholder="请选择边框颜色"
            :predefine-colors="predefineThemeColors"
          />
        </el-form-item>
        <el-form-item label="表头背景颜色">
          <ColorPicker
            style="width:140px"
            v-model="config.customize.headerBackgroundColor"
            placeholder="请选择表头颜色"
            :predefine-colors="predefineThemeColors"
          />
        </el-form-item>
        <el-form-item label="表头字体颜色">
          <ColorPicker
            v-model="config.customize.headerFontColor"
            style="width:140px"
            placeholder="请选择表头字体颜色"
            :predefine-colors="predefineThemeColors"
          />
        </el-form-item>
        <el-form-item label="表头字体大小">
          <el-input-number
            style="width:140px"
            v-model="config.customize.headerFontSize"
            class="bs-el-input-number"
            :min="12"
            :max="100"
            :step="1"
          />
        </el-form-item>
        <el-form-item label="表头行高">
          <el-input-number
            style="width:140px"
            v-model="config.customize.headerRowHeight"
            class="bs-el-input-number"
            :min="20"
            :max="100"
            :step="1"
          />
        </el-form-item>
        <el-form-item label="主体背景颜色">
          <ColorPicker
            v-model="config.customize.bodyBackgroundColor"
            placeholder="请选择主体背景颜色"
            :predefine-colors="predefineThemeColors"
          />
        </el-form-item>
        <el-form-item label="主体字体颜色">
          <ColorPicker
            v-model="config.customize.bodyFontColor"
            placeholder="请选择主体字体颜色"
            :predefine-colors="predefineThemeColors"
          />
        </el-form-item>
        <el-form-item label="主体字体大小">
          <el-input-number
            v-model="config.customize.bodyFontSize"
            class="bs-el-input-number"
            :min="12"
            :max="100"
            :step="1"
          />
        </el-form-item>
        <el-form-item label="单元格垂直内边距">
          <el-input-number
            v-model="config.customize.bodyRowVerticalPadding"
            class="bs-el-input-number"
            :min="0"
            :max="50"
            :step="1"
          />
        </el-form-item>
        <el-form-item label="奇数行背景颜色">
          <ColorPicker
            v-model="config.customize.evenRowBackgroundColor"
            placeholder="请选择奇数行背景颜色"
            :predefine-colors="predefineThemeColors"
          />
        </el-form-item>
        <el-form-item label="偶数行背景颜色">
          <ColorPicker
            v-model="config.customize.oddRowBackgroundColor"
            placeholder="请选择偶数行背景颜色"
            :predefine-colors="predefineThemeColors"
          />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import BorderSetting from 'data-room-ui/BigScreenDesign/RightSetting/BorderSetting.vue'
import SettingTitle from 'data-room-ui/SettingTitle/index.vue'
import ColorPicker from 'data-room-ui/ColorPicker/index.vue'
import { chartSettingMixins } from 'data-room-ui/js/mixins/chartSettingMixins'
import PosWhSetting from 'data-room-ui/BigScreenDesign/RightSetting/PosWhSetting.vue'
import RotateSetting from 'data-room-ui/BigScreenDesign/RightSetting/RotateSetting.vue'
import { predefineColors } from 'data-room-ui/js/utils/colorList'
export default {
  components: {
    ColorPicker,
    PosWhSetting,
    SettingTitle,
    BorderSetting,
    RotateSetting
  },
  mixins: [chartSettingMixins],
  data () {
    return {
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
    },
    pageCode () {
      return this.$route.query.code
    }
  },
  watch: {
    'config.option.columnData': {
      handler(newColumns) {
        if (!this.config.customize.columnSettings || !Array.isArray(this.config.customize.columnSettings)) {
          this.$set(this.config.customize, 'columnSettings', []);
        }
        
        const settings = this.config.customize.columnSettings;
        const newProcessedSettings = [];

        if (newColumns && typeof newColumns === 'object' && Object.keys(newColumns).length > 0) {
          Object.values(newColumns).forEach(col => { 
            const key = col.alias; 
            if (!key) return; 

            const existingSetting = settings.find(s => s.key === key);
            if (existingSetting) {
              newProcessedSettings.push({
                ...existingSetting,
                name: col.remark || col.originalColumn || key, 
              });
            } else {
              newProcessedSettings.push({
                key: key,
                name: col.remark || col.originalColumn || key,
                width: null, 
                align: 'center' 
              });
            }
          });
          this.config.customize.columnSettings = newProcessedSettings;
        }
      },
      deep: true,
      immediate: true 
    }
  },
  mounted () { 
    if (this.config.customize && !Array.isArray(this.config.customize.columnSettings)) {
      this.$set(this.config.customize, 'columnSettings', []);
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/settingWrap.scss";
.lc-field-body {
  padding: 12px 16px;
}
</style>
