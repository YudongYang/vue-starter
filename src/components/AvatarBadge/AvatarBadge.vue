<template>
  <!-- 这里不知道为什么 Badge 和 Avatar 就是对不齐，强行 offset 一下对齐 -->
  <Badge :count="badgeCount" style="margin-right: 10px" :offset="[14, 0]">
    <a href="javascript: void(0);" @click="openMessageBox">
      <Avatar v-if="user.avatar" :src="user.avatar" />
      <Avatar v-if="!user.avatar" icon="person" />
    </a>
  </Badge>
</template>

<script>
export default {
  name: "AvatarBadge",
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: "YuDong",
          avatar: "https://cn.vuejs.org/images/logo.png"
        };
      }
    },
    badgeCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    openMessageBox() {
      this.$emit("on-click");
    }
  }
};
</script>

<style></style>
