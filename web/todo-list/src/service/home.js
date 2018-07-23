import {
  fetch
} from '../utils/fetch'

export const getTodoList = (data) => {
  return fetch({
    url: "/todoList",
    method: 'GET',
    params: data
  })
}