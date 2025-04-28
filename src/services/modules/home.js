import homeRequest from "../request/index"

const BASE_URL = "/home"

function getHotSuggestions() {
  return homeRequest.get({url: `${BASE_URL}/hotSuggests`});
}

function getHomeCategories() {
  return homeRequest.get({url: `${BASE_URL}/categories`});
}

function getHomeList(page = 1) {
  return homeRequest.get({
    url: `${BASE_URL}/houselist`,
    params: {
      page
    }
  })
}


export {
  getHotSuggestions,
  getHomeCategories,
  getHomeList
}