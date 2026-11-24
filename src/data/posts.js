import { L } from '../i18n/index.js'

// Any text can be a plain string, or L('English', '中文', '日本語') to be translated.
export const posts = [
  {
    slug: 'siem-reap-warm-invitations',
    title: L('What I Love Most About Siem Reap', '我最喜欢暹粒的一点', 'シェムリアップのいちばん好きなところ'),
    date: '2026.10.31',
    category: 'travel',
    tags: [L('Travel', '旅行', '旅行'), L('Siem Reap', '暹粒', 'シェムリアップ')],
    excerpt: L(
      'The unforgettable wonder of Angkor Wat, and the warmth of the people who welcomed me in Siem Reap.',
      '吴哥窟带来的震撼，以及暹粒人淳朴热情的邀约。',
      'アンコール・ワットの忘れられない感動と、シェムリアップの人々の温かな誘い。'
    ),
    blocks: [
      {
        type: 'paragraph',
        text: L(
          'I will never forget the awe I felt when visiting Angkor Wat. But beyond that awe, I was also moved by something else: the way the local women invited visitors into their shops and restaurants.',
          '我永远忘不了去玩吴哥窟时的震撼。但除了震撼，还有一些感动：她们的拉客。',
          'アンコール・ワットを訪れたときの感動は、いつまでも忘れられません。でも、圧倒されたことだけでなく、心を動かされたこともありました。それは、彼女たちの客引きです。'
        )
      },
      {
        type: 'paragraph',
        text: L(
          'In Siem Reap, their invitations felt sincere and unassuming. They would warmly ask you to park your motorbike a little closer to their shop, then gently invite you in for a meal. If you declined, they would not insist. Instead, they would simply ask you to keep them in mind after visiting the temples—if you felt tired or thirsty, perhaps you might stop by their place.',
          '暹粒人拉客十分淳朴。她们会热情地邀请你把摩托车停在离店面近一些的地方，然后小心翼翼地邀请你去吃饭。如果你选择拒绝，她们也不会过多纠缠，而是请求你逛完景点后，如果有些累了、渴了，可否优先考虑她们家。',
          'シェムリアップの人々の客引きはとても素朴です。バイクをお店の近くに停めてもらえませんかと温かく声をかけ、食事をしませんかと控えめに誘ってくれます。断っても、しつこく勧誘することはありません。観光を終えて疲れたり喉が渇いたりしたら、よかったら自分たちのお店を思い出してほしい、とお願いするだけです。'
        )
      },
      {
        type: 'paragraph',
        text: L(
          'Their way of welcoming people left a deep impression on me and made me feel especially fond of Siem Reap. Angkor Wat is also a place whose beauty cannot be replaced by anywhere else in the world. I hope to return one day.',
          '这种拉客方式让我印象深刻，也让我对暹粒抱有极大的好感。同时，吴哥窟的景色也是世界上难以替代的。我想有一天会再去一次。',
          '彼女たちの迎え方は心に深く残り、シェムリアップをとても好きになりました。そして、アンコール・ワットの景色もまた、世界のどこにも代えがたいものです。いつかもう一度訪れたいと思います。'
        )
      }
    ]
  }
]
