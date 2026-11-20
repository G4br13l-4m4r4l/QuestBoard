<template>
  <q-page class="quest-page">
    <div class="page-content quest-content">
      <div class="page-heading">
        <div class="heading-icon"><q-icon name="how_to_vote" size="30px" /></div>
        <div>
          <div class="eyebrow">Decisões do grupo</div>
          <h1>Nova votação</h1>
          <p>Prepare uma escolha para sua próxima aventura.</p>
        </div>
      </div>

      <q-card flat bordered class="form-card">
        <q-form @submit.prevent="createPoll">
          <q-card-section>
            <h2>Detalhes da votação</h2>
            <p class="form-description">Defina a pergunta e as opções disponíveis para o grupo.</p>
            <q-input
              v-model.trim="title"
              dark
              outlined
              label="Título da votação"
              maxlength="100"
              :rules="[(value) => !!value || 'Informe o título da votação.']"
            />
            <q-input
              v-model.trim="description"
              dark
              outlined
              type="textarea"
              label="Descrição (opcional)"
              maxlength="500"
              class="q-mb-lg"
            />
            <q-input
              v-model="endDate"
              dark
              outlined
              type="date"
              label="Data de encerramento (opcional)"
              stack-label
              class="q-mb-lg"
            />
            <div class="options-heading">
              <div>
                <h2>Opções de resposta</h2>
                <p class="form-description">
                  {{
                    freeResponse
                      ? 'Os participantes poderão responder livremente.'
                      : 'Adicione pelo menos duas opções.'
                  }}
                </p>
              </div>
            </div>
            <div class="response-mode">
              <div>
                <div class="response-mode-title">Resposta livre</div>
                <div class="response-mode-description">
                  Permitir que cada participante escreva sua resposta.
                </div>
              </div>
              <q-toggle
                v-model="freeResponse"
                color="secondary"
                aria-label="Permitir resposta livre"
              />
            </div>
            <template v-if="!freeResponse">
              <div v-for="(option, index) in options" :key="option.id" class="option-row">
                <q-input
                  v-model.trim="option.value"
                  dark
                  outlined
                  class="col"
                  :label="`Opção ${index + 1}`"
                  maxlength="100"
                  :rules="[(value) => !!value || 'Informe uma opção.']"
                />
                <q-btn
                  v-if="options.length > 2"
                  flat
                  round
                  color="secondary"
                  icon="delete_outline"
                  :aria-label="`Remover opção ${index + 1}`"
                  @click="options.splice(index, 1)"
                >
                  <q-tooltip>Remover opção</q-tooltip>
                </q-btn>
              </div>
              <q-btn
                flat
                no-caps
                color="secondary"
                icon="add"
                label="Adicionar opção"
                @click="addOption"
              />
            </template>
            <p v-if="error" role="alert" class="text-negative q-mt-md">{{ error }}</p>
          </q-card-section>
          <q-card-actions align="right" class="form-actions">
            <q-btn flat no-caps label="Cancelar" to="/votacoes" />
            <q-btn unelevated no-caps color="secondary" label="Criar votação" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const title = ref('')
const description = ref('')
const endDate = ref('')
const freeResponse = ref(false)
let nextOptionId = 2
const options = ref([
  { id: 0, value: '' },
  { id: 1, value: '' },
])
const error = ref('')

function addOption() {
  options.value.push({ id: nextOptionId++, value: '' })
}

function createPoll() {
  const values = freeResponse.value ? [] : options.value.map((option) => option.value.trim())
  if (
    !freeResponse.value &&
    new Set(values.map((value) => value.toLocaleLowerCase())).size !== values.length
  ) {
    error.value = 'As opções devem ser diferentes entre si.'
    return
  }
  try {
    const polls = JSON.parse(localStorage.getItem('questboard:polls') || '[]')
    if (!Array.isArray(polls)) throw new Error('Dados inválidos')
    polls.unshift({
      id: crypto.randomUUID(),
      title: title.value,
      description: description.value,
      endDate: endDate.value,
      responseType: freeResponse.value ? 'free' : 'options',
      options: values,
    })
    localStorage.setItem('questboard:polls', JSON.stringify(polls))
    router.push('/votacoes')
  } catch {
    error.value = 'Não foi possível salvar a votação neste navegador.'
  }
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
.form-card {
  width: 100%;
  color: #f8f4fb;
  background: #271637;
  border-color: #4a365a;
  border-radius: 13px;
}
.form-card :deep(.q-card__section) {
  padding: 24px;
}
.form-card h2 {
  margin: 0 0 4px;
  color: #f8f4fb;
  font:
    400 24px Georgia,
    'Times New Roman',
    serif;
}
.form-description {
  margin: 0 0 20px;
  color: #b9a9c4;
}
.response-mode {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  margin-bottom: 20px;
  background: #30203f;
  border: 1px solid #59446b;
  border-radius: 9px;
}
.response-mode-title {
  font-weight: 700;
}
.response-mode-description {
  color: #b9a9c4;
  font-size: 13px;
}
.form-card :deep(.q-field__control) {
  background: #30203f;
  border-radius: 9px;
}
.option-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.option-row .q-btn {
  margin-top: 8px;
}
.form-actions {
  padding: 0 24px 24px;
}
</style>
