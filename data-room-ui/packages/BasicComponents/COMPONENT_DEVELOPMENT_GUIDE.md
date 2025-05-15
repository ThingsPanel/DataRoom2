# 基础组件开发指南

本文档旨在指导开发者如何在 `packages/BasicComponents` 目录下创建新的基础组件，并将其集成到 DataRoom3 项目中。

## 1. 准备工作与目录结构

对于每个新的基础组件（例如，我们称之为 `MyComponent`），通常需要创建以下文件和目录结构：

```
packages/BasicComponents/
└── MyComponent/
    ├── icons/                  // (可选) 如果组件使用本地SVG图标
    │   └── some-icon.svg
    ├── index.vue               // 组件的渲染逻辑 (画布中显示)
    ├── setting.vue             // 组件的配置面板UI (右侧设置区域)
    └── settingConfig.js        // 组件的配置项定义、默认值和schema
    └── iconList.js             // (可选) 如果组件有可选图标列表，如 SvgIcon
```

## 2. `index.vue` - 组件渲染

此文件负责组件在画布上的实际显示。

*   **`name`**: 组件名称，应遵循帕斯卡命名法 (PascalCase)，例如 `MyComponent`。
*   **`props`**:
    *   通常会接收一个 `config` 对象作为 prop，该对象包含了组件的所有配置信息（位置、大小、自定义属性等）。
    *   `config` 的结构应与 `settingConfig.js` 中定义的 `defaultView` 和 `customConfig` 相对应。
*   **Mixins**:
    *   `commonMixins`: 提供通用的混入逻辑。
    *   `linkageMixins`: 提供数据联动相关的混入逻辑。
*   **Vuex**: 如果需要，可以使用 `mapState` 从 Vuex store 中获取全局状态 (例如 `state.bigScreen.pageInfo.chartList`)。
*   **SVG 图标使用 (示例)**:
    ```html
    <svg aria-hidden="true" class="icon-svg">
      <use :xlink:href="`#icon-${config.customizeprop}`"></use>
    </svg>
    ```
    这需要配合 `svg-sprite-loader` 和在 `vue.config.js` (或 `vue.config.example.js` / `vue.config.package.js`) 中的正确配置。
*   **样式**: 使用 `<style lang="scss" scoped>` 或 `<style lang="less" scoped>` 编写组件的局部样式。

**示例 `index.vue` 结构:**
```vue
<template>
  <div class="my-component-wrapper" :style="wrapperStyle">
    <!-- 组件内容 -->
    <p>{{ config.customize.text || '默认文本' }}</p>
  </div>
</template>

<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins';
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins';
// import { mapState } from 'vuex';

export default {
  name: 'MyComponent',
  mixins: [commonMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({
        customize: {
          text: '默认文本',
          color: '#333333'
        },
        w: 200, // 默认宽度
        h: 100  // 默认高度
      })
    }
  },
  computed: {
    wrapperStyle() {
      return {
        width: `${this.config.w || 200}px`,
        height: `${this.config.h || 100}px`,
        // 根据 config.customize 中的属性应用其他样式
        color: this.config.customize.color 
      };
    }
  },
  mounted() {
    // console.log('MyComponent config:', this.config);
  }
};
</script>

