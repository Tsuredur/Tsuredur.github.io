import { L } from '../i18n/index.js'

// Travel photos, one entry per country. The key is the lowercase ISO 3166-1 alpha-2
// code (jp, cn, th, kh, kr, ...). Every country listed here turns green on the map and
// becomes clickable.
//
// A photo is:  { src, thumb, ratio, date, title, text, video? }
//   src    full-size image (shown when you tap a photo)
//   thumb  small image (used for the floating tiles, so the page loads fast on phones)
//   ratio  width / height
//   title / text  shown under the enlarged photo; L('English', '中文', '日本語')
//   video  optional mp4 — `src` is then used as its poster frame
// Sizes and positions of the floating tiles are randomised (and stay the same per country).
const IMG = `${import.meta.env.BASE_URL}static/img/travel`

// ---- place names ----
const P = {
  "tengger": L("Tengger Desert", "腾格里沙漠", "テンゲリ砂漠"),
  "harbin": L("Harbin", "哈尔滨", "ハルビン"),
  "chongqing-chengdu": L("Chongqing & Chengdu", "重庆 · 成都", "重慶・成都"),
  "gz-sz-hk": L("Guangzhou, Shenzhen & Hong Kong", "广州 · 深圳 · 香港", "広州・深圳・香港"),
  "incheon": L("Incheon", "仁川", "仁川（インチョン）"),
  "bkk": L("Bangkok", "曼谷", "バンコク"),
  "pattaya": L("Pattaya", "芭提雅", "パタヤ"),
  "xisu": L("Xi'an International Studies University", "西安外国语大学", "西安外国語大学"),
  "xian-bell-tower": L("Xi'an Bell Tower", "西安钟楼", "西安鐘楼"),
  "japan": L("Japan", "日本", "日本"),
  "kumotori": L("Mt. Kumotori", "云取山", "雲取山"),
  "jaist-grad": L("JAIST Graduation", "JAIST 毕业", "JAIST 卒業"),
  "tonodake": L("Mt. Tonodake", "塔岳", "塔ノ岳"),
  "otake": L("Mt. Ōtake", "大岳山", "大岳山"),
  "fuji": L("Mt. Fuji", "富士山", "富士山"),
  "siemreap": L("Siem Reap · Angkor", "暹粒 · 吴哥窟", "シェムリアップ・アンコール"),
  "daibosatsu": L("Daibosatsu Ridge", "大菩萨岭", "大菩薩嶺"),
  "kentoku": L("Mt. Kentoku", "乾德山", "乾徳山"),
  "tanigawa": L("Mt. Tanigawa", "谷川岳", "谷川岳"),
  "chiangmai": L("Chiang Mai", "清迈", "チェンマイ"),
}

