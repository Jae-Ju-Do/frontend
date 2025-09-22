import { jwtDecode } from "jwt-decode";
// const { jwtDecode } = require("jwt-decode");

// 들어오는 데이터 정보
//{
//   sub: 'test@test.com',
//   roles: [ 'ROLE_USER' ],
//   iat: 1758553287,
//   exp: 1758555087
// }

export function DecodeAccessToken() {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("accessToken 없음");
      return null;
    }

    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    console.error("❌ accessToken 디코딩 실패", err);
    return null;
  }
}