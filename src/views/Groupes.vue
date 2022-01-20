<template>
  <div>
    <div class="table-container">
      <table class="table is-narrow is-fullwidth" v-if="$store.state.ready">
        <thead>
          <tr>
            <th class="is-hidden-mobile is-hidden-tablet-only"></th>
            <th>Nom</th>
            <th>Référence</th>
            <th class="is-hidden-mobile is-hidden-tablet-only">Description</th>
            <th class="is-hidden-mobile is-hidden-tablet-only">Prix</th>
            <th>Quantité</th>
            <th class="is-hidden-mobile is-hidden-tablet-only">Total</th>
            <th>Achat</th>
            <th>Réception</th>
          </tr>
        </thead>
        <tbody v-for="groupe in $store.state.groupes" :key="groupe.id">
          <tr>
            <th colspan="100">
              <a @click="groupe.hidden = !groupe.hidden">{{groupe.nom}}</a>
              / {{groupe.nbProduits}} produits et {{groupe.nbReferences}} références
            </th>
          </tr>
          <template v-if="!groupe.hidden">
            <template v-for="p in groupe.ps">
              <Produit :p="p" :key="p.id" />
            </template>
          </template>

          <tr>
            <th></th>
            <th colspan="100">Total : {{groupe.total}}€</th>
          </tr>
          <tr>
            <td colspan="100">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Produit from "@/components/Produit.vue";

export default {
  components: {
    Produit,
  },
};
</script>
