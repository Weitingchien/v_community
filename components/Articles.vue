<template>
  <v-card class="rounded-lg">
    <v-list two-line class="grey darken-3" subheader>
      <v-subheader>近期</v-subheader>

      <v-list-item v-for="article in articles" :key="article.title" link>
        <v-list-item-avatar>
          <v-avatar>
            <v-img
              v-if="article.avatar"
              :alt="`${article.title} avatar`"
              :src="article.avatar"
            ></v-img>

            <v-avatar v-else size="128" color="grey darken-2">
              <v-skeleton-loader
                class="mx-auto"
                type="avatar"
              ></v-skeleton-loader>
            </v-avatar>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="article.title"></v-list-item-title>
          <v-list-item-subtitle v-text="article.content"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text
            v-text="article.created_at.split(' ')[0]"
          ></v-list-item-action-text>
          <v-list-item-action-text
            v-text="article.username"
          ></v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list subheader>
      <v-subheader>熱門</v-subheader>

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
      articles: [],
      previous: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'edrfewrerterterfgdfge4tretertertreterdgdfg',
        },
      ],
    }
  },
  async fetch() {
    const response = await this.$api.getArticles()
    this.articles = response.data.result
    console.log(response.data.result)
  },
}
</script>
