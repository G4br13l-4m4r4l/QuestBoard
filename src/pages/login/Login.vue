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
        @keyup="login"
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
import { defineComponent } from 'vue'
import Logo from '../../assets/logo_quest_2.jpg'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const teste = () => {
      const $q = useQuasar()

      $q.notify({
        message: 'Email ou senha inválidos',
        color: 'negative',
        icon: 'warning',
        position: 'bottom',
      })
    }
    return {
      email: ref(''),
      password: ref(''),
      loading: ref(false),
      logo: Logo,
      isPwd: ref(true),
      teste,
    }
  },
  computed: {},
  methods: {
    log(string) {
      console.log(string)
    },
    login() {
      const $q = useQuasar()
      try {
        this.loading = true
        window.localStorage.setItem('email', this.email)
        window.localStorage.setItem('login', true)
        const route = useRouter()
        route.push({ name: 'Embarques' })
        this.loading = false
      } catch (ex) {
        console.error(ex)
        $q.notify({
          type: 'warning',
          message: 'Algo deu errado!',
        })
        this.loading = false
      }
    },

    isDisableBtn() {
      return (this.email.length > 0 && this.password.length > 0) === true
    },
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
