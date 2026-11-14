<template>
  <main class="login-page">
    <section class="login-art" aria-label="Mascote do QuestBoard">
      <div class="art-frame">
        <p class="art-kicker">SUA PRÓXIMA AVENTURA COMEÇA AQUI <span>✦</span></p>
        <img :src="logo" class="hero-image" alt="Mago em forma de dado com espada e cajado" />
        <p class="art-caption">✦ &nbsp; Reúna sua party. Escreva sua história. &nbsp; ✦</p>
      </div>
    </section>

    <section class="login-panel">
      <div class="login-content">
        <div class="brand-mark" aria-hidden="true">✦ <span>QuestBoard</span> ✦</div>
        <p class="section-label">PORTAL DO AVENTUREIRO</p>
        <h1>Bem-vindo de volta</h1>
        <p class="intro">Sua próxima jornada está à sua espera.</p>

        <form class="login-form" @submit.prevent="login">
          <label for="login-email">E-mail</label>
          <q-input
            id="login-email"
            v-model="email"
            class="login-input"
            outlined
            type="email"
            placeholder="seu@email.com"
            autocomplete="email"
            hide-bottom-space
            :rules="[(val) => !!val || 'Informe seu e-mail']"
          />

          <label for="login-password">Senha</label>
          <q-input
            id="login-password"
            v-model="password"
            class="login-input"
            outlined
            :type="isPwd ? 'password' : 'text'"
            placeholder="Sua senha"
            autocomplete="current-password"
          >
            <template #append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="password-toggle cursor-pointer"
                :aria-label="isPwd ? 'Mostrar senha' : 'Ocultar senha'"
                role="button"
                tabindex="0"
                @click="isPwd = !isPwd"
                @keyup.enter="isPwd = !isPwd"
                @keyup.space.prevent="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-btn
            type="submit"
            color="secondary"
            class="login-button"
            unelevated
            no-caps
            :loading="loading"
            :disable="!canLogin"
          >
            Entrar na aventura <span class="button-arrow" aria-hidden="true">→</span>
          </q-btn>
        </form>
        <div class="panel-footer" aria-hidden="true"><span></span> ✦ <span></span></div>
      </div>
    </section>
  </main>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import Logo from '../../assets/logo_quest_2.jpg'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const isPwd = ref(true)
    const canLogin = computed(() => email.value.length > 0 && password.value.length > 0)

    const login = () => {
      if (!canLogin.value || loading.value) return
      try {
        loading.value = true
        localStorage.setItem('email', email.value)
        localStorage.setItem('login', 'true')
        router.push('/')
      } catch (ex) {
        console.error(ex)
        $q.notify({ type: 'warning', message: 'Algo deu errado!' })
      } finally {
        loading.value = false
      }
    }

    return { email, password, loading, logo: Logo, isPwd, canLogin, login }
  },
})
</script>

<style lang="scss" scoped>
.login-page {
  --night: #190b28;
  --purple: #250e39;
  --gold: #dbb86f;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(420px, 0.9fr);
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--night);
  color: #f8f4fb;
}

