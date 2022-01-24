<template>
  <tr :class="{'ok':etatAchat && etatReception}">
    <td class="is-hidden-mobile is-hidden-tablet-only">
      <a :href="p.product.mainImageUrl" target="_blank">
        <img :src="p.product.mainImageUrl" />
      </a>
    </td>
    <td>
      <a :href="p.product.pipUrl" target="_blank">{{p.product.name}}</a>
      <small class="tag" v-if="p.g">
        <router-link :to="{name:'Groupes',query : {s:p.g.nom}}">{{p.g.nom}}</router-link>
      </small>
      <p>
        <small>
          {{p.product.typeName}}
          <br />
          {{p.product.itemMeasureReferenceText}}
        </small>
      </p>
      <template v-for="g in p.groupes">
        <span class="tag">Groupe {{Number(g.split(' ')[0])}}</span>&nbsp;
      </template>
    </td>
    <td>
      <router-link :to="{name:'Groupes',query : {s:p.pid}}">
        <code>{{p.pid}}</code>
      </router-link>
    </td>
    <td class="is-hidden-mobile is-hidden-tablet-only">{{p.product.priceNumeral}}€</td>
    <td>{{p.qte}}</td>
    <td class="is-hidden-mobile is-hidden-tablet-only">{{p.product.priceNumeral*p.qte}}€</td>
    <td>
      <template v-if="editable">
        <button
          @click="setAchat"
          class="button is-small"
          :class="etatAchat ? 'is-success' : 'is-warning'"
        >{{libAchat}}</button>
      </template>
    </td>
    <td>
      <template v-if="editable">
        <button
          @click="setReception"
          class="button is-small"
          :class="etatReception ? 'is-success' : 'is-warning'"
        >{{libReception}}</button>
      </template>
    </td>
    <td>
      <template v-if="editable">
        <select v-model="meta.etat" @change="setMeta('etat')">
          <option v-for="etat in etats" :key="etat">{{etat}}</option>
        </select>
      </template>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["p", "editable"],
  mounted() {
    if (this.$store.state.metas[this.p.id]) {
      this.meta = this.$store.state.metas[this.p.id];
    }
  },
  data() {
    return {
      meta: {
        etat: "",
      },
      etats: [
        "",
        "Dans le caddie",
        "Commandé",
        "Manquant",
        "En attente",
        "Stocké",
      ],
      achat: null,
      reception: null,
    };
  },
  computed: {
    libAchat() {
      if (this.etatAchat) {
        return "Payé";
      } else {
        return "Non payé";
      }
    },
    libReception() {
      if (this.etatReception) {
        return "Reçu";
      } else {
        return "Non reçu";
      }
    },
    etatAchat() {
      if (this.achat !== null) {
        if (this.achat) {
          return true;
        }
      } else if (this.$store.state.achats[this.p.id]) {
        return true;
      }
    },
    etatReception() {
      if (this.reception !== null) {
        if (this.reception) {
          return true;
        }
      } else if (this.$store.state.receptions[this.p.id]) {
        return true;
      }
    },
  },
  methods: {
    setAchat() {
      this.achat = this.$store.state.achats[this.p.id] ? false : true;
      this.$api
        .post("achat", { id: this.p.id, achat: this.achat })
        .then((response) => {
          this.$store.commit("setAchats", response.data);
        });
    },
    setReception() {
      this.reception = this.$store.state.receptions[this.p.id] ? false : true;
      this.$api
        .post("reception", { id: this.p.id, reception: this.reception })
        .then((response) => {
          this.$store.commit("setReceptions", response.data);
        });
    },
    setMeta(w) {
      this.$api
        .post("meta", { id: this.p.id, meta: this.meta })
        .then((response) => {
          this.$store.commit("setMetas", response.data);
        });
    },
  },
};
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
.ok td,
.ok td a {
  color: #aaa;
}
</style>