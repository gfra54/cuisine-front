<template>
  <div>
    <h2 class="subtitle">{{qte}} résultat(s) trouvé(s)</h2>
    <div class="table-container" v-if="$store.state.ready">
      <table class="table is-narrow is-fullwidth">
        <colonnes />
        <template v-for="p in ps">
          <Produit :p="p" :key="p.id" />
        </template>
      </table>
    </div>
  </div>
</template>

<script>
import Produit from "@/components/Produit.vue";
import Colonnes from "@/components/Colonnes.vue";
export default {
  components: {
    Produit,
    Colonnes,
  },
  computed: {
    qte() {
      return this.ps.reduce((total, item) => {
        return total + Number(item.qte);
      }, 0);
    },
    ps() {
      let ps = {};
      this.$store.state.groupes.forEach((g) => {
        g.ps.forEach((p) => {
          if (!ps[p.pid]) {
            ps[p.pid] = [];
          }
          ps[p.pid].push(p);
        });
      });
      let out = [];
      for (let pid in ps) {
        let qte = 0;
        let _p = false;
        ps[pid].forEach((p) => {
          if (!_p) {
            _p = Object.assign({}, p);
            _p.groupes = [];
          }
          _p.groupes.push(p.groupe);
          qte += Number(p.qte);
        });
        _p.qte = qte;
        out.push(_p);
      }
      return out.sort((i1, i2) => i1.qte < i2.qte);
    },
  },
};
</script>

<style>
</style>