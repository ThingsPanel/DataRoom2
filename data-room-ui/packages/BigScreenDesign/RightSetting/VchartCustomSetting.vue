<template>
  <div class="bs-setting-wrap">
    <el-form
      v-if="config"
      ref="form"
      :model="config"
      label-width="100px"
      label-position="left"
      class="setting-body bs-el-form"
    >
      <SettingTitle>图表样式</SettingTitle>
      <div class="lc-field-body">
        <!-- 主题选择 -->
        <el-form-item label="主题选择">
          <el-select
            v-model="chartThemeValue"
            popper-class="bs-el-select"
            class="bs-el-select"
            placeholder="请选择主题"
            clearable
          >
            <el-option
              v-for="(opt, optIndex) in vchartThemes"
              :key="optIndex"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>
      </div>
    </el-form>
     <div v-else class="empty-tip">
      请先选中一个 VChart 图表组件
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import _ from 'lodash'; // 使用 lodash 进行 debounce
import cloneDeep from 'lodash/cloneDeep';
import SettingTitle from 'data-room-ui/SettingTitle/index.vue';
// 导入 element-ui 组件，如果项目使用了的话
// import { Select, Option, Form, FormItem } from 'element-ui'; // 根据实际使用的UI库调整

// VChart 主题列表 (保持不变)
const vchartThemesList = [
   { label: '亮色 (默认)', value: 'light' },
   { label: '暗色', value: 'dark' },
   { label: '大屏-火山蓝', value: 'vScreenVolcanoBlue' },
   // ... (其他主题保持不变)
   { label: 'Semi-暗色', value: 'semiDesignDark' },
 ];

