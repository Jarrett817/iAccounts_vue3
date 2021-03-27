<template>
  <div class="bill-list">
    <van-cell-group v-for="(group, index) in result" :key="index">
      <van-cell
        v-for="item in group"
        :key="item.createTime"
        :title="item.name"
        :value="item.value"
        :label="item.desc"
      />
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from 'vue';
import dayjs from 'dayjs';
import { GroupData, ListData } from './types';

export default defineComponent({
  props: {
    listData: {
      type: Array as PropType<ListData[]>,
      default: null,
    },
  },
  components: {},
  setup(props) {
    let groups: GroupData = {};
    let result = ref<ListData[][]>([]);
    watchEffect(() => {
      // 聚合同一天的数据
      props.listData.forEach((dataItem) => {
        const date = dayjs(dataItem.createTime).valueOf().toString();
        groups[date] ? groups[date].push(dataItem) : (groups[date] = [dataItem]);
      });
      result.value = Object.keys(groups).map((key: string) => {
        return groups[key];
      });
    });

    return { result };
  },
});
</script>

<style lang="scss" scoped>
.bill-list {
  height: 100%;
  width: 100%;
}
</style>
