import axios from 'axios';

import { BASE_URL, TIMEOUT } from '../request/config.js';

class LRequest {
  constructor(baseURL, timeout = 1000) {
    this.instance = axios.create({
      baseURL,
      timeout
    });

  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" });
  }

  post(config) {
    return this.request({ ...config, method: "post" });
  }
}

export default new LRequest(BASE_URL, TIMEOUT);