export default {
  name: 'VchartCustomSetting',
  // 注册使用的组件
  components: {
    SettingTitle,
    // 如果使用 Element UI 或其他库，在此注册
    // 'el-select': Select,
    // 'el-option': Option,
    // 'el-form': Form,
    // 'el-form-item': FormItem,
  },
  data() {
    return {
      vchartThemes: vchartThemesList,
      debouncedCommit: null,
      // 用于内部操作的配置副本，避免直接修改 prop
      internalConfig: null,
    };
  },
  computed: {
    // 从 Vuex 获取激活项配置
    ...mapState('bigScreen', {
      activeConfig: state => state.activeItemConfig
    }),

    // 提供给模板使用的 config，只读
    config() {
      return this.internalConfig;
    },

    // 计算属性：处理主题值
    chartThemeValue: {
      get() {
        if (!this.internalConfig || !this.internalConfig.setting) {
          return 'light'; // 默认值
        }
        // 从当前 internalConfig 的 setting 中查找主题值
        const setting = this.internalConfig.setting.find(s => s.field === 'chartTheme');
        return setting ? setting.value : 'light'; // 默认值
      },
      set(newValue) {
        // --- Log Point 1 --- 
        console.log('[chartThemeValue set] Start - Current internalConfig.option:', JSON.stringify(this.internalConfig?.option, null, 2));
        // 使用防抖函数提交更改
        this.updateSettingValue('chartTheme', newValue, {
          label: '主题选择',
          type: 'select', // 类型信息，虽然这里不渲染，但保持一致性
          optionField: 'theme', // 对应的 VChart Spec 字段
          options: this.vchartThemes, // 选项列表
          tabName: 'custom', // 分类
          groupName: 'graph', // 分组
        });
      },
    },
  },
  watch: {
    // 监听外部 activeConfig 的变化来更新 internalConfig
    activeConfig: {
      handler(newVal) {
        // --- Log Point 2 --- 
         console.log('[Watcher activeConfig] Received newVal.option:', JSON.stringify(newVal?.option, null, 2));
         // 深度克隆以创建独立的内部副本
        this.internalConfig = cloneDeep(newVal);
         // --- Log Point 3 --- 
         console.log('[Watcher activeConfig] Initialized internalConfig.option:', JSON.stringify(this.internalConfig?.option, null, 2));
         // 可选：在这里添加对 internalConfig 的初始化检查，确保 setting 数组存在
         if (this.internalConfig && !Array.isArray(this.internalConfig.setting)) {
            this.internalConfig.setting = [];
            console.warn('VchartCustomSetting: Initialized missing setting array.');
         }
      },
      deep: true,
      immediate: true // 立即执行以进行初始化
    },
  },
  created() {
    // 创建防抖提交函数
    this.debouncedCommit = _.debounce((newConfig) => {
      // 获取最新的 Vuex 状态作为参照
      const currentActiveConfig = this.$store.state.bigScreen.activeItemConfig;
       // --- Log Point 6 --- 
       console.log('[Debounced Commit] Start - Received newConfig.option:', JSON.stringify(newConfig?.option, null, 2));
       console.log('[Debounced Commit] Start - Current Vuex activeConfig.option:', JSON.stringify(currentActiveConfig?.option, null, 2));

      // --- 配置保留和一致性检查 ---
      if (newConfig && currentActiveConfig) {
        // 1. 确保 option 对象存在
        if (!newConfig.option) {
            console.warn('[Debounced Commit] newConfig.option was missing, initializing.');
            newConfig.option = {};
        }

        // 2. 保留 option.data 结构
        const currentOptionData = currentActiveConfig.option?.data;
        if (Array.isArray(currentOptionData) && currentOptionData.length > 0) {
          if (!Array.isArray(newConfig.option.data) || newConfig.option.data.length === 0) {
            console.warn('[Debounced Commit] Restoring config.option.data from current Vuex state:', JSON.stringify(currentOptionData));
            newConfig.option.data = cloneDeep(currentOptionData);
          }
        } else if (!Array.isArray(newConfig.option.data)) {
           console.warn('[Debounced Commit] Vuex state has no valid option.data, ensuring newConfig.option.data is empty array.');
           newConfig.option.data = [];
        }

        // 可选: 类似地保留 rawData
        const currentRawData = currentActiveConfig.option?.rawData;
        if (Array.isArray(currentRawData)) {
            if (!Array.isArray(newConfig.option.rawData)) {
                console.warn('[Debounced Commit] Restoring config.option.rawData from current Vuex state.');
                newConfig.option.rawData = cloneDeep(currentRawData);
            }
        }

        // 3. 确保 option.theme 与 setting 中的 chartTheme 一致
        const themeSetting = newConfig.setting?.find(s => s.field === 'chartTheme');
        const themeValueFromSetting = themeSetting ? themeSetting.value : 'light';
        if (newConfig.option.theme !== themeValueFromSetting) {
            console.warn(`[Debounced Commit] Forcing option.theme ('${newConfig.option.theme}') to match setting value ('${themeValueFromSetting}').`);
            newConfig.option.theme = themeValueFromSetting;
        }

        // 4. 保留原有的 type 和 chartType 检查
        if (!newConfig.type && currentActiveConfig.type) {
            newConfig.type = currentActiveConfig.type;
            console.warn('[Debounced Commit] Restored missing type from current Vuex state.');
        }
        if (!newConfig.chartType && currentActiveConfig.chartType) {
            newConfig.chartType = currentActiveConfig.chartType;
            console.warn('[Debounced Commit] Restored missing chartType from current Vuex state.');
        }

      } else {
         console.error('[Debounced Commit] Cannot perform checks: newConfig or currentActiveConfig is missing.');
         return;
      }

      // --- Log Point 7 --- 
      console.log('[Debounced Commit] Committing final newConfig.option:', JSON.stringify(newConfig?.option, null, 2));
      // --- 提交到 Vuex ---
      this.$store.commit('bigScreen/changeActiveItemConfig', newConfig);

    }, 400); // 400ms 延迟

     // 组件销毁时取消 debounce
     this.$on('hook:beforeDestroy', () => {
       if (this.debouncedCommit) {
         this.debouncedCommit.cancel();
       }
     });
  },
  methods: {
    // 统一处理 setting 值更新并触发防抖 commit
    updateSettingValue(field, newValue, settingTemplate) {
       // --- Log Point 4 --- 
      console.log('[updateSettingValue] Start - Current internalConfig.option:', JSON.stringify(this.internalConfig?.option, null, 2));
      // 必须操作 internalConfig 的副本
      if (!this.internalConfig) {
          console.error('Cannot update setting: internalConfig is null.');
          return;
      }

      // 创建一个新的副本进行修改
      const newConfig = cloneDeep(this.internalConfig);

      // 确保 setting 数组存在
      if (!Array.isArray(newConfig.setting)) {
          newConfig.setting = [];
      }

      let settingIndex = newConfig.setting.findIndex(s => s.field === field);

      if (settingIndex !== -1) {
        // 如果存在，直接更新值
        newConfig.setting[settingIndex].value = newValue;
      } else {
        // 如果不存在，使用模板创建新设置项并添加
        const newSetting = { ...settingTemplate, field: field, value: newValue };
        newConfig.setting.push(newSetting);
      }

      // 更新内部状态，这样 getter 能立刻反映变化
      this.internalConfig = newConfig; // 更新内部状态以反映 set 操作

      // 调用防抖提交，传递修改后的副本
      const configToCommit = cloneDeep(newConfig);
       // --- Log Point 5 --- 
      console.log('[updateSettingValue] Calling debouncedCommit with config.option:', JSON.stringify(configToCommit?.option, null, 2));
      this.debouncedCommit(configToCommit); // 传递新副本给 debounce
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/style/settingWrap.scss'; // 引入基础样式
.bs-setting-wrap {
  height: 100%;
  overflow-y: auto;
  padding: 10px; // 添加一些内边距
}
.lc-field-body {
  padding: 12px 16px;
}
.bs-el-select {
  width: 100%; // 让选择框撑满
}
.empty-tip {
  text-align: center;
  color: #999;
  margin-top: 20px;
}
// 可以根据需要添加或覆盖 Element UI 的样式变量
// ::v-deep .el-form-item__label { ... }
// ::v-deep .el-input__inner { ... }
</style>

