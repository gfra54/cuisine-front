<template>
  <section class="section">
    <h1 class="title">La cuisine</h1>
    <nav>
      <router-link to="/">Groupes de montage</router-link> | 
      <router-link to="/?reception=true">Reçus</router-link> | 
      <router-link to="/?reception=false">Non reçus</router-link> | 
      <router-link to="/inventaire">Inventaire des produits</router-link> | 
      <a href="https://docs.google.com/spreadsheets/d/1Y6rYYgZjvIj23nI9MKouNeY51Vn774ELOeYHm3G4pPE/edit?usp=sharing" target="_blank">Liste de produits</a> |
      <a
        target="_blank"
        href="https://kitchen.planner.ikea.com/planner/#/fr/fr/planner?rangeEnv=ProdRange&environmentStage=main&projectId=E8F608A6-32A5-4071-AEE0-81CA8AD71829"
      >Plan 3D</a>
      |
      <a
        target="_blank"
        href="https://docs.google.com/document/d/1N7LLJ4MmX5fRyUyiABbbmL8OnQN2ahUSqT_4aB7tIo4/edit"
      >Description des travaux</a>
    </nav>
    <router-view />
  </section>
</template>
<script>
export default {
  mounted() {
    this.$api.get("groupes").then((response) => {
      this.$store.commit("setGroupes", response.data);
      this.$api
        .get("achats")
        .then((response) => {
          this.$store.commit("setAchats", response.data);
        })
        .finally(() => {
          this.$store.commit("setReady");
        });
      this.$api
        .get("metas")
        .then((response) => {
          this.$store.commit("setMetas", response.data);
        })
        .finally(() => {
          this.$store.commit("setReady");
        });
      this.$api
        .get("receptions")
        .then((response) => {
          this.$store.commit("setReceptions", response.data);
        })
        .finally(() => {
          this.$store.commit("setReady");
        });
    });
  },
};
</script>
<style lang="scss">
</style>
