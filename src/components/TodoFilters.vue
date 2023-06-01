<script setup lang="ts">
    import { Sort } from '../types/todo';

    defineProps<{
        modelValue: string
    }>()

    const emits = defineEmits<{
        (e: 'update:modelValue', payload: string): void
        (e: 'removeCompleted'): void
        (e: 'removeAll'): void
    }>()
</script>

<template>
    <div>
        <select :value="modelValue" @change="emits('update:modelValue', ($event.target as HTMLSelectElement).value)">
            <option 
            v-for="item in Sort"
            :value="item "
            >{{ item }}</option>
        </select>
        <button @click="emits('removeCompleted')">
            Remove completed
        </button>
        <button @click="emits('removeAll')">
            Remove all
        </button>
    </div>
</template>

<style scoped>
    div{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
        margin-top: 30px;
    }

    select{
        height: 44px;
        background: #1a1a1a;
        border: 0;
        padding: 0 5px;
        border-radius: 5px;
    }

    button{
        height: 44px;
        border-radius: 5px;
    }
</style>