// ---- your notes (the translations are editable) ----
const S = {
  "incheon": L("I left the country during the pandemic to go and study abroad.\nStuck at Incheon Airport for 23 hours, with every shop closed.\nTo survive, I had no choice but to drink water from the restroom.\nIt was so hard.\nThe wet-behind-the-ears me, aged 22.", "为了去留学而在口罩时期出国\n滞留仁川机场23小时，没有店家开门\n为了活下去只能喝厕所的水\n太苦了\n22岁乳臭未干的我", "留学のため、コロナ禍に出国しました。\n仁川空港に23時間足止めされ、開いている店は一つもありませんでした。\n生き延びるために、トイレの水を飲むしかありませんでした。\n本当につらかった。\n22歳の、まだ青かった私。"),
  "kumotori": L("Mt. Kumotori, Tokyo's highest peak.\nMy first time backpacking solo: two days and one night.", "东京都最高峰，云取山。\n人生第一次重装，solo 2天1夜。", "東京都最高峰、雲取山。\n初めてのテント泊登山。ソロで2日間、1泊。"),
  "bkk-1": L("Mama noodles at the Chulalongkorn night market.", "在朱拉隆功夜市吃的妈妈面", "チュラーロンコーン夜市で食べたママー麺。"),
  "bkk-2": L("Wat Arun. I still vaguely remember how awe-inspiring it felt — you can even climb up to about halfway.\nTo get there you take a boat across the river from Wat Pho (the Reclining Buddha). I had a coconut there, and the vendor scraped out the flesh for me to eat too. Thank you so much.", "郑王庙，依稀记得给我的震撼感觉，也可以登上去到一半的位置。\n到郑王庙需要从卧佛的位置坐船渡河，我在那里吃了一个椰子，摊主还会将椰肉刮下来给我吃，非常感谢", "ワット・アルン。圧倒された感覚をぼんやり覚えています。途中の高さまで登ることもできます。\nワット・ポー（涅槃仏）のあたりから船で川を渡って向かいます。そこでココナッツを飲んだら、お店の人が果肉も削って食べさせてくれて、本当に感謝です。"),
  "bkk-3": L("The Grand Palace. I really like this style of Thai architecture, with white trim and golden roofs — it looks so clean.", "大皇宫，很喜欢泰国的这种白边黄顶的建筑，看起来很干净", "王宮。白い縁取りに金色の屋根というタイの建築が好きです。すっきりして見えます。"),
  "pattaya-1": L("On the left is passion fruit juice — delicious.\nI found a hair in this hotpot, so the restaurant gave me a brand-new one. I was stuffed to bursting...","左边是百香果果汁，很好喝\n就是这个火锅吃出了一根头发，然后店家给我换了一份新的火锅，撑死我了，，",  "左はパッションフルーツジュースで、とても美味しかったです。\nこの鍋に髪の毛が入っていて、お店が新しい鍋に替えてくれました。お腹がはち切れそうでした……"),
  "pattaya-2": L("Racing around Koh Larn on a motorbike. The sea was so blue, and in that moment I felt like the happiest person in the world. (It awakened my love of riding bikes on future trips.)", "在格兰岛骑摩托车狂飙中，海很蓝，那时候感觉自己是世界上最幸福的人，（激发了我以后旅游骑车的魂环", "ラン島でバイクを飛ばして。海が青くて、その瞬間は世界でいちばん幸せな人間だと思いました。（これをきっかけに、旅先でバイクに乗りたくなりました）"),
  "jaist-grad": L("I said goodbye to two deeply fulfilling years at JAIST. Thank you to my supervisor and my labmates.", "在JAIST送走了人生中极其满足的两年，感谢我的导师和研究室的同学们", "JAISTでの、人生でもとても満ち足りた2年間を見送りました。指導教員と研究室のみんなに感謝しています。"),
  "tonodake": L("My first mountain hike.", "第一次爬山", "初めての登山。"),
  "fuji": L("On Friday morning I suddenly felt like climbing a mountain.\nOn the train I looked on Xiaohongshu for people to team up with (a group of 3, needing 1 more).\nI left work at 5 pm, bought a headlamp at montbell, then went home to pack.\nI took the night bus from Shinjuku at 11 pm and waited at Kawaguchiko until 3 am for my teammates to wake up.\nI reached the 5th station at 4 am and the summit at 11 am.\nI was seriously dying — so sleepy.", "周五早上突发奇想想爬山\n在电车上找小红书的3=1组队\n17点下班去montbell买头灯，然后回家收拾装备\n晚上11点到新宿坐大巴，在河口湖等到3点等队友睡醒\n4点到5合目，11点登顶\n真的要死了（困死了）", "金曜の朝、ふと山に登りたくなりました。\n電車の中で、小紅書で一緒に登る仲間を探しました（3人パーティーであと1人）。\n17時に仕事を終えてmontbellでヘッドランプを買い、家に帰って装備をまとめました。\n夜11時に新宿から夜行バスに乗り、河口湖で3時まで仲間が起きるのを待ちました。\n4時に5合目に着き、11時に登頂。\n本当に死にそうでした（眠すぎて）。"),
  "siemreap-1": L("The sunrise at Angkor Wat is the most unforgettable moment of my life so far.\nBreathtakingly beautiful — beyond words.\nI love Angkor Wat.", "吴哥窟的日出，是我这辈子目前为止最难忘的一瞬\n美不胜收，用语言无法形容的美\n我爱吴哥窟", "アンコール・ワットの日の出は、これまでの人生でいちばん忘れられない瞬間です。\n言葉にできないほどの美しさでした。\nアンコール・ワットが大好きです。"),
  "siemreap-2": L( "Angkor Wat collection\nI love the people and the scenery of Siem Reap so much that I rode a motorbike myself all the way to the farthest sites, Banteay Srei and Beng Mealea (got a bit sunburned, haha).\nAs I write this note on 20 October 2026, I still have plenty of tan lines.\nI think of the kind guide (Kinkonn, I think?) and the waiters — such warm people.\nI feel I now know a little more about this world.\nThe world is so big, and I want to keep exploring it.", "吴哥窟合集\n我很爱暹粒的人和景，所以去最远的女王宫和崩密列也是摩托车自己开过去的（有些晒伤哈哈\n在写笔记的2026年10月20日，仍然有很多的变黑痕迹\n会想到亲切的导游（叫kinkonn吧）和服务生，热情的人民\n我想我对这个世界，又多知道了一些\n这个世界这么大，我想一直探索下去","アンコール・ワット まとめ\nシェムリアップの人も景色も大好きで、いちばん遠いバンテアイ・スレイやベンメリアもバイクで自分で走って行きました（ちょっと日焼けしました笑）。\nこのメモを書いている2026年10月20日になっても、日焼けの跡がたくさん残っています。\n親切だったガイドさん（キンコンさん、だったかな）やスタッフ、温かい人々を思い出します。\nこの世界のことを、また少し知れた気がします。\nこの世界はこんなに広い。ずっと探検し続けたい。"),
  "siemreap-video": L("This is a video.\nFilmed at 6 am inside the inner circle of Angkor Wat, on my second day in Siem Reap.\nSo peaceful, so beautiful.", "这是一个视频\n拍摄于吴哥窟内圈的早晨6点，也是我到暹粒的第二天\n太宁静太美丽了", "これは動画です。\nアンコール・ワットの内側で、朝6時に撮影しました。シェムリアップに着いて2日目のことです。\nとても静かで、とても美しい時間でした。"),
  "kentoku": L("The second time I have seen Mt. Fuji since I took up hiking. The weather in Kanto in 2026 really has been this bad.", "爬山后第二次见富士山，2026年关东的天气就是这么差", "登山を始めてから2度目の富士山。2026年の関東の天気は、本当にこんなものです。"),
  "chiangmai-1": L("I went to Chiang Mai's Sunday night market with Dodo, a friend from my lab who comes from Chiang Mai. The food was amazing — I loved it.", "我和研究室的朋友dodo（dodo出身于清迈），我们一起逛了清迈的周日夜市，非常好吃非常喜欢", "研究室の友人のdodo（チェンマイ出身）と、チェンマイのサンデーナイトマーケットを歩きました。どれも美味しくて、すっかり気に入りました。"),
  "chiangmai-2": L("Me at the elephant café.", "我在大象咖啡馆", "象カフェにて。"),
  "chiangmai-3": L("Chiang Mai food.", "清迈的美食", "チェンマイのグルメ。"),
  "chiangmai-4": L("A little creative-goods shop in Chiang Mai. In the end I bought the elephant in the photo — it is adorable and beautifully made.", "清迈的文创小店，我最后买了图中的大象，真的非常可爱十分精美", "チェンマイの雑貨店。結局、写真の象を買いました。とてもかわいくて、細工も素敵です。"),
  "chiangmai-5": L("The elephant at the elephant café (a baby one, actually) whimpered when it could not get the banana I was offering — so cute.", "大象咖啡馆的大象（其实是小象），会因为吃不到我给的香蕉嘤嘤叫，真的很可爱", "象カフェの象（実は子象）。私があげようとしたバナナが食べられなくて、くうくう鳴いていて、本当にかわいかったです。"),
  "chiangmai-6": L("The morning of my last day in Chiang Mai, packing my luggage at the “沙佩 (Sapae)” youth café.", "离开清迈的最后一天的早晨，我在沙佩青年咖啡馆整理的我的行李", "チェンマイを発つ最後の日の朝、「沙佩（Sapae）」のユースカフェで荷造りをしました。"),
  "chiangmai-7": L("Doi Suthep and the Twin Dragon Temple\nI found two travel buddies on Xiaohongshu and set off. We had planned to hike up, but it was so hot and muggy that we called a Grab halfway up, hahaha.\nTurns out everyone had quit their jobs to travel. That evening we went to Chiang Mai University and its night market together — such a lovely memory.", "素贴山和双龙寺\n在小红书找了两个搭子就出发了，本来说好是徒步的，但是太热太闷了，在半山腰叫grab了哈哈哈哈哈\n一问大家都是裸辞出来旅游的，晚上还一起去了清迈大学和清迈大学夜市，是很好很好的回忆", "ステープ山と双龍寺\n小紅書で旅仲間を二人見つけて出発しました。歩いて登る予定でしたが、暑くて蒸し暑くて、途中でGrabを呼びました（笑）\n聞けばみんな仕事を辞めて旅に出た人たちで、夜はチェンマイ大学とその夜市にも一緒に行きました。とても良い思い出です。"),
}

