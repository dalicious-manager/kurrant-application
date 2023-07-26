import jwtDecode from 'jwt-decode';

export default class jwtUtils {
  static isAuth(token) {
    if (!token) {
      return false;
    }

    const decoded = jwtDecode(token);
    if (decoded.exp > new Date().getTime() / 1000) {
      return true;
    }
    return false;
  }

  static getId(token) {
    if (!token) {
      return false;
    }
    const decoded = jwtDecode(token.substring(6));
    return decoded.userId;
  }
}
