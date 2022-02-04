<template>
  <div>
    <hr />
    <div class="field">
      <p class="control has-icons-left">
        <input
          type="text"
          name="recherche"
          ref="recherche"
          placeholder="Rechercher un produit"
          class="input"
          v-model="search"
          @input="updateSearch($event.target.value)"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <div class="table-container" v-if="$store.state.ready">
      <template v-if="search">
        <h2 class="subtitle">{{searchResults.length}} résultat(s) trouvé(s)</h2>
        <table class="table is-narrow is-fullwidth">
          <colonnes />
          <template v-for="p in searchResults">
            <Produit :p="p" :key="p.id" editable="true" />
          </template>
        </table>
      </template>
      <template v-else>
        <table class="table is-narrow is-fullwidth">
          <colonnes />
          <tbody v-for="groupe in $store.state.groupes" :key="groupe.id">
            <tr>
              <th colspan="100">
                <a @click="groupe.hidden = !groupe.hidden">{{groupe.nom}}</a>
                / {{groupe.nbProduits}} produits et {{groupe.nbReferences}} références
              </th>
            </tr>
            <template v-if="!groupe.hidden">
              <template v-for="p in groupe.ps">
                <Produit :p="p" :key="p.id" editable="true" />
              </template>
            </template>

            <tr>
              <th></th>
              <th colspan="100">Total : {{groupe.total}}€</th>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<script>
import Produit from "@/components/Produit.vue";
import Colonnes from "@/components/Colonnes.vue";

export default {
  watch: {
    $route() {
      if (this.$route.query.s) {
        this.search = this.$route.query.s;
      } else {
        this.search = "";
      }
    },
  },
  mounted() {
    document.body.addEventListener("keydown", (e) => {
      if (e.target.name != "recherche") {
        let key = e.key;
        let ok = false;
        if (e.keyCode >= 48 && e.keyCode <= 57) {
          ok = true;
        } else if (e.keyCode >= 65 && e.keyCode <= 90) {
          ok = true;
        } else if (e.keyCode >= 97 && e.keyCode <= 122) {
          ok = true;
        }
        if(ok){
          this.search=key;
        }
        this.$refs.recherche.focus();
      }
    });
    if (this.$route.query.s) {
      this.search = this.$route.query.s;
    }
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    updateSearch(value) {
      this.search = value;
    },
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
    textSearch(obj) {
      if (obj.nom.toLowerCase().includes(this.searchLower)) {
        return true;
      }
      if (obj.product.name.toLowerCase().includes(this.searchLower)) {
        return true;
      }
      if (obj.product.typeName.toLowerCase().includes(this.searchLower)) {
        return true;
      }
      if (obj.g.nom.toLowerCase().includes(this.searchLower)) {
        return true;
      }
    },
  },
  computed: {
    searchLower() {
      return this.search.toLowerCase();
    },
    searchResults() {
      let produits = [];
      if (this.searchLower) {
        this.$store.state.produits.forEach((p) => {
          let ok = false;
          let pid = p.pid.replace(/\D/g,'');
          if (p.pid == this.searchLower) {
            ok = true;
          } else if (pid == this.searchLower) {
            ok = true;
          } else if (pid.includes(this.searchLower)) {
            ok = true;
          } else if (p.pid.includes(this.searchLower)) {
            ok = true;
          } else {
            ok = this.textSearch(p);
          }

          if (ok) {
            produits.push(p);
          }
        });
      }
      return produits;
    },
  },
  components: {
    Produit,
    Colonnes,
  },
};
</script>
