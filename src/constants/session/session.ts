export const SESSION_CONSTANTS = {
  DEFAULT_TOKEN: 'cors',
  TOKEN_KEY: 'Authorization',
  LOGIN_PAGE_URL: '/signin',
  EXPIRED_TOKEN: '세션이 만료되었습니다. 다시 로그인해주세요.'
} as const; // as const를 붙이면 읽기 전용 상수가 됩니다
