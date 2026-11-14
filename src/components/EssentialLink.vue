<template>
  <q-item clickable :to="props.link" exact class="nav-link">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.label }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: '',
  },

  link: {
    type: String,
    default: '/',
  },

  icon: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.nav-link {
  min-height: 55px;
  margin: 3px 0;
  padding: 7px 12px;
  color: #e9ddee;
  border: 1px solid transparent;
  border-radius: 9px;
}
.nav-link:hover {
  background: #49305c;
  color: #fff;
}
.nav-link.q-router-link--exact-active {
  background: #5b3d6d;
  color: #fff;
  border-color: rgba(219, 184, 111, 0.37);
}
.nav-link :deep(.q-item__section--avatar) {
  min-width: 36px;
  color: #dbb86f;
}
.nav-link :deep(.q-item__label) {
  font-size: 13px;
  font-weight: 600;
}
.nav-link :deep(.q-item__label--caption) {
  color: #c7b5d2;
  font-size: 10px;
  font-weight: 400;
}
</style>
