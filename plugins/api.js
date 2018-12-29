import axios from 'axios'

axios.defaults.baseURL = 'http://10.0.26.2:9090'

function getParent() {
  return axios.get(`/board/parent?all=true`)
}

function getSub(id) {
  return axios.get(`/board/sub?parentId=${id}&all=true`)
}

function getPost(currentPage = 1, pageSize = 1, subId = 0) {
  return axios.get(
    `/board/post?currentPage=${currentPage}&pageSize=${pageSize}0&subId=${subId}`
  )
}

export { getParent, getSub, getPost }
