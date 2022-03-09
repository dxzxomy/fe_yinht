import { Message, Notification } from 'element-ui'

export function success(message) {
  Notification({
    title: 'Success',
    message,
    type: 'success',
    duration: 2000
  })
}

export function error(message) {
  Message({
    title: 'Error',
    message,
    type: 'error',
    duration: 2000
  })
}

export function message(message) {
  Message({
    type: 'warning',
    message,
    durtion: 5 * 1000
  })
}

