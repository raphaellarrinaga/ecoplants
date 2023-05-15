<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-list__item">
        <NuxtLink to="/galleryrenac" class="nav-list__link">
          Galerie
        </NuxtLink>
      </li>
      <li class="nav-list__item">
        <NuxtLink to="/quizrenac" class="nav-list__link">
          Quiz
        </NuxtLink>
      </li>
      <li class="nav-list__item">
        <NuxtLink to="/infos" class="nav-list__link">
          Infos
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
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
}

</style>
