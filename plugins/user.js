var store = require('store')
let user = store.get('user')

function userState() {
  let userState
  if (user !== undefined) {
    userState = true
  }
  return userState
}

function userToken() {
  if (userState()) {
    return user.token
  } else {
    return null
  }
}

function userId() {
  if (userState()) {
    return user.msg.id
  } else {
    return null
  }
}

export { userState, userToken, userId }
