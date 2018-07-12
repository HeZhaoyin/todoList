import {
  fetch
} from '../utils/fetch'

export const register = (data) => {
  return fetch({
    url: "/user",
    method: 'POST',
    data: data
  })
}


export const checkUser = (data) => {
  return fetch({
    url: "/user/" + data.username,
    method: 'GET'
  })
}

export const login = (data) => {
  return fetch({
    url: '/user/' + data.username + '/' + data.password,
    method: 'GET'
  })
}
