<script setup lang="ts">
    import {ref} from 'vue'
    import {ITodo, IUpdateTodo} from '../types/todo'


    const {todo} = defineProps<{
        todo: ITodo
    }>()
    

    const emits = defineEmits<{
        (e: 'completTodo', id: number): void;
        (e: 'updateTodo', data: IUpdateTodo): void
    }>()

    const updatedTitle = ref<string>(todo.title);
    const updating = ref<boolean>(false)

    const setUpdatingActive = (): void => {
        updating.value = true
    }

    const updateTodo = (): void => {
        if(updatedTitle.value.trim().length > 0){
            const data = {
                id: todo.id,
                title: updatedTitle.value
            }
            emits('updateTodo', data);
            updating.value = false;
        }
    }
</script>

<template>
    <li>
        <p class="todo-id">{{ todo.id }}</p>
        <p v-if="!updating" :class="`${todo.completed ? 'completed' : ''} todo-title`">{{ todo.title }}</p>
        <input v-else type="text" v-model="updatedTitle">
        <div class="todo-item--btns">
            <button 
                v-if="!updating" 
                @click="setUpdatingActive"
                >
                <svg width="12px" height="12px" fill="#fff" viewBox="0 0 512 512">
                    <use xlink:href="../../public/update.svg#path" />
                </svg>
            </button>
            <button 
                v-else 
                @click="updateTodo"
            >
                <svg width="14px" height="14px" fill="#fff" viewBox="0 0 448 512">
                    <use xlink:href="../../public/check.svg#path" />
                </svg>
            </button>
            <input @click="emits('completTodo', todo.id)" :checked="todo.completed" type="checkbox">
        </div>
    </li>
</template>

<style scoped>
    li{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .todo-id{
        margin-right: 20px;
        padding: 5px;
        border-radius: 3px;
        background: #333;
    }

    .completed{
        text-decoration: line-through;
    }

    input[type="text"]{
        height: 40px;
        width: 400px;
        background: #333;
        text-align: center;
        font-size: 16px;
        border-radius: 4px;
        border: 0;
    }

    input[type="checkbox"]{
        height: 20px;
        width: 20px;
        cursor: pointer;
    }

    button{
        display: grid;
        place-items: center;
        height: 32px;
        width: 32px;
        padding: 0;
    }

    .todo-item--btns{
        display: flex;
        align-items: center;
        gap: 20px;  
    }

</style>