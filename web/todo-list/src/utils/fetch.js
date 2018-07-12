import axios from 'axios'

export function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: 'http://localhost:4000',
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30 * 1000
    });
    instance(options).then((response) => {
      resolve(response);
    }).catch((err) => {
      console.log('出错！：' + err);
      reject(err);
    })
  })
}
