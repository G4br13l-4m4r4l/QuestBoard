<template>
  <q-page class="quest-page">
    <div class="page-content quest-content">
      <div class="page-heading">
        <div class="heading-icon"><q-icon name="how_to_vote" size="30px" /></div>
        <div>
          <div class="eyebrow">Decisões do grupo</div>
          <h1>{{ poll ? poll.title : 'Votação não encontrada' }}</h1>
          <p>
            {{
              poll
                ? 'Confira os detalhes e escolha sua resposta.'
                : 'Esta votação não está disponível neste navegador.'
            }}
          </p>
        </div>
      </div>
      <div v-if="poll" class="poll-layout">
        <q-card flat bordered class="poll-card">
          <q-form @submit.prevent="submitVote">
            <q-card-section>
              <h2>Sobre esta votação</h2>
              <p class="description">
                {{ poll.description || 'Nenhuma descrição foi informada.' }}
              </p>
              <p v-if="poll.endDate" class="date">
                Data de encerramento: {{ poll.endDate.split('-').reverse().join('/') }}
              </p>
              <p v-else-if="poll.meta" class="date">{{ poll.meta }}</p>
              <h2>Sua resposta</h2>
              <p class="description">
                {{ isFree ? 'Escreva sua resposta abaixo.' : 'Selecione uma opção para votar.' }}
              </p>
              <q-input
                v-if="isFree"
                v-model.trim="answer"
                dark
                outlined
                type="textarea"
                label="Sua resposta"
                maxlength="500"
                :rules="[(value) => !!value || 'Informe sua resposta.']"
              />
              <div v-else class="options" role="radiogroup" aria-label="Opções da votação">
                <q-radio
                  v-for="(option, index) in poll.options"
                  :key="index"
                  v-model="answer"
                  dark
                  color="secondary"
                  :val="option"
                  :label="option"
                />
              </div>
              <p v-if="message" role="status" :class="messageError ? 'text-negative' : 'notice'">
                {{ message }}
              </p>
            </q-card-section>
            <q-card-actions align="right" class="actions">
              <q-btn flat no-caps label="Cancelar" to="/votacoes" />
              <q-btn type="submit" unelevated no-caps color="secondary" label="Enviar resposta" />
            </q-card-actions>
          </q-form>
        </q-card>
        <img :src="decisionImage" alt="" class="poll-image" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { menuPages } from '@/data/menuPages.js'
import decisionImage from '@/assets/decision2.jpg'

const route = useRoute()
const answer = ref('')
const message = ref('')
const messageError = ref(false)
const poll = computed(() => {
  if (route.params.source === 'exemplo')
    return menuPages.votacoes.groups[0].items.find((item) => item.id === route.params.id)
  if (route.params.source !== 'local') return null
  try {
    const polls = JSON.parse(localStorage.getItem('questboard:polls') || '[]')
    return Array.isArray(polls) ? polls.find((item) => item.id === route.params.id) : null
  } catch {
    return null
  }
})
const isFree = computed(() => poll.value?.responseType === 'free' || !poll.value?.options?.length)
function submitVote() {
  messageError.value = !answer.value.trim()
  message.value = messageError.value
    ? 'Selecione ou informe uma resposta.'
    : 'Resposta preenchida. O envio de votos ainda não está disponível.'
}
</script>

<style scoped lang="scss">
.page-heading {
  display: flex;
  gap: 18px;
}
.heading-icon {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  flex: none;
}
.eyebrow {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}
h1 {
  font-size: clamp(28px, 4vw, 38px);
  line-height: 1.2;
  margin: 4px 0 8px;
}
.page-heading p {
  margin: 0;
}
.poll-card {
  min-width: 0;
  color: #f8f4fb;
  background: #271637;
  border-color: #4a365a;
  border-radius: 13px;
}
.poll-layout {
  display: grid;
  grid-template-columns: minmax(0, 600px) minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}
.poll-image {
  width: 100%;
  max-height: 480px;
  object-fit: cover;
  border: 1px solid #4a365a;
  border-radius: 13px;
}
@media (max-width: 800px) {
  .poll-layout {
    grid-template-columns: 1fr;
  }
  .poll-image {
    max-height: 320px;
  }
}
.poll-card :deep(.q-card__section) {
  padding: 24px;
}
h2 {
  margin: 0 0 8px;
  font:
    400 24px Georgia,
    'Times New Roman',
    serif;
}
.description {
  color: #b9a9c4;
  margin-bottom: 20px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.date {
  color: #dbb86f;
  margin-bottom: 24px;
}
.options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.options :deep(.q-radio) {
  padding: 8px;
  background: #30203f;
  border: 1px solid #59446b;
  border-radius: 9px;
}
.poll-card :deep(.q-field__control) {
  background: #30203f;
  border-radius: 9px;
}
.actions {
  padding: 0 24px 24px;
}
.notice {
  color: #b9a9c4;
  margin: 16px 0 0;
}
</style>
