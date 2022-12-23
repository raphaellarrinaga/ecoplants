<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-list__item">
        <NuxtLink to="/" class="nav-list__link">
          Ecoplants
        </NuxtLink>
      </li>
      <li class="nav-list__item">
        <NuxtLink to="/ligneux" class="nav-list__link">
          Ligneux
        </NuxtLink>
      </li>
      <li class="nav-list__item">
        <NuxtLink to="/quiz" class="nav-list__link">
          Quiz
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
}

.nav-list__item {
  & + & {
    margin-left: 1rem;
  }
}

.nav-list__link {
  color: #111;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
