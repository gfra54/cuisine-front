import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    groupes: [],
    metas: [],
    produits: [],
    achats: [],
    ready: false,
    cpt: 0,
  },
  mutations: {
    setReady(state) {
      state.cpt++;
      if (state.cpt == 3) {
        state.ready = true;
      }
    },
    setReceptions(state, receptions) {
      state.receptions = receptions;
    },
    setAchats(state, achats) {
      state.achats = achats;
    },
    setMetas(state, metas) {
      state.metas = metas;
    },
    setGroupes(state, groupes) {
      state.produits=[];
      groupes.map(groupe => {
        groupe.hidden = false;
        let total = 0;
        let nbProduits = 0;
        groupe.ps.forEach(p => {
          let clone = Object.assign({},p);
          clone.g = {id:groupe.id,nom:groupe.nom};
          state.produits.push(clone);
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
