<template lang="pug">
  base-card(:title="title")
      el-row(:gutter="10")
        el-col(
            :xs="24",
            :sm="24",
            :md="24",
            :lg="12",
            :xl="12",
            v-for="(colItem, index) in splitedList",
            :key="index"
        )
          ul.detail-info-list
            li.detail-info-list_item(v-for="item in colItem", :key="item.field")
              .detail-info-list_label {{ item.label }}：
              .detail-info-list_content
              el-link(v-if="item.type && item.type === 'URL'", :href="item.value", target="_blank") {{ formatContent(item) }}
              span(v-else) {{ formatContent(item) }}
</template>

<script>
export default {
  props: {
    detailData: {
      type: Object,
      default: () => ({})
    },
    detailFieldList: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ""
    },
    resultFlag: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {
    formatContent(item) {
      if (item.formatter) {
        const result = item.formatter(item.value);
        if (result && result.length > 0)
          return Array.isArray(result) ? result.toString().replaceAll(",", "、") : result;
        else return "/";
      }
      return item.value ? item.value : "/";
    }
  },
  computed: {
    //附加上value属性后的对象列表
    dataList() {
      return this.detailFieldList
        .filter(item => {
          if (this.resultFlag) {
            return true;
          } else if (!this.resultFlag && !item.hidden) {
            return true;
          }
        })
        .map(item => {
          item.value = this.detailData[item.field];
          return item;
        });
    },
    splitedList() {
      const result = [];
      const len = this.dataList.length;
      const __dataList = this.dataList;
      const rowMax = Math.ceil(len / 2);
      result.push(__dataList.splice(0, rowMax));
      result.push(__dataList.splice(0));
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-info-list {
  font-size: 12px;

  &_item {
    display: flex;
    margin: 8px 0;
    flex-direction: row;

    .detail-info-list_label {
      font-size: 12px;
      color: #99acd4;
      letter-spacing: 0;
      display: inline-block;
      min-width: 100px;
      text-align: left;
      vertical-align: top;
      white-space: nowrap;
    }

    .detail-info-list_content {
      font-size: 12px;
      color: #cad8f9;
      letter-spacing: 0;
      display: inline-block;

      .el-link {
        color: #30b9f3;
      }
    }
  }
}
</style>
