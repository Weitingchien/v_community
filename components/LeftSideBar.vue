<template>
  <div>
    <v-sheet class="rounded-lg grey darken-3">
      <v-list-item
        v-for="topicItem in topic"
        :key="topicItem.uid"
        link
        max-width="300"
      >
        <v-list-item-avatar>
          <!-- <v-icon class="grey lighten-1" dark> mdi-folder</v-icon> -->
          <v-icon class="grey darken-1" dark> {{ topicItem.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ topicItem.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topic: [
        {
          uid: 1,
          title: '電影',
          icon: 'mdi-movie-open',
        },
        {
          uid: 2,
          title: '繪圖',
          icon: 'mdi-palette',
        },
        {
          uid: 3,
          title: '音樂',
          icon: 'mdi-music',
        },
        {
          uid: 4,
          title: '書籍',
          icon: 'mdi-book-open-page-variant',
        },
        {
          uid: 5,
          title: '考試',
          icon: 'mdi-pen',
        },
        {
          uid: 6,
          title: '程式',
          icon: 'mdi-laptop',
        },
        {
          uid: 7,
          title: '3C',
          icon: 'mdi-desktop-classic',
        },
        {
          uid: 8,
          title: '美食',
          icon: 'mdi-food',
        },
        {
          uid: 9,
          title: '旅遊',
          icon: 'mdi-earth',
        },
      ],
    }
  },
}
</script>

<style></style>
