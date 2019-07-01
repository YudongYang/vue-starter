<style>
html body {
  height: 100%;
  min-height: 750px;
}
</style>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: auto;
  height: 100%;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.layout-menu-left {
  height: auto;
  min-height: 750px;
}
.layout-logo {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
  color: #fff;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  line-height: 30px;
}
.layout-content {
  min-height: 200px;
  margin: 15px;
  overflow: visible;
  background: #fff;
  border-radius: 4px;
  height: auto;
  min-height: 700px;
}
.layout-breadcrumb {
  padding: 10px 20px 0;
}
.layout-footer-center {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  /* 这个控制菜单显示长度 */
  /* overflow: hidden; */
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.layout-logo span {
  display: inline;
  overflow: none;
  text-overflow: none;
  white-space: none;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.header-logout {
  float: right;
  margin-right: 20px;
  line-height: 60px;
  color: #495060;
  font-size: 14px;
}
</style>

<template>
  <div class="layout">
    <Layout>
      <Sider
        class="layout-menu-left"
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
      >
        <Menu
          :active-name="$route.path"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
          :open-names="expandMenus"
          @on-select="routeTo"
        >
          <div class="layout-logo">
            <span v-if="!isCollapsed">{{ system.name }}</span>
          </div>
          <!-- 只有一级菜单 -->
          <div v-if="menuLevel === 1">
            <MenuItem
              v-for="menu in currentMenus"
              :key="menu.id"
              :name="menu.url"
            >
              <Icon :type="menu.icon"></Icon>
              <span v-if="!isCollapsed">{{ menu.name }}</span>
            </MenuItem>
          </div>
          <!-- 两级菜单 -->
          <div v-if="menuLevel === 2">
            <template v-for="menu in currentMenus">
              <Submenu
                v-if="menu.children && menu.children.length > 0"
                :key="menu.id"
                :name="menu.name"
              >
                <template slot="title">
                  <Icon :type="menu.icon"></Icon>
                  <span v-if="!isCollapsed">{{ menu.name }}</span>
                </template>
                <MenuItem
                  v-for="subMenu in menu.children"
                  :key="subMenu.id"
                  :name="subMenu.url"
                >
                  <Icon :type="subMenu.icon"></Icon>
                  <span v-if="!isCollapsed">{{ subMenu.name }}</span>
                </MenuItem>
              </Submenu>
            </template>
          </div>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{ padding: 0 }" class="layout-header-bar">
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{ margin: '0 20px' }"
            type="md-menu"
            size="24"
          ></Icon>
          <div class="header-logout">
            <slot name="avater-badge"></slot>
            <Dropdown style="margin-right: 20px" @on-click="userMenuClicked">
              {{ user.username }}
              <Icon type="md-arrow-dropdown" />
              <DropdownMenu slot="list">
                <DropdownItem name="quit" divided>安全退出</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Header>
        <Breadcrumb class="layout-breadcrumb">
          <BreadcrumbItem>首页</BreadcrumbItem>
          <BreadcrumbItem>{{ $route.meta.title }}</BreadcrumbItem>
        </Breadcrumb>
        <Content
          class="layout-content"
          :style="{
            margin: '20px',
            padding: '10px',
            background: '#fff',
            minHeight: '260px'
          }"
        >
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
              <!-- 这里是会被缓存的视图组件，List -->
            </router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive">
            <!-- 这里是不被缓存的视图组件，show -->
          </router-view>
        </Content>
        <Footer class="layout-footer-center" v-html="footer"></Footer>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "LayoutMenuLeft",
  props: {
    system: {
      type: Object,
      default: () => {
        return {
          name: "Vue Starter"
        };
      }
    },
    menus: {
      type: Array,
      default: () => {
        return [
          {
            id: 1,
            name: "Menu",
            url: "/"
          }
        ];
      }
    },
    user: {
      type: Object,
      default: () => {
        return {
          username: "YuDong"
        };
      }
    },
    footer: {
      type: String,
      default: "2008-2020 &copy; YuDong"
    },
    menuLevel: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      isCollapsed: false,
      currentMenus: []
    };
  },
  mounted() {
    this.currentMenus = this.menus;
    console.log(this.currentMenus);
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    currentUser() {
      return this.$store.getters.getUser.user_info;
    },
    expandMenus() {
      let expandMenus = [];
      let menus = this.currentMenus;
      menus.forEach(menu => {
        if (menu["expand"]) {
          expandMenus.push(menu["name"]);
        }
      });
      return expandMenus;
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    routeTo(e) {
      this.$router.push(e);
    },
    userMenuClicked(name) {
      this.$emit("user-menu-click", name);
    }
  },
  watch: {
    menus(value) {
      this.currentMenus = value;
    }
  }
};
</script>
