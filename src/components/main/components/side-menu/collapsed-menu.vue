<template>
  <Dropdown ref="dropdown" @on-click="handleClick" :class="hideTitle ? '' : 'collased-menu-dropdown'" :transfer="hideTitle" :placement="placement">
    <a class="drop-menu-a" type="text" @mouseover="handleMousemove($event, children)" :style="{textAlign: !hideTitle ? 'left' : ''}"><common-icon :size="rootIconSize" :color="textColor" :type="parentItem.icon"/><span class="menu-title" v-if="!hideTitle">{{ itemTitle(parentItem) }}</span><Icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16"/></a>
    <DropdownMenu ref="dropdown" slot="list">
      <template v-for="child in children">
        <collapsed-menu v-if="showChildren(child)" :icon-size="iconSize" :parent-item="child" :key="`drop-${child.name}`"></collapsed-menu>
        <DropdownItem v-else :key="`drop-${child.name}`" :name="child.name"><common-icon :size="iconSize" :type="child.icon"/><span class="menu-title">{{ itemTitle(child) }}</span></DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>
<script lang="ts">
import mixin from './mixin'
import itemMixin from './itemmixin'
import { findNodeUpperByClasses } from '@/lib/util'
import { Component, Vue,Inject,Prop,Emit } from 'vue-property-decorator'
import AbpBase from '@/lib/abpbase'
@Component({
  mixins: [ mixin, itemMixin]
})
export default class CollapsedMenu extends AbpBase {
  name:String= 'CollapsedMenu'
  placement = 'right-end'
  @Prop({ type: Boolean,default: false})
  hideTitle:Boolean;
  @Prop({type: Number, default: 16})
  rootIconSize:Number; 
  handleClick (name) {
      this.$emit('on-click', name)
    }
  handleMousemove (event, children) {
      const { pageY } = event
      const height = children.length * 38
      const isOverflow = pageY + height < window.innerHeight
      this.placement = isOverflow ? 'right-start' : 'right-end'
  }
  mounted () :void{
    let dropdown = findNodeUpperByClasses((this.$refs.dropdown as any).$el, ['ivu-select-dropdown', 'ivu-dropdown-transfer'])
    if (dropdown) dropdown.style.overflow = 'visible'
  }
}
</script>