<style lang="scss" scoped>
.my-component-wrapper {
  // 样式
}
</style>
```

## 3. `settingConfig.js` - 配置定义与默认值

此文件定义了组件的元数据、在组件列表中的显示方式、默认配置以及配置面板的选项。

*   **`title`**: 组件在左侧组件列表中的显示名称 (例如：`'我的组件'`)。
*   **`type`**: 组件的唯一标识符 (例如：`'myComponent'`)。**必须唯一！**
*   **`icon`**: (可选) 组件在左侧列表中的图标，通常是 Element UI 图标类名或自定义SVG图标的ID。
*   **`img`**: (可选) 组件在左侧列表中的预览图片路径。
*   **`isNeedData`**: (可选, Boolean) 指示组件是否需要连接数据源。默认为 `false`。
*   **`defaultView`**: 组件添加到画布时的初始配置，包括：
    *   `w`, `h`: 默认宽度和高度。
    *   `x`, `y`: 默认位置 (通常由画布自动处理，但可以设为0)。
    *   `customConfig`: **非常重要**，定义了组件特有的自定义配置项及其默认值。这些配置会合并到 `config.customize` 对象中。
*   **`displayOption`**: (可选) 控制配置面板中哪些标准配置项（如图层、数据源、联动等）是可见或禁用的。
    ```javascript
    displayOption: {
      dataSourceOption: { // 数据源配置
        enable: false // 禁用数据源选择
      }
    }
    ```
*   **`config`**: (废弃或特定用途) 通常应使用 `defaultView.customConfig` 来定义自定义属性。
*   **`setting`**: (废弃或特定用途) 配置面板的schema定义，通常与 `setting.vue` 结合。对于较新的组件，配置面板的UI结构更多地直接在 `setting.vue` 中定义。
*   **`values`**: (废弃或特定用途)

**示例 `settingConfig.js` 结构:**
```javascript
// import { EreignisDefine } from 'data-room-ui/js/eventSheet'; // 如果需要事件定义

export const settingConfig = {
  title: '我的组件',
  type: 'myComponent',
  icon: 'el-icon-star-on', // 或自定义图标 '#icon-my-component-icon'
  // img: require('./my-component-preview.png'), // 预览图
  isNeedData: false,
  defaultView: {
    w: 200,
    h: 100,
    x: 0,
    y: 0,
    customConfig: { // 组件的自定义配置
      text: '这是我的组件',
      color: '#000000',
      fontSize: '16px',
      // ... 其他自定义属性
    }
  },
  displayOption: { // 控制哪些标准配置项显示
    dataSourceOption: { // 禁用数据源相关的tab和配置
      enable: false
    },
    eventOption: { // 禁用事件配置相关的tab和配置
      enable: false
    },
    advancedSetting: { // 禁用高级设置相关的tab和配置
      enable: false
    }
  }
};

export default settingConfig;
```

## 4. `setting.vue` - 配置面板UI

此文件负责构建组件在右侧配置面板中的用户界面。

*   **`name`**: 配置面板组件的名称，例如 `MyComponentSetting`。
*   **Vuex**: **核心交互**。通过计算属性 `config` 来读取和修改当前选中组件的配置：
    ```javascript
    computed: {
      config: {
        get() {
          return this.$store.state.bigScreen.activeItemConfig;
        },
        set(val) {
          // 注意：直接修改 $store.state.bigScreen.activeItemConfig 可能不是最佳实践
          // 考虑使用 mutation 来更新，或者确保这种直接修改是被允许的模式
          this.$store.state.bigScreen.activeItemConfig = val; 
          // 或者更推荐的方式是 dispatch 一个 action 或 commit 一个 mutation 来更新配置
          // this.$store.commit('changeActiveItemConfig', val); 
        }
      }
    }
    ```
    **重要**: 确保 `config.customize` 对象存在才渲染表单，否则可能会因为 `activeItemConfig` 初始为空或 `customize` 未定义而出错。
    ```html
    <div v-if="config && config.customize">
      <el-form :model="config.customize" ...>
        <!-- 表单项 -->
      </el-form>
    </div>
    <div v-else>配置加载中...</div>
    ```
*   **UI组件**:
    *   `SettingTitle`: 用于配置组的标题。
    *   `ColorPicker`: 颜色选择器。
    *   Element UI 组件 (`el-form`, `el-form-item`, `el-input`, `el-select`, `el-switch` 等) 用于构建表单。
*   **数据绑定**: 表单输入项通过 `v-model` 双向绑定到 `config.customize.yourProperty`。
*   **图标选择 (如果适用)**:
    *   可能需要 `iconList.js` 来提供图标数据。
    *   使用 `el-tabs` 和 `v-for` 来展示分类和图标。
    *   点击图标时，更新 `config.customize.iconClass` (或类似属性)。

**示例 `setting.vue` 结构:**
```vue
<template>
  <div class="my-component-setting bs-setting-wrap">
    <div v-if="config && config.customize">
      <el-form
        ref="form"
        :model="config.customize"
        label-width="100px"
        label-position="left"
        class="setting-body bs-el-form"
      >
        <SettingTitle>基础配置</SettingTitle>
        <div class="lc-field-body">
          <el-form-item label="显示文本">
            <el-input v-model="config.customize.text" />
          </el-form-item>
          <el-form-item label="文本颜色">
            <ColorPicker v-model="config.customize.color" />
          </el-form-item>
          <el-form-item label="字体大小">
            <el-input v-model="config.customize.fontSize">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
        </div>

        <!-- 其他配置组 -->
        <!-- <SettingTitle>高级配置</SettingTitle> -->
        <!-- <div class="lc-field-body"> ... </div> -->
      </el-form>
    </div>
    <div v-else>
      <p>配置加载中或 Vuex store 中的 activeItemConfig.customize 不存在。</p>
    </div>
  </div>