.login-art {
  min-height: 100vh;
  min-height: 100dvh;
  padding: clamp(20px, 3vw, 48px);
  background: radial-gradient(circle at 50% 42%, #43205d 0, var(--purple) 55%, #1b0b2b 100%);
}

.art-frame {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 600px;
  overflow: hidden;
  border: 1px solid rgba(219, 184, 111, 0.3);
  background: radial-gradient(circle at center, rgba(91, 42, 119, 0.35), transparent 65%);
}

.art-frame::before,
.art-frame::after {
  position: absolute;
  z-index: 2;
  width: 48px;
  height: 48px;
  content: '';
  pointer-events: none;
}

.art-frame::before {
  top: 12px;
  left: 12px;
  border-top: 2px solid var(--gold);
  border-left: 2px solid var(--gold);
}

.art-frame::after {
  right: 12px;
  bottom: 12px;
  border-right: 2px solid var(--gold);
  border-bottom: 2px solid var(--gold);
}

.art-kicker,
.art-caption {
  z-index: 1;
  text-align: center;
}

.art-kicker {
  margin: 0;
  padding: 42px 24px 0;
  color: var(--gold);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.28em;
}

.art-kicker span {
  display: block;
  margin-top: 12px;
  font-size: 18px;
}

.hero-image {
  display: block;
  width: min(100%, 760px);
  max-height: min(62vh, 650px);
  margin: auto;
  object-fit: contain;
  mix-blend-mode: lighten;
  filter: drop-shadow(0 20px 32px rgba(0, 0, 0, 0.28));
}

.art-caption {
  margin: 0;
  padding: 0 24px 40px;
  color: #e7d9ed;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(14px, 1.3vw, 19px);
  font-style: italic;
}

.login-panel {
  display: grid;
  place-items: center;
  padding: 48px clamp(28px, 6vw, 100px);
  background:
    radial-gradient(circle at 100% 0, rgba(92, 42, 119, 0.22), transparent 44%), var(--night);
}

.login-content {
  width: min(100%, 420px);
}

.brand-mark {
  margin-bottom: 52px;
  color: var(--gold);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 16px;
  letter-spacing: 0.28em;
}

.brand-mark span {
  margin: 0 8px;
  font-size: 25px;
  font-weight: 700;
}

.section-label {
  margin: 0 0 14px;
  color: var(--gold);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.28em;
}

h1 {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(36px, 3.3vw, 52px);
  font-weight: 400;
  line-height: 1.15;
}

.intro {
  margin: 16px 0 44px;
  color: #bdb0c8;
  font-size: 15px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-form label {
  margin-bottom: 10px;
  color: #eadff0;
  font-size: 13px;
  font-weight: 600;
}

.login-input {
  margin-bottom: 24px;

  :deep(.q-field__control) {
    height: 54px;
    border-radius: 9px;
    background: #2c193d;
  }

  :deep(.q-field__control::before) {
    border-color: #59446b;
  }

  :deep(.q-field__control:hover::before) {
    border-color: var(--gold);
  }

  :deep(.q-field__native) {
    color: #fff;
    font-size: 15px;
  }

  :deep(.q-field__native::placeholder) {
    color: #9e8dad;
    opacity: 1;
  }

  :deep(.q-field__append) {
    color: #b9a7c5;
  }
}

.password-toggle:focus-visible {
  border-radius: 4px;
  outline: 2px solid var(--gold);
}

.login-button {
  width: 100%;
  height: 54px;
  margin-top: 12px;
  border-radius: 9px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: 0 10px 28px rgba(38, 166, 154, 0.18);
}

.button-arrow {
  margin-left: 12px;
  font-size: 21px;
  font-weight: 400;
}

.panel-footer {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 62px;
  color: var(--gold);
  font-size: 13px;
}

.panel-footer span {
  width: 42px;
  height: 1px;
  background: rgba(219, 184, 111, 0.45);
}

@media (max-width: 900px) {
  .login-page {
    grid-template-columns: 1fr;
  }

  .login-art {
    min-height: auto;
    height: 240px;
    padding: 14px;
  }

  .art-frame {
    min-height: 0;
  }

  .art-kicker {
    padding-top: 18px;
  }

  .hero-image {
    width: 390px;
    max-height: 170px;
  }

  .art-caption {
    display: none;
  }

  .login-panel {
    padding: 44px 24px 60px;
  }

  .brand-mark {
    margin-bottom: 32px;
  }
}

@media (max-width: 480px) {
  .login-art {
    height: 195px;
  }

  .hero-image {
    max-height: 140px;
  }

  .login-panel {
    place-items: start center;
  }

  .intro {
    margin-bottom: 32px;
  }

  .panel-footer {
    margin-top: 42px;
  }
}
</style>
