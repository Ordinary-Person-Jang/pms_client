<template>
  <div class="modal-container">
    <div class="login-modal">
      <div class="modal-left-box">
        <div class="img-box">
          <img class="login-logo" :src="logo" style="width: 224px" />
        </div>
        <h4 class="span-box">
          <span>환영합니다!</span>
        </h4>
        <div class="project-select-area">
          <span class="label">프로젝트</span>
          <div class="select-box">
            <select ref="pjtIdRef" v-model="state.pjtId" @keydown.tab.prevent="empNoRef?.focus()">
              <option value="">선택</option>
              <option value="PMS_ADMIN">프로젝트 관리</option>
              <option value="PMS_DEV">PMS</option>
            </select>
          </div>
        </div>
      </div>

      <div class="modal-right-box">
        <div class="right-box-upper">
          <div class="right-box-header"></div>

          <div class="right-box-content">
            <h2>로그인</h2>
            <h4>사원정보로 로그인</h4>

            <div class="right-box-content-inputbox">
              <div>
                <div class="inputbox-left">
                  <p>사번</p>
                </div>
                <div class="inputbox-right">
                  <input
                    type="text"
                    ref="empNoRef"
                    v-model="state.empNo"
                    placeholder="사번을 입력해주세요"
                    @keydown.enter="loginCheck"
                    @keydown.tab.prevent="passwordRef?.focus()"
                  />
                </div>
              </div>
              <div>
                <div class="inputbox-left">
                  <p>비밀번호</p>
                </div>
                <div class="inputbox-right">
                  <input
                    type="password"
                    ref="passwordRef"
                    v-model="state.password"
                    placeholder="비밀번호를 입력해주세요"
                    @keydown.enter="loginCheck"
                    @keydown.tab.prevent="submitRef?.focus()"
                  />
                </div>
              </div>
            </div>

            <button
              ref="submitRef"
              @click="loginCheck"
              @keydown.enter="loginCheck"
              @keydown.tab.prevent="pjtIdRef?.focus()"
            >
              로그인
            </button>

            <h4>소셜 계정으로 로그인</h4>
            <!--
            <div class="modal-logobox">
            <div class="modal-logobox-icon icon-github-wrap">
              <FaGithub class="github-icon"/>
            </div>
            <div class="modal-logobox-icon icon-google-wrap">
              <FaGoogle class="google-icon"/>
            </div>
            <div class="modal-logobox-icon icon-facebook-wrap">
              <div class="icon-facebook-inner-wrap">
                <FaFacebook class="facebook-icon"/>
              </div>
            </div>
          </div>
           -->
          </div>
        </div>
        <div class="right-box-footer">
          <span>로그인에 실패 하셨나요?</span>
          <Link to="/pwreset">
            <span>비밀번호 초기화</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { reactive, ref } from 'vue'
import { type LoginInfo, loginRequest, sessionCheck } from '@/script/utils/session/SessionUtils'
import router from '@/router'

const logo = ''
const store = useUserStore();
const props = defineProps({
  modalName: {
    type: String,
    default: 'test',
  },
})
const state = reactive<LoginInfo>({
  empNo: '',
  pjtId: '',
  password: '',
})

const empNoRef = ref<HTMLInputElement | null>(null)
const passwordRef = ref<HTMLInputElement | null>(null)
const pjtIdRef = ref<HTMLSelectElement | null>(null)
const submitRef = ref<HTMLButtonElement | null>(null)

const loginCheck = async () => {
  if (state.empNo && state.password && state.pjtId) {

    const result = await loginRequest(state);
    if(result) void router.push('/')
  } else {
    alert('사번 및 비밀번호를 입력해 주세요')
  }
}
</script>

<style lang="scss">
@use '@/styles/common/LoginPage.scss';
</style>