</template>

<script>
import SettingTitle from 'data-room-ui/SettingTitle/index.vue';
import ColorPicker from 'data-room-ui/ColorPicker/index.vue';
// import { iconCategories, iconList } from './iconList'; // 如果有图标选择
// import { predefineColors } from "data-room-ui/js/utils/colorList";

export default {
  name: 'MyComponentSetting',
  components: {
    SettingTitle,
    ColorPicker,
  },
  data() {
    return {
      // predefineThemeColors: predefineColors, // 如果颜色选择器需要预定义颜色
    };
  },
  computed: {
    config: {
      get() {
        // 确保返回的是一个对象，即使 customize 不存在，以避免模板访问 undefined 的属性
        return this.$store.state.bigScreen.activeItemConfig || { customize: {} };
      },
      set(val) {
        // 确保你正在更新 store 中的正确部分，并且是以响应式的方式
        // 最好通过 mutations 更新，以遵循 Vuex 的模式
        this.$store.commit('changeChartConfig', { ...this.$store.state.bigScreen.activeItemConfig, ...val });
        // 或者如果 activeItemConfig 本身需要被替换 (不推荐直接赋值 state)
        // this.$store.commit('changeActiveItemConfig', val);
      }
    },
    // 用于调试Vuex状态
    // vuexConfigForDebug() {
    //   return this.$store.state.bigScreen.activeItemConfig;
    // }
  },
  watch: {
    // 可以添加 watcher 来响应配置变化或进行验证
    // 'config.customize.text'(newVal) {
    //   console.log('Text changed to:', newVal);
    // }
  },
  methods: {
    // 表单操作方法
  }
};
</script>

<style lang="less" scoped>
.bs-setting-wrap {
  padding-top: 16px;
}
.lc-field-body {
  padding: 12px 16px;
}
</style>
```
**注意 `config` 计算属性的 `set` 方法**: 直接修改 `this.$store.state.bigScreen.activeItemConfig` 可能绕过了 Vuex 的严格模式和 devtools 追踪。更推荐的方式是 `commit`一个 mutation (如 `changeChartConfig` 或 `changeActiveItemConfig`) 来更新状态。请参考项目中已有的 `setting.vue` 文件（如 `Texts/setting.vue`）是如何处理配置更新的。通常是修改 `config.customize` 的属性，然后 Vuex store 中对应的 `activeItemConfig` 也会因为是同一个对象引用而更新。

## 5. `iconList.js` (可选, 针对SvgIcon类组件)

如果组件包含一个可选择的本地SVG图标列表 (如 `SvgIcon` 组件)，则创建此文件。

*   **`iconList`**: 一个数组，每个元素描述一个图标，包含 `name` (显示名), `category` (分类), `id` (SVG symbol的ID，不含 `icon-` 前缀)。
*   **`iconCategories`**: 一个数组，描述图标分类，用于在 `setting.vue` 的 `el-tabs` 中生成选项卡。

**示例 `iconList.js`:**
```javascript
export const iconList = [
  { name: '图标一', category: 'general', id: 'my-icon-one' },
  { name: '图标二', category: 'special', id: 'my-icon-two' }
];

