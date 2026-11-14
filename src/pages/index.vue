<template>
  <q-layout view="lHh Lpr lFf" class="app-shell">
    <q-header class="app-header">
      <q-toolbar class="app-toolbar">
        <q-btn flat dense round icon="menu" aria-label="Abrir menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <router-link to="/" class="toolbar-brand"><span>✦</span> QUESTBOARD</router-link>
        </q-toolbar-title>
        <div>v0.0.3</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :breakpoint="900" class="app-drawer">
      <div class="drawer-content">
        <div class="drawer-top">
          <router-link to="/" class="drawer-brand"><span>✦</span> QUESTBOARD</router-link>
          <p>Seu mundo de aventuras</p>
        </div>

        <div class="drawer-profile">
          <q-avatar size="46px"><img alt="Foto do perfil" :src="avatarUrl" /></q-avatar>
          <div class="profile-copy">
            <strong>{{ displayName }}</strong>
            <small>{{ userEmail }}</small>
          </div>
        </div>

        <p class="drawer-label">EXPLORAR</p>
        <q-scroll-area class="drawer-scroll">
          <q-list class="nav-list">
            <EssentialLink label="Visão geral" caption="Sua jornada" icon="dashboard" link="/" />
            <EssentialLink v-for="link in linksList" :key="link.label" v-bind="link" />
          </q-list>
        </q-scroll-area>

        <div class="drawer-bottom">
          <q-btn flat no-caps icon="logout" label="Sair da aventura" @click="logoutUser" />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <HomePage v-if="route.path === '/'" />
      <router-view v-else />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EssentialLink from '@/components/EssentialLink.vue'
import HomePage from '@/pages/index/index.vue'
import { avatarUrl, refreshAvatar } from '@/composables/profileAvatar.js'

const router = useRouter()
const route = useRoute()
onMounted(refreshAvatar)

const linksList = [
  { label: 'Sessões', caption: 'Agenda e registros', icon: 'event', link: '/sessoes' },
  { label: 'Campanhas', caption: 'Heróis e histórias', icon: 'groups', link: '/campanhas' },
  { label: 'Biblioteca', caption: 'Conhecimento do mundo', icon: 'menu_book', link: '/biblioteca' },
  { label: 'Missões', caption: 'Objetivos e recompensas', icon: 'flag', link: '/missoes' },
  { label: 'Votações', caption: 'Decisões do grupo', icon: 'how_to_vote', link: '/votacoes' },
  { label: 'Ferramentas', caption: 'Recursos para a mesa', icon: 'casino', link: '/ferramentas' },
  { label: 'Configurações', caption: 'Perfil e preferências', icon: 'settings', link: '/config' },
]

const leftDrawerOpen = ref(false)
const displayName = computed(() => {
  route.path
  return localStorage.getItem('displayName') || 'Aventureiro'
})
const userEmail = computed(() => {
  route.path
  return localStorage.getItem('email') || 'Sua conta'
})

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logoutUser() {
  localStorage.removeItem('email')
  localStorage.removeItem('login')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.app-shell {
  background: #190b28;
  color: #f8f4fb;
}
.app-header {
  background: #211030;
  border-bottom: 1px solid rgba(219, 184, 111, 0.23);
  box-shadow: none;
}
.app-toolbar {
  min-height: 68px;
  padding: 0 28px;
  gap: 14px;
}
.toolbar-brand,
.drawer-brand {
  color: #f8f4fb;
  text-decoration: none;
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
}
.toolbar-brand span,
.drawer-brand span {
  color: #dbb86f;
}
.toolbar-brand {
  font-size: 20px;
  letter-spacing: 0.06em;
}
.drawer-profile :deep(.q-avatar) {
  border: 1px solid rgba(219, 184, 111, 0.5);
}
.drawer-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}
.drawer-top {
  padding: 30px 24px 24px;
  border-bottom: 1px solid rgba(219, 184, 111, 0.13);
}
.drawer-brand {
  font-size: 19px;
  letter-spacing: 0.06em;
}
.drawer-brand span {
  margin-right: 6px;
}
.drawer-top p {
  margin: 7px 0 0 23px;
  color: #b9a9c4;
  font-size: 12px;
}
.drawer-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 16px 26px;
  padding: 13px;
  background: #30203f;
  border: 1px solid #534066;
  border-radius: 12px;
}
.profile-copy {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.profile-copy strong {
  font-size: 13px;
}
.profile-copy small {
  overflow: hidden;
  color: #b9a9c4;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.drawer-label {
  margin: 0 24px 10px;
  color: #dbb86f;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
}
.drawer-scroll {
  flex: 1;
  min-height: 0;
}
.nav-list {
  padding: 0 12px 18px;
}
.drawer-bottom {
  padding: 14px 20px;
  border-top: 1px solid rgba(219, 184, 111, 0.13);
}
.drawer-bottom :deep(.q-btn) {
  width: 100%;
  justify-content: flex-start;
  color: #cbbbd5;
}
@media (max-width: 700px) {
  .app-toolbar {
    padding: 0 14px;
  }
}
</style>
