<template>
  <header class="app-header">
    <p class="app-eyebrow">Baby Calendar</p>
    <h1 class="app-title">新生兒成長照護筆記</h1>
    <p class="app-subtitle">
      追蹤新生兒成長需要注意的事項，整理照顧過程中可能遇到的問題。
    </p>
  </header>
</template>

<style scoped>
.app-header {
  margin-bottom: 24px;
  text-align: center;
}

.app-eyebrow {
  margin: 0 0 8px;
  color: rgb(var(--v-theme-primary));
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.app-title {
  margin: 0 0 12px;
  font-size: clamp(1.75rem, 5vw, 2.25rem);
  font-weight: 600;
  line-height: 1.2;
}

.app-subtitle {
  margin: 0 auto;
  max-width: 36rem;
  color: rgba(var(--v-theme-on-background), 0.7);
  line-height: 1.6;
}
</style>