export const iconCategories = [
  { name: '通用图标', value: 'general' },
  { name: '特殊图标', value: 'special' }
];
```

## 6. 全局注册组件

新组件需要注册到系统中才能被使用。

### a. `packages/js/config/basicComponentsConfig.js`

在此文件中导入新组件的 `settingConfig.js` 和其对应的 `setting.vue`。

```javascript
// ... 其他导入 ...
import MyComponentSettingConfig from 'data-room-ui/BasicComponents/MyComponent/settingConfig.js';
const MyComponentSetting = () => import('data-room-ui/BasicComponents/MyComponent/setting.vue');
// ...

export const basicComponentsConfig = [
  // ... 其他组件配置 ...
  {
    ...MyComponentSettingConfig,
    setting: MyComponentSetting // 动态导入配置面板组件
  }
];
```
将新组件的配置对象（包含 `settingConfig` 的内容和 `setting` 组件的动态导入）添加到 `basicComponentsConfig` 数组中。

### b. `packages/js/config/getComponentConfig.js`

在此文件中导入新组件的 `index.vue` 和 `settingConfig.js`，并将其添加到 `componentConfigList` 对象中。

```javascript
// ... 其他导入 ...
import MyComponent from 'data-room-ui/BasicComponents/MyComponent/index.vue';
import MyComponentSettingConfig from 'data-room-ui/BasicComponents/MyComponent/settingConfig.js';
// ...

export const componentConfigList = {
  // ... 其他组件 ...
  myComponent: { // key 必须与 settingConfig.js 中的 type 一致
    component: MyComponent,
    config: MyComponentSettingConfig // 提供默认配置
  }
  // ...
};
```

## 7. SVG 图标精灵 (Sprite) 配置 (如果使用本地SVG)

如果组件（或其配置面板）使用了本地的 `.svg` 文件作为图标，需要确保 `svg-sprite-loader` 配置正确。

*   **检查 `vue.config.example.js` 和 `vue.config.package.js`** (或项目实际使用的 `vue.config.js`):
    *   确保 `svg-sprite-loader` 的 `include` 路径包含了新组件的 `icons` 目录 (例如 `config.module.rule('svg').exclude.add(resolve('packages/BasicComponents/MyComponent/icons'))` 和 `config.module.rule('icons').test(/\.svg$/).include.add(resolve('packages/BasicComponents/MyComponent/icons')).end() ...`)。
    *   通常的 `symbolId` 格式是 `icon-[name]`。

## 8. 开发与调试

*   **启动开发服务器**: 运行 `npm run dev` 或项目对应的启动命令。
*   **Vue Devtools**: 使用浏览器扩展 Vue Devtools 检查组件状态、props 和 Vuex store。
*   **测试**:
    1.  从左侧组件列表拖拽新组件到画布。
    2.  检查 `index.vue` 是否按默认配置正确渲染。
    3.  选中组件，检查右侧配置面板 (`setting.vue`) 是否正确加载。
    4.  修改配置面板中的选项，确认 `index.vue` 的显示会相应更新。
    5.  测试所有自定义功能。
*   **缓存问题**: 如果遇到组件未按预期更新（特别是 `setting.vue` 显示错误组件的情况），尝试：
    1.  完全停止开发服务器。
    2.  删除 `node_modules/.cache` 目录。
    3.  重启开发服务器。
    4.  浏览器硬刷新并清除缓存。

## 9. 命名约定与风格

*   **文件名**: 使用小写kebab-case (例如 `my-component-icon.svg`) 或帕斯卡命名法 (PascalCase) (例如 `MyComponent.vue`)。与项目现有风格保持一致。
*   **Vue组件名 (`name` 属性)**: PascalCase (例如 `MyComponent`, `MyComponentSetting`)。
*   **`settingConfig.type`**: camelCase (例如 `myComponent`)。
*   **CSS类名**: BEM风格或项目已有的CSS命名约定。

---

遵循以上步骤，您应该能够顺利地在项目中开发和集成新的基础组件。如果遇到特定问题，可以参考现有组件的实现方式或查阅相关文档。 