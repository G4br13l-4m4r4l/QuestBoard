<template>
  <q-page class="config-page">
    <div class="page-content">
      <div class="page-heading">
        <div class="heading-icon"><q-icon name="settings" size="30px" /></div>
        <div>
          <div class="eyebrow">Sua conta</div>
          <h1>Configurações</h1>
          <p>Atualize seu perfil e escolha suas preferências de uso.</p>
        </div>
      </div>

      <div class="config-grid">
        <q-card flat bordered class="config-card">
          <q-card-section>
            <h2>Perfil</h2>
            <p class="text-grey-7">Dados exibidos no seu espaço de aventura.</p>
            <div class="row items-center q-mb-lg">
              <q-avatar size="64px">
                <img :src="avatarUrl" alt="Foto do perfil" />
              </q-avatar>
              <div class="q-ml-md">
                <div class="text-weight-bold">{{ name || 'Aventureiro' }}</div>
                <div class="text-grey-7">{{ email }}</div>
              </div>
            </div>
            <input
              ref="avatarInput"
              class="avatar-input"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              aria-label="Selecionar foto do perfil"
              @change="changeAvatar"
            />
            <q-btn
              outline
              no-caps
              color="secondary"
              icon="photo_camera"
              label="Alterar foto"
              class="q-mb-lg"
              @click="avatarInput.click()"
            />
            <p
              v-if="feedback"
              role="status"
              :class="feedbackError ? 'text-negative' : 'text-positive'"
            >
              {{ feedback }}
            </p>
            <q-form @submit.prevent="saveProfile">
              <q-input
                v-model="name"
                outlined
                label="Nome de exibição"
                class="q-mb-md"
                maxlength="60"
              />
              <q-input
                :model-value="email"
                outlined
                label="E-mail"
                readonly
                hint="E-mail usado no login atual"
                class="q-mb-lg"
              />
              <q-btn type="submit" color="secondary" no-caps label="Salvar perfil" />
            </q-form>
          </q-card-section>
        </q-card>

        <div>
          <q-card flat bordered class="config-card q-mb-md">
            <q-card-section>
              <h2>Preferências</h2>
              <p class="text-grey-7">Configurações planejadas para próximas versões.</p>
              <div class="preference-row">
                <q-icon name="notifications" color="secondary" size="22px" /><span
                  >Lembretes de sessões</span
                ><q-badge color="grey-7" label="Em breve" />
              </div>
              <div class="preference-row">
                <q-icon name="view_compact" color="secondary" size="22px" /><span
                  >Visualização compacta</span
                ><q-badge color="grey-7" label="Em breve" />
              </div>
            </q-card-section>
          </q-card>
          <q-card flat bordered class="config-card">
            <q-card-section>
              <h2>Sobre o QuestBoard</h2>
              <p class="text-grey-7 q-mb-none">
                Espaço para reunir campanhas, sessões e decisões do seu grupo. Versão 0.0.1.
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { avatarUrl, refreshAvatar, saveAvatar } from '@/composables/profileAvatar.js'

const email = localStorage.getItem('email') || 'E-mail não informado'
const name = ref(localStorage.getItem('displayName') || '')
const avatarInput = ref(null)
const feedback = ref('')
const feedbackError = ref(false)

onMounted(refreshAvatar)

async function changeAvatar(event) {
  const file = event.target.files?.[0]
  event.target.value = ''
  if (!file) return

  if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type)) {
    feedbackError.value = true
    feedback.value = 'Escolha uma imagem PNG, JPEG, WebP ou GIF.'
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    feedbackError.value = true
    feedback.value = 'A imagem deve ter no máximo 5 MB.'
    return
  }

  let bitmap
  try {
    bitmap = await createImageBitmap(file)
    const canvas = document.createElement('canvas')
    canvas.width = 320
    canvas.height = 320
    const context = canvas.getContext('2d')
    const cropSize = Math.min(bitmap.width, bitmap.height)
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, 320, 320)
    context.drawImage(
      bitmap,
      (bitmap.width - cropSize) / 2,
      (bitmap.height - cropSize) / 2,
      cropSize,
      cropSize,
      0,
      0,
      320,
      320,
    )
    saveAvatar(canvas.toDataURL('image/jpeg', 0.85))
    feedbackError.value = false
    feedback.value = 'Foto atualizada neste navegador.'
  } catch {
    feedbackError.value = true
    feedback.value = 'Não foi possível atualizar a foto.'
  } finally {
    bitmap?.close()
  }
}

function saveProfile() {
  localStorage.setItem('displayName', name.value.trim())
  name.value = name.value.trim()
  feedbackError.value = false
  feedback.value = 'Perfil salvo neste navegador.'
}
</script>

<style scoped lang="scss">
.config-page {
  background: #f7f4fa;
  min-height: 100vh;
}
.page-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 36px 32px 64px;
}
.page-heading {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 28px;
}
.heading-icon {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  flex: none;
  color: #693895;
  background: #eee5f7;
  border-radius: 14px;
}
.eyebrow {
  color: #744b99;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
h1 {
  font-size: clamp(28px, 4vw, 38px);
  line-height: 1.2;
  font-weight: 700;
  margin: 4px 0 8px;
}
.page-heading p {
  color: #71677a;
  margin: 0;
}
.config-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 16px;
  align-items: start;
}
.config-card {
  border-color: #e9e1ef;
  border-radius: 14px;
}
.config-card :deep(.q-card__section) {
  padding: 24px;
}
h2 {
  font-size: 21px;
  font-weight: 700;
  margin: 0 0 4px;
}
.config-card p {
  margin-top: 0;
}
.preference-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid #eee8f3;
}
.preference-row span {
  flex: 1;
}
.avatar-input {
  display: none;
}
@media (max-width: 700px) {
  .page-content {
    padding: 24px 16px 48px;
  }
  .config-grid {
    grid-template-columns: 1fr;
  }
}
</style>
