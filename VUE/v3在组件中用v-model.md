##### 子组件

```vue
<template>
    <div>子组件的值{{myvalue}}</div>
    <button @click="changeVal">修改值</button>
</template>

<script setup>
//通过 props 接受到父组件穿的值
const props = defineProps({
    myvalue:String
})
const emits = defineEmits(["update:myvalue"])
const changeVal = ()=>{
    //自定义事件必须是 update: 加上更改的值才能实现更改父组件的值
    emits("update:myvalue",'000')
}
</script>
```

##### 父组件

```vue
<template>
    <!-- v-model:myvalue myvalue为定义绑定给子组件的值 -->
    <testModelVue v-model:myvalue="testVal"/>
    <div>{{testVal}}</div>
</template>

<script setup>
    import { ref} from "vue"
    const testVal = ref('111')
</script>
```

