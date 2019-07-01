<template>
  <div id="app">
    <LayoutMenuLeft :menu-level="2" :menus="menus">
      <AvatarBadge slot="avater-badge" :badge-count="badgeCount"></AvatarBadge>
    </LayoutMenuLeft>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      menus: [
        {
          id: 1,
          name: "parent_menu_1",
          url: "/",
          children: [
            {
              id: 11,
              name: "children_menu_1",
              url: "/"
            },
            {
              id: 12,
              name: "children_menu_2",
              url: "/"
            }
          ]
        },
        {
          id: 2,
          name: "parent_menu_2",
          url: "/"
        }
      ],
      badgeCount: 12
    };
  }
};
</script>

<style></style>
