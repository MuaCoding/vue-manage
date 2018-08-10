import axios from 'axios'

export function getContentList(id) {
  const url = '/api/Category/getbyid'
  const options ={
    id: id
  }
  const data = Object.assign({}, {}, options)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

