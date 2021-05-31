<template>
  <div class="bill-list" v-if="result?.length">
    <ul v-for="(group, index) in result" :key="index">
      <p>
        <span>{{ groupTime(group[0].createdAt) }}</span>
        <span v-html="dailyBalance(group)"></span>
      </p>
      <van-divider />
      <li v-for="(item, index) in group" :key="item.createdAt">
        <router-link :to="`/billList/detail/${item.id}?from=billList`">
          <div class="bill-item">
            <div class="icon-title-wrap">
              <svg-icon :name="item.tag.icon"></svg-icon>
              <span>{{ item.tag.name }}</span>
            </div>
            <span :class="[isExpend(item.type) ? 'expend-color' : 'income-color']">{{
              `${item.type === "expend" ? "-" : "+"}${item.value}`
            }}</span>
          </div>
        </router-link>
        <van-divider v-if="group[index + 1]" :style="{ padding: '4px 32px' }"></van-divider>
      </li>
    </ul>
  </div>
  <template v-else>
    <van-empty class="custom-image" :image="noBills">
      <template v-slot:description>
        一笔流水都没有，赶快<i-button @click="handleClick">记一笔</i-button>吧~
      </template>
      <money-pannel v-model:show="moneyPannelVisible"></money-pannel>
    </van-empty>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from "vue";
import dayjs from "dayjs";
import { ListItem } from "../common/types";
import noBills from "@/assets/emptyStatus/noBills.png";
import { cloneDeep } from "lodash";
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
  setup(props, ctx) {
    let groups: GroupData = {};
    let result = ref<ListItem[][]>([]);
    watchEffect(() => {
      groups = {};
      result.value = [];
      if (props.listData?.length) {
        const _listData = cloneDeep(props.listData);
        _listData.sort((pre: ListItem, next: ListItem) => {
          if (pre.createdAt! > next.createdAt!) return -1;
          else if (pre.createdAt! < next.createdAt!) return 1;
          else return 0;
        });
        // 聚合同一天的数据
        _listData.forEach(dataItem => {
          const date = dayjs(dataItem.createdAt!).format("YYYYMMDD");
          groups[date] ? groups[date].push(dataItem) : (groups[date] = [dataItem]);
        });
        result.value = Object.keys(groups)
          .sort((pre: string, next: string) => {
            const _pre = Number(pre);
            const _next = Number(next);
            if (_pre > _next) return -1;
            else if (_pre < _next) return 1;
            else return 0;
          })
          .map((key: string) => {
            return groups[key];
          });
      }
    });
    const weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const groupTime = (time: number | undefined) => {
      return dayjs(time!).format("MM月DD日") + " " + weekDay[dayjs(time!).day()];
    };
    const dailyBalance = (group: ListItem[]) => {
      let expend = 0;
      let income = 0;
      let result = "";
      group.forEach(item => {
        if (item.type === "expend") expend += item.value;
        else income += item.value;
      });
      income ? (result += `收入：${income}`) : "";
      if (income && expend) result += "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
      expend ? (result += `支出：${expend}`) : "";
      return result;
    };

    const isExpend = (type: string) => {
      if (type === "expend") return true;
      else return false;
    };
    const moneyPannelVisible = ref(false);
    const handleClick = () => {
      moneyPannelVisible.value = true;
    };
    return { noBills, result, groupTime, dailyBalance, isExpend, handleClick, moneyPannelVisible };
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
    > .van-divider {
      width: 100vw;
      margin-left: -16px;
      border-color: #dcdee0;
    }
    > p {
      font-size: 12px;
      color: #c8c9cc;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .bill-item {
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
.income-color {
  color: #e67e81;
}
.expend-color {
  color: #4ca2f8;
}
</style>
