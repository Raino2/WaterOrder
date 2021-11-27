import axios from 'axios';
import { authStore } from '../store/AuthStore/authStore';

class Login {
  userLogin = (uid: string) => {
    axios
      .get(`/user`, {
        params: {
          uid,
        },
      })
      .then((res) => {
        authStore.setUser(res.data.data[0]);
        authStore.setLogin();
      });
  };
}

const login = new Login();
export { login };
export default Login;
