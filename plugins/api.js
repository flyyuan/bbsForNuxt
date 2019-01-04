import axios from 'axios'
import { userState, userToken } from '~/plugins/user.js'

axios.defaults.baseURL = 'http://119.29.92.121:9090/'

if (userState()) {
  axios.defaults.headers.common['token'] = userToken()
}

function login(data) {
  return axios.post(`/user/login`, data)
}

function register(data) {
  return axios.post('/user/register', data)
}

function getParent() {
  return axios.get(`/board/parent?all=true`)
}

function getSub(id) {
  return axios.get(`/board/sub?parentId=${id}`)
}

function getPost(currentPage = 1, pageSize = 10, subId = 0) {
  return axios.get(
    `/board/post?currentPage=${currentPage}&pageSize=${pageSize}&subId=${subId}`
  )
}

function getPostOne(id) {
  return axios.get(`/board/post/${id}`)
}

function getPostReply(postId = 1, currentPage = 1, pageSize = 10) {
  return axios.get(
    `/board/post/postReply?currentPage=${currentPage}&pageSize=${pageSize}&postId=${postId}`
  )
}

function postNewParent(data) {
  return axios.post('/board/parent', data)
}

function deleteParent(id) {
  return axios.delete(`/board/parent/${id}`)
}

function putParent(data) {
  return axios.put(`/board/parent`, data)
}

function postNewSubParent(data) {
  return axios.post('/board/sub', data)
}

function deleteSubParent(id) {
  return axios.delete(`/board/sub/${id}`)
}

function putSubParent(data) {
  return axios.put(`/board/sub`, data)
}

function postNewPost(data) {
  return axios.post('/board/post', data)
}

function deletePost(id) {
  return axios.delete(`/board/post/${id}`)
}

function putPost(data) {
  return axios.put(`/board/post`, data)
}

function postReply(data) {
  return axios.post(`/board/post/postReply`, data)
}

function deleteReply(id) {
  return axios.delete(`/board/post/postReply/${id}`)
}

function resetPassword(data) {
  return axios.post(`/user/resetPassword`, data)
}

function resetImage(data) {
  return axios.post(`/user/resetUserImage`, data)
}

export {
  login,
  register,
  getParent,
  getSub,
  getPost,
  getPostOne,
  getPostReply,
  postNewParent,
  deleteParent,
  putParent,
  postNewSubParent,
  deleteSubParent,
  putSubParent,
  postNewPost,
  deletePost,
  putPost,
  postReply,
  deleteReply,
  resetPassword,
  resetImage
}
