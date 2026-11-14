<template>
  <main class="not-found">
    <div class="not-found-card">
      <span class="ornament" aria-hidden="true">✦</span>
      <p>CAMINHO DESCONHECIDO</p>
      <h1>404</h1>
      <h2>Você se perdeu na aventura.</h2>
      <p class="description">Este lugar ainda não faz parte do mapa.</p>
      <q-btn to="/" color="secondary" no-caps unelevated label="Voltar ao salão" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.not-found {
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 24px;
  color: #f8f4fb;
  background: radial-gradient(circle at center, #43205d, #190b28 70%);
}
.not-found-card {
  width: min(100%, 520px);
  padding: 50px 28px;
  text-align: center;
  background: #271637;
  border: 1px solid rgba(219, 184, 111, 0.45);
  border-radius: 16px;
}
.ornament,
.not-found-card > p:first-of-type {
  color: #dbb86f;
}
.ornament {
  font-size: 26px;
}
.not-found-card > p:first-of-type {
  margin: 14px 0 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
}
h1 {
  margin: 12px 0 0;
  font:
    400 110px / 1 Georgia,
    'Times New Roman',
    serif;
}
h2 {
  margin: 10px 0;
  font:
    400 28px / 1.25 Georgia,
    'Times New Roman',
    serif;
}
.description {
  margin: 0 0 28px;
  color: #b9a9c4;
}
</style>
