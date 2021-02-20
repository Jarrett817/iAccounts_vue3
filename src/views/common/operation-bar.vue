<template lang="pug">
.operation-bar
  .sketch
    .sketch-title {{ sketch.title }}
    .sketch-description(v-if="sketch.field || sketch.description") {{sketch.field}}：{{ sketch.description }}
  el-button-group 
    template(v-if="buttonList.length <= 3")
      el-button(
        v-for="button in buttonList",
        :key="button.label",
        :type="button.type",
        @click="button.handleClick",
        :disabled="button.status"
      ) {{ button.label }}
    template(v-else)
      el-button(
        v-for="button in buttonList.slice(0, 2)",
        :key="button.label",
        :type="button.type",
        @click="button.handleClick",
        :disabled="button.status"
      ) {{ button.label }}
      el-dropdown(trigger="click")
        el-button(type="primary")
          i.el-icon-more
        el-dropdown-menu(slot="dropdown")
          el-button(
            v-for="button in buttonList.slice(2)",
            :key="button.label",
            :type="button.type",
            @click="button.handleClick",
            :disabled="button.status"
          ) {{ button.label }}
</template>

<script>
export default {
  components: {},
  props: {
    buttonList: {
      type: Array,
      default: () => []
    },
    sketch: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style lang="scss" scoped>
.operation-bar {
  background: #3d4769;
  display: flex;
  justify-content: space-between;
  text-align: right;
  align-items: center;
  padding: 15px 0 15px 16px;

  .sketch {
    display: inline-block;
    text-align: left;

    &-title {
      font-size: 16px;
      color: #fff;
      display: inline-block;
      margin-right: 15px;
    }

    &-description {
      color: #99acd4;
      display: inline-block;
      font-size: 12px;
    }
  }

  .el-button-group {
    margin-right: 16px;

    .el-button + .el-button {
      margin-left: 8px;
    }

    .el-button {
      border-radius: 3px;
    }
  }
}
</style>
