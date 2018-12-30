import axios from 'axios'

axios.defaults.baseURL = 'http://119.29.92.121:9090/'

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

export { getParent, getSub, getPost, getPostOne, getPostReply }
