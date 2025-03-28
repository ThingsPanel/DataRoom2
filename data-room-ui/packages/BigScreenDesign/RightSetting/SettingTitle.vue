<template>
  <div class="lc-field-title">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SettingTitle'
}
</script>

<style lang="scss" scoped>
.lc-field-title {
  position: relative;
  padding-left: 12px;
  line-height: 30px;
  height: 30px;
  margin-bottom: 12px;
  color: var(--bs-text-color);
  font-weight: 500;
  &:after {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    content: '';
    width: 4px;
    height: 14px;
    background-color: var(--bs-el-color-primary);
  }
}
</style> 