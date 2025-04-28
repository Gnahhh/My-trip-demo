import detailRequest from "../request/index";

function getHouseDetails(houseId) {
  return detailRequest.get({
    url: "/detail/infos",
    params: {
      houseId: houseId
    }
  })
}

export {
  getHouseDetails
}