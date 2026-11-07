<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> QuestBoard </q-toolbar-title>

        <div>v0.0.2</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :breakpoint="400">
      <q-img
        class="absolute-top"
        src="https://images.pexels.com/photos/7018123/pexels-photo-7018123.jpeg"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img alt="User avatar" :src="avatarUrl" />
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
          <q-btn
            flat
            round
            class="absolute-top-right"
            @click="logoutUser"
            color="white"
            icon="logout"
          >
            <q-tooltip v-model="showing">Logout</q-tooltip>
          </q-btn>
        </div>
      </q-img>

      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list>
          <EssentialLink v-for="link in linksList" :key="link.label" v-bind="link" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page v-if="route.path === '/'" class="flex flex-center">
        <img src="../assets/logo_quest_2.jpg" class="logo" alt="logo" height="200" />
      </q-page>
      <router-view v-else />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EssentialLink from '@/components/EssentialLink.vue'
import { avatarUrl, refreshAvatar } from '@/composables/profileAvatar.js'

const router = useRouter()
const route = useRoute()
onMounted(refreshAvatar)
const linksList = [
  {
    label: 'Sessões',
    caption: 'Calendário, presenças, planejamento, registro e retrospectiva de sessões.',
    icon: 'event',
    link: '/sessoes',
  },
  {
    label: 'Campanhas e personagens',
    caption: 'Participantes, fichas, evolução, relações e permissões.',
    icon: 'groups',
    link: '/campanhas',
  },
  {
    label: 'Biblioteca',
    caption: 'Anotações, wiki, mapas, NPCs, locais, itens e lore.',
    icon: 'menu_book',
    link: '/biblioteca',
  },
  {
    label: 'Missões',
    caption: 'Objetivos, progresso, recompensas e histórico narrativo.',
    icon: 'flag',
    link: '/missoes',
  },
  {
    label: 'Votações',
    caption: 'Datas, alimentação, logística e decisões do grupo.',
    icon: 'how_to_vote',
    link: '/votacoes',
  },
  {
    label: 'Ferramentas',
    caption: 'Dados, iniciativa, temporizadores e geradores de conteúdo.',
    icon: 'handyman',
    link: '/ferramentas',
  },
  {
    label: 'Config.',
    caption: 'Nome, foto, email e personalização',
    icon: 'settings',
    link: '/config',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logoutUser() {
  localStorage.removeItem('email')
  localStorage.removeItem('login')

  router.push('/login')
}
</script>
<style lang="scss">
body {
  background-color: #250e39;
}

.logo {
  max-width: 100%;
  object-fit: contain;
}
</style>
