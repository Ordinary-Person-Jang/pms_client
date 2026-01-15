<template>
  <div v-if="dialogState.isOpen" class="dialog-overlay" @click.self="handleAction(false)">
    <div class="dialog-box">
      <div class="dialog-header">
        <h3>{{ dialogState.title }}</h3>
      </div>
      <div class="dialog-content">
        <p>{{ dialogState.message }}</p>
      </div>
      <div class="dialog-footer">
        <button v-if="dialogState.type === 'confirm'"
                @click="handleAction(false)"
                class="btn-secondary">
          {{ dialogState.cancelText }}
        </button>
        <button @click="handleAction(true)" class="btn-primary">
          {{ dialogState.confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDialog } from '@/script/utils/commons/useDialog'
const { dialogState, handleAction } = useDialog()
</script>

<style scoped>
.dialog-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999;
}

.dialog-box {
  background: white;
  padding: 24px;
  min-width: 320px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  border: 1px solid #ddd;
}

.dialog-header h3 {
  margin: 0 0 12px 0;
  font-size: 18px;
  color: #2c3e50;
}

.dialog-content {
  margin-bottom: 24px;
  color: #555;
  font-size: 15px;
  line-height: 1.6;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

button {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.btn-primary {
  background-color: #4a69bd;
  color: white;
}
.btn-primary:hover {
  background-color: #3853a4;
}
.btn-primary:active {
  background-color: #2c3e50;
}

.btn-secondary {
  background-color: #f1f2f6;
  color: #5d6a7a;
  border: 1px solid #dcdde1;
}
.btn-secondary:hover {
  background-color: #dfe4ea;
  color: #2f3542;
}
</style>
