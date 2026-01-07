/// <reference types="vite/client" />

interface AxiosEnv{
  readonly VITE_API_BASE_URL :string;
}

interface ImportMetaEnv extends AxiosEnv {}

interface ImportMeta{
  readonly env:ImportMetaEnv
}
