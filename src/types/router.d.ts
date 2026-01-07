import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    role?: string; // 나중에 권한 관리가 필요하다면 추가
  }
}
