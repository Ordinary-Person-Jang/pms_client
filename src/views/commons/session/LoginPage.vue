<template>
  <div class="modal-container">
    <div class="login-modal">
      <div class="modal-left-box">
        <div class="img-box">
          <img class='login-logo' :src="logo" style="width: 224px;"/>
        </div>
        <h4 class="span-box">
          <span>환영합니다!</span>
        </h4>
      </div>
      <div class="modal-right-box">
        <div class="right-box-upper">
          <div class="right-box-header">
          </div>

          <div class="right-box-content">
            <h2>로그인</h2>
            <h4>사원정보로 로그인</h4>

            <div class='right-box-content-inputbox'>
              <div>
                <div class="inputbox-left">
                  <p>사번</p>
                </div>
                <div class="inputbox-right">
                  <input type="text" placeholder="사번을 입력해주세요"/>
                </div>

              </div>
              <div>
                <div class="inputbox-left">
                  <p>비밀번호</p>
                </div>
                <div class='inputbox-right'>
                  <input type="password" placeholder="비밀번호를 입력해주세요" />
                </div>
              </div>
            </div>

            <button >로그인</button>

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
import { defineStore } from 'pinia'
const logo = ''
const store = defineStore
const props = defineProps({
  modalName : {
    type: String,
    default: 'test'
  }
})
</script>

<style lang="scss">
@import "@/styles/common/LoginPage.scss";
</style>