// photos of one folder: cc = country, slug = story key, place = P key
const g = (cc, slug, place, date, files) =>
  files.map(([name, ratio, video]) => ({
    src: `${IMG}/${cc}/${name}.jpg`,
    thumb: `${IMG}/${cc}/thumb/${name}.jpg`,
    ...(video ? { video: `${IMG}/${cc}/video/${name}.mp4` } : {}),
    ratio,
    date,
    title: P[place],
    text: S[slug]
  }))

export const travel = {
  jp: {
    photos: [
      ...g("jp", null, "japan", "", [["jp-other-1", 0.75], ["jp-other-2", 0.75], ["jp-other-3", 0.75], ["jp-other-4", 1.333]]),
      ...g("jp", "kumotori", "kumotori", "", [["kumotori-1", 1.333], ["kumotori-2", 1.333]]),
      ...g("jp", "jaist-grad", "jaist-grad", "2026.03", [["jaist-grad-1", 0.75], ["jaist-grad-2", 1.501], ["jaist-grad-3", 0.666], ["jaist-grad-4", 0.666]]),
      ...g("jp", "tonodake", "tonodake", "2026.05.02", [["tonodake-1", 1.333], ["tonodake-2", 1.333]]),
      ...g("jp", null, "otake", "2026.05.17", [["otake-1", 0.75]]),
      ...g("jp", "fuji", "fuji", "2026.07.04", [["fuji-1", 1.333], ["fuji-2", 0.562], ["fuji-3", 0.562]]),
      ...g("jp", null, "daibosatsu", "2026.09.13", [["daibosatsu-1", 0.75]]),
      ...g("jp", "kentoku", "kentoku", "2026.10.10", [["kentoku-1", 0.563], ["kentoku-2", 0.75], ["kentoku-3", 1.333], ["kentoku-4", 1.333], ["kentoku-5", 0.75], ["kentoku-6", 1.333]]),
      ...g("jp", null, "tanigawa", "2026.10.17", [["tanigawa-1", 1.333], ["tanigawa-2", 1.333], ["tanigawa-3", 0.75], ["tanigawa-4", 0.75]]),
    ]
  },
  th: {
    photos: [
      ...g("th", "bkk-1", "bkk", "2026.03", [["bkk-1-1", 0.75]]),
      ...g("th", "bkk-2", "bkk", "2026.03", [["bkk-2-1", 1.333]]),
      ...g("th", "bkk-3", "bkk", "2026.03", [["bkk-3-1", 1.333], ["bkk-3-2", 1.333]]),
      ...g("th", "pattaya-1", "pattaya", "2026.03", [["pattaya-1-1", 1.333]]),
      ...g("th", "pattaya-2", "pattaya", "2026.03", [["pattaya-2-1", 1.333], ["pattaya-2-2", 0.562], ["pattaya-2-3", 1.333]]),
      ...g("th", "chiangmai-1", "chiangmai", "2026.10", [["chiangmai-1-1", 0.75],["chiangmai-1-2", 1.333]]),
      ...g("th", "chiangmai-2", "chiangmai", "2026.10", [["chiangmai-2-1", 1.333]]),
      ...g("th", "chiangmai-3", "chiangmai", "2026.10", [["chiangmai-3-1", 1.333], ["chiangmai-3-2", 1.333], ["chiangmai-3-3", 1.333]]),
      ...g("th", "chiangmai-4", "chiangmai", "2026.10", [["chiangmai-4-1", 0.562]]),
      ...g("th", "chiangmai-5", "chiangmai", "2026.10", [["chiangmai-5-1", 1.333]]),
      ...g("th", "chiangmai-6", "chiangmai", "2026.10", [["chiangmai-6-1", 1.333]]),
      ...g("th", "chiangmai-7", "chiangmai", "2026.10", [["chiangmai-7-1", 1.333], ["chiangmai-7-2", 0.75], ["chiangmai-7-3", 0.965],["chiangmai-7-4", 0.965],["chiangmai-7-5", 1.333]]),
    ]
  },
  kh: {
    photos: [
      ...g("kh", "siemreap-1", "siemreap", "2026.09", [["siemreap-1-1", 0.562]]),
      ...g("kh", "siemreap-2", "siemreap", "2026.09", [["siemreap-2-1", 0.75], ["siemreap-2-2", 1.333], ["siemreap-2-3", 0.562], ["siemreap-2-4", 1.106], ["siemreap-2-5", 0.8], ["siemreap-2-6", 1.333], ["siemreap-2-7", 1.37], ["siemreap-2-8", 0.666], ["siemreap-2-9", 0.562], ["siemreap-2-10", 0.562], ["siemreap-2-11", 0.75], ["siemreap-2-12", 1.333], ["siemreap-2-13", 1.333],["siemreap-2-14", 1.333],["siemreap-2-15", 1.7],["siemreap-2-16", 1.75],["siemreap-2-17", 2],["siemreap-2-18", 1.333]]),
      ...g("kh", "siemreap-video", "siemreap", "2026.09", [["siemreap-video", 1.333, true]]),
    ]
  },
  cn: {
    photos: [
      ...g("cn", null, "xisu", "", [["xisu-1", 1], ["xisu-2", 0.75]]),
      ...g("cn", null, "xian-bell-tower", "", [["xian-bell-tower-1", 1.334]]),
      ...g("cn", null, "tengger", "2021.10", [["tengger-1", 1.332], ["tengger-2", 1.333]]),
      ...g("cn", null, "harbin", "2022.05", [["harbin-1", 1.333]]),
      ...g("cn", null, "chongqing-chengdu", "2024.02", [["chongqing-chengdu-1", 1.333], ["chongqing-chengdu-2", 1.333], ["chongqing-chengdu-3", 0.75]]),
      ...g("cn", null, "gz-sz-hk", "2026.09", [["gz-sz-hk-1", 0.75], ["gz-sz-hk-2", 1.333], ["gz-sz-hk-3", 0.576], ["gz-sz-hk-4", 0.908], ["gz-sz-hk-5", 0.575], ["gz-sz-hk-6", 1.333]]),
    ]
  },
  kr: {
    photos: [
      ...g("kr", "incheon", "incheon", "2022.05", [["incheon-1", 0.75]]),
    ]
  },
}
