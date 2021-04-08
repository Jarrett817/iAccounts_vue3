<template>
  <div class="bill-list">
    <ul v-for="(group, index) in result" :key="index">
      <p>{{ groupTime(group[0].createTime) }}</p>
      <van-divider />
      <li v-for="item in group" :key="item.createTime">
        <div class="icon-title-wrap">
          <svg-icon :name="item.tag.icon" /> <span>{{ item.tag.name }}</span>
        </div>
        <span>{{ `${item.type === "expend" ? "-" : "+"}${item.value}` }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from "vue";
import dayjs from "dayjs";
import { ListItem } from "./types";

interface GroupData {
  [key: string]: ListItem[];
}
export default defineComponent({
  props: {
    listData: {
      type: Array as PropType<ListItem[]>,
      default: null
    }
  },
  components: {},
  setup(props) {
    let groups: GroupData = {};
    let result = ref<ListItem[][]>([]);
    watchEffect(() => {
      const _listData = props.listData;
      _listData.sort((pre: ListItem, next: ListItem) => {
        if (pre.createTime > next.createTime) return -1;
        else if (pre.createTime < next.createTime) return 1;
        else return 0;
      });
      // 聚合同一天的数据
      _listData.forEach(dataItem => {
        const date = dayjs(dataItem.createTime).valueOf().toString();
        groups[date] ? groups[date].push(dataItem) : (groups[date] = [dataItem]);
      });
      result.value = Object.keys(groups).map((key: string) => {
        return groups[key];
      });
    });
    const weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const groupTime = (time: number) => {
      return dayjs(time).format("MM月DD日") + " " + weekDay[dayjs(time).day()];
    };
    return { result, groupTime };
  }
});
</script>

<style lang="scss" scoped>
.bill-list {
  height: 100%;
  width: 100%;
  padding: 16px;
  ul {
    text-align: left;
    margin-bottom: 8px;
    p {
      font-size: 12px;
      color: #c8c9cc;
    }
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 14px;
      }
      .icon-title-wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 8px;
        .svg-icon {
          margin-right: 10px;
        }
      }
    }
  }
}
.van-divider {
  margin: 4px 0;
}
</style>
