export const ERROR_MESSAGES: { [index: string]: string } = {
  PROXY_NETWORK_ERROR: '서버와 연결할 수 없습니다. 네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요.',

  INVALID_CREDENTIALS: '아이디 또는 비밀번호가 일치하지 않습니다.',
  TOKEN_NOT_FOUND: '토큰 발급에 실패하였습니다. 관리자에게 문의하세요.',

  AUTH_EXPIRED: '세션이 만료되었습니다. 다시 로그인해주세요.',
  BUSINESS_ERROR: '알 수 없는 에러가 발생했습니다.',
  NETWORK_ERROR: '서버와 통신에 실패하였습니다. 네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요.',
}

export const getErrorMessage = (code: string): string => {
  return ERROR_MESSAGES[code] || '정의되지 않은 에러가 발생했습니다. (Code: ' + code + ')'
}
