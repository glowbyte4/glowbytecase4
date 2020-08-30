import axios from "axios";

export function getMap() {
  return axios.get("http://127.0.0.1:5000/get_map");
}
