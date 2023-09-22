<template>
  <div class="content">
    <div class="page">
      <header class="page-header">
        <h1 class="page-title">
          <NuxtLink to="/" class="nav-list__link">
            <span class="page-title__text">Ecoplants</span>
            <img src="~/assets/images/logo.svg" data-not-lazy />
          </NuxtLink>
        </h1>
        <MainNavigation/>
      </header>

      <div class="main-text">
        <h3>Contribuer</h3>
        <p>D'un point de vue technique, le projet est arrivé à un point où il pourrait être utilisable par d'autres personnes que moi-même (à mes yeux).</p>
        <p>La tâche la plus lourde maintenant est l'ajout de contenu manquant. C'est ce qui prend le plus de temps mais qui rendra l'application réellement utile.</p>
        <p>Toute personne désireuse de contribuer à ce niveau là est la bienvenue.</p>
        <h3>Fonctionnement</h3>
        <ul>
          <li>Pour la Roadmap technique, l'ajout de fonctionnalités, etc., voir le fichier <a href="https://github.com/raphaellarrinaga/ecoplants/blob/main/README.md">Readme</a>.</li>
          <li>Pour réinitialiser les filtres il faut recharger la page ou les remettre à 0 un par un.</li>
          <li>Les filtres n'affichent les résultats que pour les plantes dont l'info en question a été complétée. Par exemple, si vous filtrez par couleur en choisissant le "Jaune", il y a peut être 10 plantes qui s'affichent mais si 20 autres plantes ont aussi les fleurs jaunes mais que ce champs n'a pas été complété pour celles là elles ne s'afficheront pas.</li>
          <li>Item pour les icones à droite du nom des plantes, celles qui ne sont pas complétées entièrement n'afficheront pas l'icone donc ce n'est pas parce qu'elle n'a pas l'icone qu'elle n'a pas le critère en question (comestible, toxique, indigène, etc.)</li>
          <li>Les filtres sont multiples quand c'est possible. Dans le filtre "Type" par exemple, une plante peut avoir le type "Arbre" mais aussi "Conifère". Elle apparaitra dans les deux cas. Pareil pour l'exposition si elle accepte l'ombre et la mi-ombre. Ou la couleur de la fleur si elle est mauve et qu'elle comporte aussi du jaune ou que les fleurs sont parfois considées bleues ou violet comme le bleuet par exemple.</li>
          <li>Le click sur une vignette de photos affiche le ou les images disponibles en grand. Le numéro en bas à droite de la vignette correspond au nombre d'images pour la plante.</li>
        </ul>
        <h3>Exemples de cas d'utilisation</h3>
        <ul>
          <li>Composer un massif</li>
          <li>Choisir une plante pour un cas d'utilisation précis (composer une haie, couvre-sol, etc.)</li>
          <li>En savoir plus sur une plante</li>
          <li>Savoir à quoi ressemble une plante donnée</li>
          <li>Connaitre la liste des plantes invasives en Belgique</li>
          <li>Etc.</li>
          <li>Exemples :</li>
          <ul>
            <li>Je veux afficher une liste de sujets pour une haie indigène, comestible, de max 2m de haut.</li>
            <li>Je veux afficher une liste de vivaces aux fleurs bleues ou jaunes qui fleurissent en juin pour composer un massif.</li>
            <li>Je veux afficher une liste de plantes qui se plaisent à l'ombre, d'une hauteur max de 80cm pour composer un massif.</li>
            <li>Je veux savoir à quoi ressemblent les feuilles et fleurs de l'Achillée.</li>
            <li>Je veux en savoir plus sur les caractéristiques d'une plante dont je connais le nom.</li>
          </ul>
        </ul>
        <h3>But et historique</h3>
        <p>À l'origine, j'ai crée ce projet dans le but de retrouver les informations classiques de plantes herbacées et indigènes que je manipulais durant mon stage en pépinière. Le nom Ecoplants vient de là mais il est temporaire, à la base.</p>
        <p>Les contraintes étaient d'utiliser des technologies permettant de n'avoir aucun frais et d'exploiter Google Sheets comme source de données. Google Sheets a été choisi parce qu'il permet d'éditer rapidement plusieurs plantes en même temps, de gérer facilement les accès pour permettre à d'autres intervenants de compléter la base de donnée et qu'il est relativement facile à prendre en main.</p>
        <p>L'affichage d'images a été ajouté ensuite. Dans la même logique que pour le contenu textuel, les images sont stockées dans Google Drive. Les deux sources de données sont ensuite croisées.</p>
        <p>Ensuite l'application a évolué pour répondre à d'autres besoins, comme par exemple ceux-ci :</p>
        <ul>
          <li>Trouver le nom vernaculaire d'une plante dont on connait le nom scientifique et vice-versa.</li>
          <li>Voir à quoi ressemble une plante spécifique.</li>
          <li>Lister une série de plantes qui correspondent à un critère spécifique, notamment pour l'aménagement de jardins.</li>
        </ul>
        <p>A noter que c'est une <abbr title="Progressive Web App">PWA</abbr>, quand le site est consulté dans un navigateur sur smartphone, une boite de dialogue s'affiche et permet d'installer le site pour l'utiliser comme une application native.</p>
        <p>Ce projet n'est pas accessible par les moteurs de recherche et n'a été partagé qu'à quelques connaissances. Il n'est pas recommandé de le partager au grand public à moins de m'en avertir.</p>
        <h3>Liens</h3>
        <ul>
          <li><a href="https://github.com/raphaellarrinaga/ecoplants/">Code source</a> ➚</li>
          <li><a href="https://raphlarri.com/">Mon site</a> ➚</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Infos',
}
</script>

<style lang="scss">
  .main-text {
    margin-bottom: 3rem;
    margin-top: 3rem;
    max-width: 45rem;

    a {
      color: $link-color;

      &:hover {
        color: $primary-text-color;
        text-decoration: none;
      }
    }
  }
</style>
