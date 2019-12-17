'use strict';
const pug = require('pug');
const assert = require('assert');

// pug のテンプレートにおける XSS 脆弱性のテスト
const html = pug.renderFile('./views/posts.pug', {
  posts: [{
    id: 1,
    content: `<script>alert('test');</script>`,
    postedBy: 'guest1',
    trackingCookie: '8803241464207713_eb2436b81085d63f2686cc81c006f401ea8eacf3',
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  user: 'guest1'
});

// スクリプトタグがエスケープされて含まれていることをチェック
assert(html.includes(`&lt;script&gt;alert('test');&lt;/script&gt;`));
assert(html.includes('8803241464207713'));
assert(!html.includes('eb2436b81085d63f2686cc81c006f401ea8eacf3'));
console.log('テストが正常に完了しました');