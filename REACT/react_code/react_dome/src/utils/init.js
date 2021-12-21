import store from '../redux/store'
import { setLogin } from "../redux/actions/login"

let storage = localStorage.getItem("goodlive")

if (storage) {
  store.dispatch(setLogin(JSON.parse(storage)))
}