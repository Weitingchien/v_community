<template>
  <v-card class="rounded-lg" max-width="700">
    <v-list class="grey darken-3" subheader>
      <v-subheader>Recent articles</v-subheader>

      <v-list-item v-for="article in articles" :key="article.title" link>
        <v-list-item-avatar>
          <v-img :alt="`${article.title} avatar`" :src="article.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="article.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon :color="article.active ? 'deep-purple accent-4' : 'grey'">
            mdi-message-outline
          </v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list subheader>
      <v-subheader>Previous articles</v-subheader>

      <v-list-item v-for="article in previous" :key="article.title" link>
        <v-list-item-avatar>
          <v-img :alt="`${article.title} avatar`" :src="article.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="article.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      articles: [
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title:
            'trerterterfgdfge4treterterttytytryrtytryrtyrtyrtyrtytryrtyrtytrytyutttttttttttttttttttttttttttreterdgdfg',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'errwetweterterterfgdfgerwetwet4tretertertreterdgdfg',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'zrerterterfgdfge4tretertertreterdgdfg',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'jijiedrfewrerterterfgdfge4tretertertreterdgdfg',
        },
      ],
      previous: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'edrfewrerterterfgdfge4tretertertreterdgdfg',
        },
      ],
    }
  },
}
</script>
