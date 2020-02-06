import axios from "axios";

/**
 * We add the JWT to the header of all requests we send.
 */
export function setJwt(jwt) {
  if (jwt) axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}
axios.setJwt = setJwt;

export default axios;
