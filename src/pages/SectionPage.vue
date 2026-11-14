<template>
  <q-page class="section-page quest-page">
    <div class="page-content quest-content">
      <div class="page-heading">
        <div class="heading-icon"><q-icon :name="page.icon" size="30px" /></div>
        <div>
          <div class="eyebrow">{{ page.eyebrow }}</div>
          <h1>{{ page.title }}</h1>
          <p>{{ page.description }}</p>
        </div>
      </div>

      <div class="mock-banner">
        <q-icon name="info_outline" size="18px" /> Dados de exemplo para visualizar a estrutura
        desta seção.
      </div>

      <div class="stats-grid">
        <q-card v-for="stat in page.stats" :key="stat.label" flat bordered class="stat-card">
          <q-card-section class="row items-center no-wrap">
            <q-icon :name="stat.icon" size="28px" color="secondary" class="q-mr-md" />
            <div>
              <div class="stat-value">{{ stat.value }}</div>
              <div class="text-grey-7">{{ stat.label }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <section v-for="group in page.groups" :key="group.title" class="content-section">
        <div class="section-heading">
          <h2>{{ group.title }}</h2>
          <p>{{ group.subtitle }}</p>
        </div>
        <div class="items-grid">
          <q-card v-for="item in group.items" :key="item.title" flat bordered class="item-card">
            <q-card-section>
              <div class="row items-start no-wrap">
                <div class="item-icon"><q-icon :name="item.icon" size="24px" /></div>
                <div class="col">
                  <div class="row items-center justify-between q-col-gutter-sm">
                    <h3 class="col-auto">{{ item.title }}</h3>
                    <q-badge :color="item.color" :label="item.tag" class="q-px-sm q-py-xs" />
                  </div>
                  <div class="item-meta">{{ item.meta }}</div>
                  <p class="item-description">{{ item.description }}</p>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { menuPages } from '@/data/menuPages.js'

const props = defineProps({ section: { type: String, required: true } })
const page = computed(() => menuPages[props.section])
</script>

<style scoped lang="scss">
.section-page {
  background: #190b28;
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
  margin-bottom: 24px;
}
.heading-icon,
.item-icon {
  display: grid;
  place-items: center;
  flex: none;
  color: #dbb86f;
  background: #382249;
  border-radius: 14px;
}
.heading-icon {
  width: 54px;
  height: 54px;
}
.item-icon {
  width: 44px;
  height: 44px;
  margin-right: 14px;
}
.eyebrow {
  color: #dbb86f;
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
.page-heading p,
.section-heading p {
  color: #d9cbe2;
  margin: 0;
}
.mock-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e5d7ed;
  background: #30203f;
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 24px;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.stat-card,
.item-card {
  border-color: #4a365a;
  border-radius: 14px;
  background: #271637;
}
.stat-value {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
  color: #f8f4fb;
}
.content-section {
  margin-top: 34px;
}
.section-heading {
  margin-bottom: 16px;
}
h2 {
  font-size: 21px;
  line-height: 1.3;
  font-weight: 700;
  margin: 0 0 3px;
}
.items-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
h3 {
  font-size: 16px;
  line-height: 1.35;
  font-weight: 700;
  margin: 0;
}
.item-meta {
  color: #dbb86f;
  font-size: 13px;
  margin: 5px 0;
}
.item-description {
  color: #d9cbe2;
  margin: 0;
}
@media (max-width: 700px) {
  .page-content {
    padding: 24px 16px 48px;
  }
  .stats-grid,
  .items-grid {
    grid-template-columns: 1fr;
  }
  .page-heading {
    gap: 12px;
  }
}
</style>
