<template>
  <div class="container-login">
    <div class="wallpaper-login"></div>

    <div class="box-login">
      <img :src="logo" class="logo" alt="logo" />

      <q-input
        class="q-mt-lg input-login"
        outlined
        v-model="email"
        label="Email"
        :rules="[(val) => !!val || 'Email inválido']"
      />

      <q-input
        class="q-mb-lg input-login"
        outlined
        id="pass"
        ref="pass"
        v-model="password"
        label="Senha"
        :type="isPwd ? 'password' : 'text'"
        @keyup.enter="login"
      >
        <template #append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-btn
        color="secondary"
        @click="login"
        class="btn-login"
        :loading="loading"
        :disable="!isDisableBtn"
      >
        Entrar
      </q-btn>
    </div>
  </div>
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

    const isDisableBtn = computed(() => {
      return email.value.length > 0 && password.value.length > 0
    })

    const login = () => {
      try {
        loading.value = true

        localStorage.setItem('email', email.value)
        localStorage.setItem('login', 'true')

        router.push('/')
      } catch (ex) {
        console.error(ex)

        $q.notify({
          type: 'warning',
          message: 'Algo deu errado!',
        })
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      loading,
      logo: Logo,
      isPwd,
      isDisableBtn,
      login,
    }
  },
})
</script>

<style lang="scss">
@import '../../css/quasar.variables.scss';
@import '../../css/responsive.scss';

body {
  background-color: #250e39;
}
.container-login {
  display: flex;
  width: 100%;
  height: 100vh;

  .wallpaper-login {
    height: 100%;
    display: none;
    background: #250e39;

    @include breakpoint('desktop') {
      display: initial;
      width: 0%;
    }
  }

  .box-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    @include breakpoint('desktop') {
      width: 100%;
      padding: 0 36%;
    }

    .logo {
      width: 250px;
    }

    .input-login {
      min-width: 80%;

      .q-field__control {
        background-color: #fff !important;
      }
    }

    .btn-login {
      min-width: 80%;
    }
  }
  .link {
    color: white;
    font-size: 16px;
    font-weight: 400;
    width: 80%;
    text-align: right;
    cursor: pointer;
    margin-top: 4px;
  }
}
</style>
