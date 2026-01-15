import { reactive, readonly } from 'vue'

const state = reactive({
  isOpen: false,
  type: 'alert' as 'alert' | 'confirm',
  title: '',
  message: '',
  confirmText: '확인',
  cancelText: '취소',
  resolve: null as ((val: boolean) => void) | null
})

export const useDialog = () => {

  const alert = (msg: string, t: string = '알림', btn: string = '확인') => {
    state.type = 'alert'
    state.message = msg
    state.title = t
    state.confirmText = btn
    state.isOpen = true

    return new Promise<boolean>((res) => {
      state.resolve = res
    })
  }

  const confirm = (msg: string, t: string = '확인', btn: string = '확인') => {
    state.type = 'confirm'
    state.message = msg
    state.title = t
    state.confirmText = btn
    state.isOpen = true

    return new Promise<boolean>((res) => {
      state.resolve = res
    })
  }

  const handleAction = (result: boolean) => {
    state.isOpen = false
    if (state.resolve) {
      state.resolve(result)
      state.resolve = null
    }
  }

  return {
    dialogState: readonly(state),
    alert,
    confirm,
    handleAction
  }
}
