import { Component, Vue,Inject } from 'vue-property-decorator'
import appconst from './appconst'
import config from '@/config'

export default class AbpBase extends Vue{    
    $config:any= config
    L(value:string,source?:string,...argus:string[]):string{
        if(source){
            return window.abp.localization.localize(value,source,argus);
        }else{
            return window.abp.localization.localize(value,appconst.localization.defaultLocalizationSourceName,argus);
        }                
    }
    hasPermission(permissionName:string){
        return window.abp.auth.hasPermission(permissionName);
    }
    hasAnyOfPermissions(...argus:string[]){
        return window.abp.auth.hasAnyOfPermissions(...argus);
    }
    hasAllOfPermissions(...argus:string[]){
        return window.abp.auth.hasAllOfPermissions(...argus);
    }    
}