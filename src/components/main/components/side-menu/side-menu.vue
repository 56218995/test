<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames" :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect">
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`">
            <common-icon :type="item.children[0].icon || ''"/>
            <span>{{ itemTitle(item.children[0]) }}</span>
          </menu-item>          
        </template>
        <template v-else>
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item">            
          </side-menu-item>
          <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`">
            <common-icon :type="item.icon || ''"/>
            <span>{{ itemTitle(item) }}</span>            
          </menu-item>
        </template>
      </template>
    </Menu>
    <div class="menu-collapsed" v-show="collapsed" :list="menuList">
      <template v-for="item in menuList">
        <collapsed-menu v-if="item.children && item.children.length > 1" @on-click="handleSelect" hide-title :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item" :key="`drop-menu-${item.name}`"></collapsed-menu>
        <Tooltip transfer v-else :content="itemTitle(item.children && item.children[0] ? item.children[0] : item)" placement="right" :key="`drop-menu-${item.name}`">
          <a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a" :style="{textAlign: 'center'}">
            <common-icon :size="rootIconSize" :color="textColor" :type="item.icon || (item.children && item.children[0].icon)"/>
          </a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import SideMenuItem from './side-menu-item.vue'
import CollapsedMenu from './collapsed-menu.vue'
import { getUnion } from '@/lib/tools'
import AbpBase from '@/lib/abpbase'
import mixin from './mixin'
import { Component, Vue,Inject,Prop,Emit,Watch } from 'vue-property-decorator'
@Component({
  mixins: [ mixin,AbpBase ],
  components: {
    SideMenuItem,
    CollapsedMenu
  }
})
export default class SideMenu extends AbpBase {
  name:String = 'SideMenu'
  openedNames=[]
  @Prop({type:Array}) menuList:Array<any>;
  @Prop({type: Boolean})  collapsed:Boolean;
  @Prop({type: String,default: 'dark'})  theme:String;
  @Prop({type: Number,default: 20})  rootIconSize:Number;
  @Prop({type: Number,default: 16})  iconSize:Number;
  @Prop()  accordion: Boolean;
  @Prop({type: String,default: ''})  activeName: String;
  @Prop({type:Array}) openNames:Array<string>;
  handleSelect (name) {
    this.$emit('on-select', name)
  }
  getOpenedNamesByActiveName (name) {
    return this.$route.matched.map(item => item.name).filter(item => item !== name)
  }
  updateOpenName (name) {
    if (name === this.$config.homeName) this.openedNames = []
    else this.openedNames = this.getOpenedNamesByActiveName(name)
  }
  textColor () {
    return this.theme === 'dark' ? '#fff' : '#495060'
  }
  computed():void {
    this.textColor()
  }
  @Watch("accordion")
   accordionChange (name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
  }
  @Watch("openNames")
  openNamesChange (newNames) {
      this.openedNames = newNames
  }
  @Watch("openedNames")
  openedNamesChange() {
      this.$nextTick(() => {  
        (this.$refs.menu as any).updateOpened()
    })  
  }
  mounted():void {
    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
  }
}
</script>
<style lang="less">
@import './side-menu.less';
</style>
