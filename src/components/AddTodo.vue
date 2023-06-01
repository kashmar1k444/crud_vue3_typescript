<script setup lang="ts">
    import {ref} from 'vue'
    import {ITodo} from '../types/todo';

    const num: number = 100000000;
    let title = ref<string>('');
    const emits = defineEmits<{
        (e: 'addTodo', todo: ITodo): void
    }>()
    
    const submit = (): void => {
        if(title.value.trim().length > 0){
            const todo = {
            id: Math.round(Math.random() * num),
            userId: Math.round(Math.random() * num),
            title: title.value.trim(),
            completed: false
            }
            emits('addTodo', todo);
            title.value = '';
        }
    }


</script>

<template>
    <form @submit.prevent="submit">
        <input v-model="title" type="text">
        <button>Add todo</button>
    </form>
</template>


<style scoped>
    form{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input{
        width: 500px;
        height: 44px;
        background: #333;
        border-radius: 3px 0 0 3px;
        border: none;
        padding: 0 15px;
    }

    button{
        background: #333;
        width: 120px;
        height: 46px;
        border-radius: 0 3px 3px 0;
        border-left: 1px solid #646cff;
    }
</style>