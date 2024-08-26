import jwt_decode from "jwt-decode";

/**
 *
 * @param {string} token
 * @returns {boolean}
 */

export const isTokenValid = (token) => {
  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp && decoded.exp < currentTime) {
      // check expdate of token
      return false;
      //   token out of date
    }
    return true;
  } catch (error) {
    console.error("Lỗi khi kiểm tra token:", error);
    return false;
  }
};
