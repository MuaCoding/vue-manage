import {commonParams, options} from './config'
import axios from 'axios'

export function getSidebar() {
  const url = '/api/Category/get'
  const data = Object.assign({}, commonParams, options)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })

}
