<template>
  <div>
    <hr />
    <div class="field">
      <p class="control has-icons-left">
        <input type="text" placeholder="Rechercher un produit" class="input" v-model="search" />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <div class="table-container">
      <table class="table is-narrow is-fullwidth" v-if="$store.state.ready">
        <thead>
          <tr>
            <th class="is-hidden-mobile is-hidden-tablet-only"></th>
            <th>Nom</th>
            <th>Référence</th>
            <th class="is-hidden-mobile is-hidden-tablet-only">Prix</th>
            <th>Quantité</th>
            <th class="is-hidden-mobile is-hidden-tablet-only">Total</th>
            <th>Achat</th>
            <th>Réception</th>
          </tr>
        </thead>
        <tbody v-for="groupe in $store.state.groupes" :key="groupe.id">
          <tr v-if="afficherGroupe(groupe)">
            <th colspan="100">
              <a @click="groupe.hidden = !groupe.hidden">{{groupe.nom}}</a>
              / {{groupe.nbProduits}} produits et {{groupe.nbReferences}} références
            </th>
          </tr>
          <template v-if="!groupe.hidden">
            <template v-for="p in groupe.ps">
              <template v-if="afficherProduit(p)">
                <Produit :p="p" :key="p.id" />
              </template>
            </template>
          </template>

          <template v-if="afficherGroupe(groupe)">
            <tr v-if="afficherGroupe(groupe)">
              <th></th>
              <th colspan="100">Total : {{groupe.total}}€</th>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Produit from "@/components/Produit.vue";

export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    afficherGroupe(groupe) {
      if (this.search) {
        let afficher = 0;
        groupe.ps.forEach((p) => {
          if (this.afficherProduit(p)) {
            afficher++;
          }
        });
        if (afficher) {
          return true;
        }
      } else {
        return true;
      }
    },
    afficherProduit(p) {
      if (this.search) {
        if (p.pid == this.search || p.pid.includes(this.search)) {
          return true;
        }
        let search = this.search.toLowerCase();
        if (JSON.stringify(p).toLowerCase().includes(search)) {
          return true;
        }
      } else {
        return true;
      }
    },
  },
  components: {
    Produit,
  },
};
</script>
