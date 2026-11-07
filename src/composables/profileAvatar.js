import { ref } from 'vue'

export const defaultAvatarUrl = 'https://cdn.quasar.dev/img/boy-avatar.png'

function storageKey() {
  return `questboard:avatar:${localStorage.getItem('email') || 'guest'}`
}

export const avatarUrl = ref(defaultAvatarUrl)

export function refreshAvatar() {
  avatarUrl.value = localStorage.getItem(storageKey()) || defaultAvatarUrl
}

export function saveAvatar(dataUrl) {
  localStorage.setItem(storageKey(), dataUrl)
  avatarUrl.value = dataUrl
}
