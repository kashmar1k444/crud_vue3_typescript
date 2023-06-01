<script setup lang="ts">
    import {ref, computed, onMounted} from 'vue'
    import api from '../helpers/api/api'
    import {ITodo, Sort, TodosType, IUpdateTodo} from '../types/todo'
    import TodoItem from './TodoItem.vue';
    import AddTodo from './AddTodo.vue';
    import TodoFilters from './TodoFilters.vue';
    import TodoLoader from './TodoLoader.vue'

    const title = ref<string>('Todo List');
    const todos = ref<TodosType>([]);
    const loaded = ref<boolean>(false);
    const sort = ref<Sort>(Sort.All);

    const completTodo = (id: number) : void => {
        todos.value = todos.value.filter(el => {
            if(el.id == id) {
                el.completed = !el.completed
            }
            return el
        });
    }
    
    const addTodo = (todo: ITodo): void => {
        todos.value.push(todo);
    }
    
    const removeCompleted = (): void => {
      todos.value = todos.value.filter(el => !el.completed)
    }    

    const removeAll = (): void => {
      todos.value = []
    }    

    const updateTodo = ({id, title}: IUpdateTodo): void => {
      todos.value = todos.value.filter((el => {
        if(el.id == id) el.title = title
        return el
      }))
    }

    const filtredTodos = computed(():TodosType => {
      if(sort.value == Sort.All) {
        return todos.value
      }
      if(sort.value == Sort.Completed){
        return todos.value.filter(todo => todo.completed)
      }
      if(sort.value == Sort.Uncompleted){
        return todos.value.filter(todo => !todo.completed)
      }
      return []
    })

    onMounted(async () => {
      todos.value = await api('https://jsonplaceholder.typicode.com/todos?_limit=10');
      setTimeout(() => {
        loaded.value = true
      }, 300)
    })
</script>

<template>
  <h2>{{ title }}</h2>
  <AddTodo
    @addTodo="addTodo"
  />
  <TodoFilters
    v-if="todos.length > 0 && loaded"
    v-model="sort"
    @removeCompleted="removeCompleted"
    @removeAll="removeAll"
  />

  <TodoLoader v-if="!loaded" />
  <ul tag="ul" name="list" v-else-if="filtredTodos.length > 0">
    <TodoItem
        v-for="item in filtredTodos"
        :key="item.id"
        :todo="item"
        @completTodo="completTodo"
        @updateTodo="updateTodo"
    />
  </ul>
  <h3 v-else>TODO LIST IS CLEAR</h3>

</template>


<style scoped>
    ul{
        list-style: none;
    }

    h3{
      background: #ff6868;
      padding: 10px 60px;
      border-radius: 10px;
      font-size: 26px;
      font-weight: 500;
      margin-top: 100px;
    }
</style>