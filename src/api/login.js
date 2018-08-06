import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getSidebar() {
  const url = '/api/Users/login'
  const data = Object.assign({}, commonParams, options)

  return axios.post(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })

}
