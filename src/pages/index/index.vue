<template>
  <q-page class="quest-page">
    <div class="quest-content">
      <div class="home-intro">
        <p class="quest-eyebrow">✦ &nbsp; VISÃO GERAL DA AVENTURA</p>
        <h1>O salão da sua jornada</h1>
        <p>Campanhas, encontros e missões reunidos em um só lugar.</p>
      </div>

      <section class="home-hero" aria-label="Boas-vindas ao QuestBoard">
        <div class="hero-copy">
          <p class="quest-eyebrow">CRÔNICAS DE VALDORA</p>
          <h2>Uma nova aventura espera pelo seu grupo.</h2>
          <p>Prepare a próxima sessão e acompanhe os caminhos que sua história ainda vai tomar.</p>
          <q-btn to="/sessoes" color="secondary" no-caps unelevated label="Ver próximas sessões" />
        </div>
        <img :src="logo" alt="Mago em forma de dado com espada e cajado" />
      </section>

      <div class="sample-note">
        <q-icon name="info_outline" /> Dados de exemplo para visualizar a estrutura do QuestBoard.
      </div>

      <div class="home-section-title">
        <div>
          <p class="quest-eyebrow">SEU MUNDO</p>
          <h2>Explore a aventura</h2>
        </div>
        <span class="title-rule" aria-hidden="true"></span>
      </div>
      <div class="quick-grid">
        <router-link v-for="entry in quickLinks" :key="entry.to" :to="entry.to" class="quick-card">
          <span class="quick-icon"><q-icon :name="entry.icon" size="25px" /></span>
          <strong>{{ entry.title }}</strong>
          <small>{{ entry.description }}</small>
          <span class="quick-arrow" aria-hidden="true">→</span>
        </router-link>
      </div>

      <div class="home-section-title second-title">
        <div>
          <p class="quest-eyebrow">EM DESTAQUE</p>
          <h2>O que vem pela frente</h2>
        </div>
        <span class="title-rule" aria-hidden="true"></span>
      </div>
      <div class="feature-grid">
        <router-link to="/sessoes" class="feature-card">
          <span class="feature-icon"><q-icon name="event" size="23px" /></span>
          <span class="feature-label">PRÓXIMA SESSÃO</span>
          <strong>{{ nextSession.title }}</strong>
          <small>{{ nextSession.meta }}</small>
          <p>{{ nextSession.description }}</p>
          <span class="feature-link">Abrir sessões →</span>
        </router-link>
        <router-link to="/missoes" class="feature-card">
          <span class="feature-icon"><q-icon name="flag" size="23px" /></span>
          <span class="feature-label">MISSÃO EM ANDAMENTO</span>
          <strong>{{ activeQuest.title }}</strong>
          <small>{{ activeQuest.meta }}</small>
          <p>{{ activeQuest.description }}</p>
          <span class="feature-link">Abrir missões →</span>
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import Logo from '@/assets/logo_quest_2.jpg'
import { menuPages } from '@/data/menuPages.js'

const logo = Logo
const nextSession = menuPages.sessoes.groups[0].items[0]
const activeQuest = menuPages.missoes.groups[0].items[0]
const quickLinks = [
  { title: 'Sessões', description: 'Agenda e registros', icon: 'event', to: '/sessoes' },
  { title: 'Campanhas', description: 'Heróis e histórias', icon: 'groups', to: '/campanhas' },
  {
    title: 'Biblioteca',
    description: 'O saber do seu mundo',
    icon: 'menu_book',
    to: '/biblioteca',
  },
  { title: 'Missões', description: 'Objetivos e recompensas', icon: 'flag', to: '/missoes' },
  { title: 'Votações', description: 'Escolhas do grupo', icon: 'how_to_vote', to: '/votacoes' },
  { title: 'Ferramentas', description: 'Apoio para a mesa', icon: 'casino', to: '/ferramentas' },
]
</script>

