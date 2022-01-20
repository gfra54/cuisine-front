<template>
  <tr :class="{'ok':etatAchat && etatReception}">
    <td class="is-hidden-mobile is-hidden-tablet-only">
      <a :href="p.product.mainImageUrl" target="_blank">
        <img :src="p.product.mainImageUrl" />
      </a>
    </td>
    <td>
      <a
        href="https://www.ikea.com/fr/fr/p/metod-caisson-surmeuble-refrig-cong-blanc-40205537/"
        target="_blank"
      >{{p.product.name}}</a>
      <p>
        <small>{{p.product.typeName}}<br>{{p.product.itemMeasureReferenceText}}</small>
      </p>
    </td>
    <td><code>{{p.pid}}</code></td>
    <td class="is-hidden-mobile is-hidden-tablet-only">
      {{p.nom}}
      <br />
      
    </td>
    <td class="is-hidden-mobile is-hidden-tablet-only">{{p.product.priceNumeral}}€</td>
    <td>{{p.qte}}</td>
    <td class="is-hidden-mobile is-hidden-tablet-only">{{p.product.priceNumeral*p.qte}}€</td>
    <td>
      <button
        @click="setAchat"
        class="button is-small"
        :class="etatAchat ? 'is-success' : 'is-warning'"
      >{{libAchat}}</button>
    </td>
    <td>
      <button
        @click="setReception"
        class="button is-small"
        :class="etatReception ? 'is-success' : 'is-warning'"
      >{{libReception}}</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["p"],
  data() {
    return {
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
  },
};
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
.ok td, .ok td a {
    color: #aaa;

}
</style>