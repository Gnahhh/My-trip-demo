import cityRequest from "../request/index.js";

export default function getCity() {
  return cityRequest.get({url: "/city/all"});
}
