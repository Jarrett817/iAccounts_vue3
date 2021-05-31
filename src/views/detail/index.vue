<template>
  <i-layout>
    <template v-slot:header>
      <van-nav-bar
        left-text="返回"
        left-arrow
        :title="from === 'tags' ? (mode === 'add' ? '新建标签' : '编辑标签') : ''"
        @click-left="onClickLeft"
      >
        <template v-if="from !== 'tags'" #title>
          <svg-icon :name="tagMap.icon || billsMap.tag.icon" />
          <span>{{ tagMap.name || billsMap.tag.name }}</span>
        </template>
      </van-nav-bar>
    </template>
    <template v-slot:main>
      <template v-if="from === 'tags'">
        <van-cell-group>
          <van-field label="名称" maxlength="4" v-model="tagMap.name" />
          <van-field label="图标" @click-right-icon="showIconList = true" readonly>
            <template #right-icon>
              <svg-icon :name="tagMap.icon" />
              <van-icon name="arrow" />
            </template>
          </van-field>
        </van-cell-group>
        <icon-list v-model:show="showIconList" @selected="onSelected"></icon-list>
      </template>
      <template v-else>
        <van-cell-group>
          <van-field
            v-for="(value, key) in {
              type: billsMap.type,
              value: billsMap.value,
              createdAt: billsMap.createdAt,
              desc: billsMap.desc
            }"
            :key="key"
            :label="keyMap[key]"
            :model-value="fieldValueFormatter(key, value)"
            readonly
          />
        </van-cell-group>
      </template>
    </template>
    <template v-slot:footer>
      <div class="button-wrap">
        <van-button type="default" @click="editClick">{{
          from === "tags" ? "保存" : "编辑"
        }}</van-button>
        <van-button v-if="mode !== 'add'" type="default" @click="deleteClick">删除</van-button>
      </div>
      <money-pannel
        v-model:show="moneyPannelVisible"
        :params="{ ...billsMap, tagId: billsMap.tag.id }"
      ></money-pannel>
    </template>
  </i-layout>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, reactive, ref } from "vue";
import { billService, tagService } from "@/services";
import { ListItem } from "../common/types";
import IconList from "../components/icon-list.vue";
import { Dialog } from "vant";
import dayjs from "dayjs";
export default defineComponent({
  components: { IconList },
  props: {
    from: {
      type: String,
      default: "/"
    },
    id: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const keyMap = {
      value: "金额",
      type: "类型",
      desc: "备注",
      createdAt: "日期"
    };
    const tagMap: {
      id: number | null;
      name: string;
      icon: string;
    } = reactive({ id: null, name: "", icon: "" });
    const billsMap: ListItem = reactive({
      id: null,
      type: "",
      value: 0,
      desc: "",
      tag: {
        id: null,
        name: "",
        icon: ""
      },
      createdAt: undefined
    });
    const moneyPannelVisible = ref(false);
    const showIconList = ref(false);
    const router = useRouter();
    const onClickLeft = () => {
      router.push({ name: props.from });
    };
    const getTargetDetail = async (id: string) => {
      if (props.from === "tags") {
        if (props.mode !== "add") {
          const result = await tagService.getTargetDetail({ id: Number(id) }).then(res => res);
          Object.assign(tagMap, result);
        }
      } else {
        const result = await billService.getTargetDetail({ id: Number(id) }).then(res => res);
        Object.assign(billsMap, result);
      }
    };
    const fieldValueFormatter = (key: string, val: any) => {
      if (key === "type") {
        return val === "expend" ? "支出" : "收入";
      } else if (key === "createdAt") {
        return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
      } else {
        return val;
      }
    };
    getTargetDetail(props.id);
    const editClick = () => {
      if (props.from === "tags") {
        if (props.mode === "add") {
          tagService
            .addTag({
              name: tagMap.name,
              icon: tagMap.icon,
              type: props.type as "income" | "expend"
            })
            .then(() => {
              router.push({ name: props.from });
            });
        } else {
          tagService
            .updateTargetTag({
              id: Number(props.id),
              name: tagMap.name,
              icon: tagMap.icon
            })
            .then(() => {
              router.push({ name: props.from });
            });
        }
      } else {
        moneyPannelVisible.value = true;
      }
    };
    const deleteClick = () => {
      Dialog.confirm({
        message: "确认删除？"
      })
        .then(() => {
          if (props.from === "tags") tagService.deleteTargetTag({ id: Number(props.id) });
          else billService.deleteTargetBill({ id: Number(props.id) });
          router.push({ name: props.from });
        })
        .catch(() => {});
    };
    const onSelected = (iconName: string) => {
      tagMap.icon = iconName;
      showIconList.value = false;
    };
    const navbarTitleHeight = props.from === "tags" ? "auto" : "76px";
    return {
      navbarTitleHeight,
      onSelected,
      showIconList,
      fieldValueFormatter,
      moneyPannelVisible,
      editClick,
      deleteClick,
      onClickLeft,
      getTargetDetail,
      keyMap,
      tagMap,
      billsMap
    };
  }
});
</script>

<style lang="scss" scoped>
.van-nav-bar {
  height: v-bind(navbarTitleHeight);
  &__title {
    .svg-icon {
      font-size: 28px;
    }
  }
}
::v-deep(.van-field__right-icon) {
  display: flex;
  flex-direction: row;
  align-items: center;
  .svg-icon {
    margin-right: 8px;
  }
}
.button-wrap {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .van-button {
    flex: 1;
    height: 100%;
  }
}
</style>
