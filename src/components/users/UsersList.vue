<template>
  <button @click="confirmInput()"> Confirm </button>
  <button @click="savedChanges = true"> Save Changes </button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return {
      savedChanges: false,
    }
  },
  methods: {
    confirmInput() {
      this.$router.push('/teams');
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log('UsersList before route leave');
    console.log(to);
    console.log(from);
    if (this.savedChanges) {
      next();
    } else {
      const userLeave = confirm('Are you sure you want to leave?');
      next(userLeave);
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('users list component before route enter');
    console.log(to);
    console.log(from);
    next();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>