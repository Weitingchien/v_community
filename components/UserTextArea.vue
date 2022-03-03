<template>
  <div>
    <v-form v-model="valid">
      <v-select
        dense
        :items="topic"
        label="請選擇主題"
        outlined
        :rules="selectRules"
        required
        @change="currentTopic"
      ></v-select>
      <v-select
        dense
        :items="issue"
        label="請選擇範圍"
        outlined
        :rules="selectRules"
        required
        @change="currentIssue"
      ></v-select>
      <v-text-field
        v-model.trim="articles.title"
        label="文章標題"
        counter="50"
        :counter-value="(v) => (typeof v === 'string' ? v.trim().length : 0)"
        :rules="titleRules"
        required
      ></v-text-field>
      <v-textarea
        v-model.trim="articles.content"
        name="input-7-1"
        label="內容"
        :rules="contentRules"
        counter="5000"
        :counter-value="(v) => (typeof v === 'string' ? v.trim().length : 0)"
        outlined
        required
      ></v-textarea>
      <!--       <v-btn>送出</v-btn> -->
      <v-dialog v-model="dialog" persistent max-width="290">
        <template #activator="{ on }">
          <v-btn :disabled="!valid" color="primary" dark v-on="on">
            送出
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5"> 確定要送出嗎? </v-card-title>
          <v-card-text>請確認發表內容是否符合規範。</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              取消
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="
                dialog = false
                submit()
              "
            >
              確定送出
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      valid: false,
      articles: {
        id: null,
        topic: null,
        issue: null,
        title: '',
        content: '',
      },
      selectRules: [(v) => !!v || '未選'],
      contentRules: [
        (v) => (v && v.length >= 4) || '至少4個字',
        (v) => (v && v.length <= 5000) || '最多5000個字',
        (v) => !/^\s+|\s+$/.test(v) || '開頭與結尾不能有空格',
      ],
      titleRules: [
        (v) => (v && v.length >= 6) || '至少6個字',
        (v) => (v && v.length <= 50) || '最多50個字',
        (v) => !/^\s+|\s+$/.test(v) || '開頭與結尾不能有空格',
      ],
      topic: [
        '電影',
        '繪圖',
        '音樂',
        '書籍',
        '考試',
        '程式',
        '3C',
        '美食',
        '旅遊',
      ],
      issue: ['問題', '情報', '心得'],
    }
  },
  mounted() {
    console.log(' 觸發UserTextArea元件的mounted! ')
    this.articles.id = this.$store.getters.getUserInfo.id
  },
  methods: {
    currentTopic(val) {
      this.articles.topic = val
    },
    currentIssue(val) {
      this.articles.issue = val
    },
    submit() {
      const response = this.$api.postArticles(this.articles)
      console.log(response)
    },
  },
}
</script>

<style></style>
