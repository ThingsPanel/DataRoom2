<template>
  <div class="bs-setting-wrap">
    <el-form
      ref="form"
      :model="config"
      label-position="left"
      label-width="100px"
      class="setting-body bs-el-form"
    >
      <!-- 卡片名称 -->
      <SettingTitle>标题</SettingTitle>
      <div class="lc-field-body">
        <el-form-item label="卡片名称">
          <el-input v-model="config.title" clearable />
        </el-form-item>
      </div>

      <!-- 卡片基础样式 -->
      <SettingTitle>卡片样式</SettingTitle>
      <div class="lc-field-body">
         <el-form-item label="背景颜色">
          <ColorPicker v-model="config.customize.backgroundColor" :predefine="predefineThemeColors" />
        </el-form-item>
        <el-form-item label="内边距">
          <el-input-number v-model="config.customize.padding" :min="0" /> <span>px</span>
        </el-form-item>
        <el-form-item label="边框圆角">
          <el-input-number v-model="config.customize.borderRadius" :min="0" /> <span>px</span>
        </el-form-item>
         <el-form-item label="边框宽度">
          <el-input-number v-model="config.customize.borderWidth" :min="0" /> <span>px</span>
        </el-form-item>
        <el-form-item label="边框颜色">
           <ColorPicker v-model="config.customize.borderColor" :predefine="predefineThemeColors" />
        </el-form-item>
         <el-form-item label="阴影样式">
          <el-input v-model="config.customize.boxShadow" placeholder="例: 0 4px 12px rgba(0,0,0,0.1)" clearable />
        </el-form-item>
      </div>

      <!-- 指标映射配置 -->
      <SettingTitle>指标映射配置</SettingTitle>
      <div class="lc-field-body">
          <div v-if="!config.dataSource || !config.dataSource.dimensionFieldList || config.dataSource.dimensionFieldList.length === 0" style="color: #E6A23C; font-size: 12px; margin-bottom: 10px;">
            请先在「数据」面板配置数据源并选择「维度/展示字段」。
          </div>
          <div v-else style="font-size: 12px; color: #909399; margin-bottom: 10px;">
            当前可用字段 (来自数据源配置): {{ config.dataSource.dimensionFieldList.join(', ') }}
            <br/>
            请为下方每个指标指定其对应的字段序号 (0代表第一个字段, 1代表第二个, 以此类推)。
          </div>

         <el-collapse accordion>
            <el-collapse-item
              v-for="(mapping, index) in config.customize.indicatorMappings"
              :key="index"
              :title="`指标 ${index + 1}: ${mapping.name || '未命名'}`"
              :name="index"
            >
              <div class="lc-field-body">
                 <el-form-item label="指标名称">
                   <el-input v-model="mapping.name" placeholder="显示在卡片上的名称" />
                 </el-form-item>
                 <el-form-item label="字段序号">
                    <el-tooltip placement="top" effect="dark">
                      <div slot="content">
                        对应数据源配置中「维度/展示字段」列表的序号<br/>
                        (0 = 第一个字段, 1 = 第二个字段, ...)
                      </div>
                      <el-input-number
                        v-model="mapping.keyIndex"
                        :min="0"
                        :max="config.dataSource.dimensionFieldList ? config.dataSource.dimensionFieldList.length - 1 : 0"
                        controls-position="right"
                        style="width: 100%"
                      />
                    </el-tooltip>
                 </el-form-item>
                 <el-button type="danger" size="mini" @click="removeIndicatorMapping(index)">删除此指标</el-button>
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-button
             type="primary"
             size="mini"
             @click="addIndicatorMapping"
             :disabled="!config.dataSource || !config.dataSource.dimensionFieldList || config.dataSource.dimensionFieldList.length === 0"
             style="margin-top: 10px;"
           >
             添加指标映射
           </el-button>
        </div>

        <!-- 文本样式配置 -->
         <SettingTitle>文本样式</SettingTitle>
         <div class="lc-field-body">
            <el-form-item label="字体大小">
              <el-input-number v-model="config.customize.fontSize" :min="0" /> <span>px</span>
            </el-form-item>
             <el-form-item label="名称颜色">
               <ColorPicker v-model="config.customize.labelColor" :predefine="predefineThemeColors" />
            </el-form-item>
             <el-form-item label="值颜色">
               <ColorPicker v-model="config.customize.valueColor" :predefine="predefineThemeColors" />
            </el-form-item>
             <el-form-item label="项间距">
               <el-input-number v-model="config.customize.itemMarginBottom" :min="0" /> <span>px</span>
            </el-form-item>
         </div>

      <!-- 位置、旋转等通用配置 -->
      <SettingTitle>位置</SettingTitle>
       <div class="lc-field-body">
         <PosWhSetting :config="config" />
       </div>
       <SettingTitle>旋转</SettingTitle>
       <div class="lc-field-body">
         <RotateSetting :config="config" />
       </div>

    </el-form>
  </div>
</template>

<script>
import SettingTitle from 'data-room-ui/SettingTitle/index.vue';
import ColorPicker from 'data-room-ui/ColorPicker/index.vue';
import PosWhSetting from 'data-room-ui/BigScreenDesign/RightSetting/PosWhSetting.vue';
import RotateSetting from 'data-room-ui/BigScreenDesign/RightSetting/RotateSetting.vue';
import { predefineColors } from 'data-room-ui/js/utils/colorList';
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'MultiMetricCardSetting',
  components: {
    SettingTitle,
    ColorPicker,
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
    return {
      // No specific data needed for this component itself now
    };
  },
  methods: {
    addIndicatorMapping() {
      if (!this.config.customize.indicatorMappings) {
        this.$set(this.config.customize, 'indicatorMappings', []);
      }
      // Find the next available index, default to 0 if empty
      const existingIndices = this.config.customize.indicatorMappings.map(m => m.keyIndex);
      let nextIndex = 0;
      while (existingIndices.includes(nextIndex) && nextIndex < this.config.dataSource.dimensionFieldList.length) {
        nextIndex++;
      }
       if (nextIndex >= this.config.dataSource.dimensionFieldList.length) {
         // Optionally alert user or just default to 0
         console.warn("All available field indices might be mapped already.");
         nextIndex = 0; // Or handle differently
       }

      this.config.customize.indicatorMappings.push(cloneDeep({
        name: `指标${this.config.customize.indicatorMappings.length + 1}`,
        keyIndex: nextIndex
      }));
    },
    removeIndicatorMapping(index) {
      if (this.config.customize.indicatorMappings && this.config.customize.indicatorMappings.length > index) {
        this.config.customize.indicatorMappings.splice(index, 1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.lc-field-body {
  padding: 12px 16px;
}
// Style for number input suffix 'px'
.el-form-item__content .el-input-number {
  width: calc(100% - 30px) !important; /* Adjust width */
  margin-right: 5px;
}
.el-form-item__content > span {
 display: inline-block;
 width: 20px; // Reserve space for 'px'
 text-align: right; // Align 'px' to the right
}
.el-collapse {
  margin-bottom: 10px; /* Add space before add button */
}
.el-collapse-item__content .lc-field-body {
   padding-top: 0; /* Reduce padding inside collapse */
   padding-bottom: 0;
}
.el-button--danger {
  margin-top: 10px; /* Space before delete button */
}
/* Ensure tooltip works with input-number */
.el-form-item__content .el-tooltip {
  width: 100%; 
}
</style> 