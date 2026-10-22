<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> QuestBoard </q-toolbar-title>

        <div>v0.0.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :breakpoint="400">
      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img alt="User avatar" src="https://cdn.quasar.dev/img/boy-avatar.png" />
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
          />
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import EssentialLink from '@/components/EssentialLink.vue'

const router = useRouter()
const linksList = [
  {
    label: 'Sessões',
    caption: 'Calendário, presenças, planejamento, registro e retrospectiva de sessões.',
    icon: 'badge',
    link: '/',
  },
  {
    label: 'Campanhas e personagens',
    caption: 'Participantes, fichas, evolução, relações e permissões.',
    icon: 'assignment',
    link: '/',
  },
  {
    label: 'Biblioteca',
    caption: 'Anotações, wiki, mapas, NPCs, locais, itens e lore.',
    icon: 'chat',
    link: '/',
  },
  {
    label: 'Missões',
    caption: 'Objetivos, progresso, recompensas e histórico narrativo.',
    icon: 'chat',
    link: '/',
  },
  {
    label: 'Votações',
    caption: 'Datas, alimentação, logística e decisões do grupo.',
    icon: 'record_voice_over',
    link: '/',
  },
  {
    label: 'Ferramentas',
    caption: 'Dados, iniciativa, temporizadores e geradores de conteúdo.',
    icon: 'settings',
    link: '/',
  },
  {
    label: 'Config.',
    caption: 'Nome, foto, ...',
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
</style>