<style lang="scss" scoped>
.home-intro {
  margin-bottom: 26px;
}
.home-intro h1 {
  margin: 8px 0 6px;
  font:
    400 clamp(32px, 4vw, 46px) / 1.15 Georgia,
    'Times New Roman',
    serif;
}
.home-intro > p:last-child {
  margin: 0;
  color: #b9a9c4;
}
.home-hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 300px;
  overflow: hidden;
  border: 1px solid rgba(219, 184, 111, 0.43);
  border-radius: 17px;
  background: radial-gradient(circle at 76% 44%, #52306a 0, #2a1440 48%, #211030 100%);
}
.home-hero::before,
.home-hero::after {
  position: absolute;
  width: 28px;
  height: 28px;
  content: '';
  border-color: #dbb86f;
  pointer-events: none;
}
.home-hero::before {
  top: 12px;
  left: 12px;
  border-top: 2px solid;
  border-left: 2px solid;
}
.home-hero::after {
  right: 12px;
  bottom: 12px;
  border-right: 2px solid;
  border-bottom: 2px solid;
}
.hero-copy {
  z-index: 1;
  width: 55%;
  padding: 38px 42px;
}
.hero-copy h2 {
  max-width: 460px;
  margin: 10px 0;
  font:
    400 clamp(28px, 3vw, 39px) / 1.17 Georgia,
    'Times New Roman',
    serif;
}
.hero-copy > p:not(.quest-eyebrow) {
  max-width: 430px;
  margin: 0 0 22px;
  color: #d3c5dd;
  line-height: 1.5;
}
.hero-copy :deep(.q-btn) {
  border-radius: 8px;
  font-weight: 700;
}
.home-hero img {
  position: absolute;
  right: -2%;
  bottom: -4%;
  width: 51%;
  max-height: 110%;
  object-fit: contain;
  mix-blend-mode: lighten;
}
.sample-note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 15px;
  color: #ae9eb9;
  font-size: 12px;
}
.home-section-title {
  display: flex;
  align-items: end;
  gap: 24px;
  margin: 36px 0 17px;
}
.home-section-title h2 {
  margin: 4px 0 0;
  font:
    400 27px / 1.25 Georgia,
    'Times New Roman',
    serif;
}
.title-rule {
  flex: 1;
  height: 1px;
  margin-bottom: 9px;
  background: rgba(219, 184, 111, 0.25);
}
.quick-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.quick-card,
.feature-card {
  position: relative;
  display: flex;
  flex-direction: column;
  color: #f8f4fb;
  text-decoration: none;
  background: #271637;
  border: 1px solid #4a365a;
  border-radius: 13px;
  transition:
    border-color 0.2s,
    transform 0.2s;
}
.quick-card:hover,
.feature-card:hover {
  border-color: #dbb86f;
  transform: translateY(-2px);
}
.quick-card:focus-visible,
.feature-card:focus-visible {
  outline: 2px solid #dbb86f;
  outline-offset: 2px;
}
.quick-card {
  min-height: 150px;
  padding: 19px;
}
.quick-icon,
.feature-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  margin-bottom: 14px;
  color: #dbb86f;
  background: #3a254d;
  border: 1px solid #665079;
  border-radius: 10px;
}
.quick-card strong,
.feature-card strong {
  font:
    400 20px / 1.3 Georgia,
    'Times New Roman',
    serif;
}
.quick-card small,
.feature-card small {
  margin-top: 5px;
  color: #b9a9c4;
  font-size: 12px;
}
.quick-arrow {
  position: absolute;
  right: 18px;
  bottom: 18px;
  color: #dbb86f;
  font-size: 21px;
}
.second-title {
  margin-top: 40px;
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.feature-card {
  min-height: 240px;
  padding: 22px;
}
.feature-label {
  margin-bottom: 8px;
  color: #dbb86f;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
}
.feature-card p {
  margin: 16px 0;
  color: #d3c5dd;
  font-size: 13px;
}
.feature-link {
  margin-top: auto;
  color: #5bcec2;
  font-size: 12px;
  font-weight: 700;
}
@media (max-width: 950px) {
  .quick-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 650px) {
  .home-hero {
    min-height: 390px;
    align-items: flex-start;
  }
  .hero-copy {
    width: 100%;
    padding: 28px;
  }
  .hero-copy h2,
  .hero-copy > p:not(.quest-eyebrow) {
    max-width: 100%;
  }
  .home-hero img {
    right: -4%;
    bottom: -14%;
    width: 72%;
    max-height: 230px;
    opacity: 0.72;
  }
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 440px) {
  .quick-grid {
    grid-template-columns: 1fr;
  }
  .quick-card {
    min-height: 115px;
  }
}
</style>
