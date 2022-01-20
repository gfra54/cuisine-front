import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    groupes: [],
    achats: [],
    ready: false,
    cpt: 0,
  },
  mutations: {
    setReady(state) {
      state.cpt++;
      if (state.cpt == 2) {
        state.ready = true;
      }
    },
    setReceptions(state, receptions) {
      state.receptions = receptions;
    },
    setAchats(state, achats) {
      state.achats = achats;
    },
    setGroupes(state, groupes) {
      groupes.map(groupe => {
        groupe.hidden = false;
        let total = 0;
        let nbProduits = 0;
        groupe.ps.forEach(p => {
          total += p.qte * p.product.priceNumeral;
          nbProduits += Number(p.qte);
        })
        groupe.total = total;
        groupe.nbProduits = nbProduits;
        groupe.nbReferences = groupe.ps.length;
        return groupe;
      })
      state.groupes = groupes;
    }
  },
  actions: {
  },
  modules: {
  }
})
