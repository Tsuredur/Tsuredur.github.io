import { L } from '../i18n/index.js'

export const profile = {
  displayName: 'SUN Haoran',
  nameScripts: '孙浩然 · ソン コウゼン · 孫浩然',
  bio: L(
    'I was born in Xi’an, China, in 2001 and grew up there. I studied Japanese at Xi’an International Studies University from 2019. After passing JLPT N1 in 2021 (how did you know I scored 179?), I began independently studying programming, calculus, linear algebra, and other STEM subjects.\n\nI moved to Japan in 2022 and entered JAIST in 2024 to study topics related to natural language processing. After graduating in 2026, I started working in Yokohama, focusing on SQA, test development, CI/CD, and AI quality validation.\n\nI enjoy football, especially Juventus and the Italy national team, as well as hiking, traveling, and fitness. I’m curious about the world and dream of saving enough to travel around it. My near-term goals are to tour Southeast Asia, see the great animal migration in Africa, hike Nepal’s Annapurna Base Camp (ABC) route, and climb Mount Kilimanjaro.\n\nI’m open-minded about my career path and may leave my job to pursue a PhD after a few years.',
    '我2001年出生于中国西安，从小在西安长大。2019年进入西安外国语大学学习日语专业。2021年通过N1（你怎么知道我N1有179分）后开始自学编程、微积分、线性代数等理科内容。\n\n2022年来到日本，并于2024年进入JAIST研究自然语言处理相关课题。2026年毕业后，我现在在横滨工作，主要从事SQA、测试开发、CI/CD和AI品质验证。\n\n我喜欢踢足球，最喜欢的球队是尤文图斯和意大利队，也喜欢爬山、旅游和健身。我对这个世界充满好奇，梦想是攒够一笔钱后环游世界。短期目标是环游东南亚、去非洲看动物迁徙、徒步尼泊尔ABC环线，以及登顶乞力马扎罗山。\n\n我对职业发展保持开放态度，不排除几年后辞职读博。',
    '2001年に中国の西安で生まれ、幼い頃から西安で育ちました。2019年に西安外国語大学に入学し、日本語を専攻しました。2021年に日本語能力試験N1に合格（どうして179点だと分かったのですか？）し、プログラミング、微積分、線形代数などの理系分野を独学し始めました。\n\n2022年に来日し、2024年にJAISTに入学して自然言語処理に関する研究に取り組みました。2026年に卒業し、現在は横浜でSQA、テスト開発、CI/CD、AI品質検証などに携わっています。\n\nサッカーが好きで、特にユヴェントスとイタリア代表を応援しています。登山、旅行、フィットネスも好きです。世界に強い関心があり、十分な資金を貯めて世界中を旅することが夢です。近い目標は、東南アジアを周遊すること、アフリカで動物の大移動を見ること、ネパールのアンナプルナ・ベースキャンプ（ABC）ルートを歩くこと、そしてキリマンジャロに登頂することです。\n\nキャリアの可能性は広く考えており、数年後に退職して博士課程に進むことも視野に入れています。'
  ),
  roles: ['Frontend Developer', 'NLPer'],
  location: 'China · Shaanxi',
  affiliation: 'JAIST',
  avatar: '/static/img/travel/th/thumb/chiangmai-2-1.jpg',
  github: 'https://github.com/Tsuredur',
  email: 'magotsugeshikaru@gmail.com'
}

// category drives the timeline dot color:
// 'achievement' -> orange (recognition / results)
// 'milestone'   -> green  (education / life status change)
export const timeline = [
  { date: '2026.4', label: L('ACL 2026 Paper Accepted', 'ACL 2026 论文被接收', 'ACL 2026 論文採択'), category: 'achievement' },
  { date: '2026.3', label: L('I graduated from JAIST and started working in Japan', '从 JAIST 毕业，并在日本开始工作', 'JAISTを卒業し、日本で働き始めた'), category: 'milestone' },
  { date: '2024.4', label: L('Became a JAISTer', '成为 JAIST 学生', 'JAISTに入学'), category: 'milestone' },
  { date: '', label: '...', category: 'divider' },
  { date: '2022.4', label: L('Came to Japan', '来到日本', '来日'), category: 'milestone' },
  { date: '2021.6', label: L('JLPT N1', '通过 JLPT N1', 'JLPT N1 合格'), category: 'achievement' },
  { date: '2019.9', label: L('Became a XISUer', '成为 XISU 学生', 'XISUに入学'), category: 'milestone' },
  { date: '', label: '...', category: 'divider' },
  { date: '2001.3', label: L('I was born', '出生', '誕生'), category: 'milestone' }
]

export const researchTags = [
  L('Cognitive Science', '认知科学', '認知科学'),
  L('Computer Vision', '计算机视觉', 'コンピュータビジョン'),
  L('Natural Language Processing', '自然语言处理', '自然言語処理'),
  L('Natural Language Generation', '自然语言生成', '自然言語生成'),
  L('Representation Learning', '表示学习', '表現学習'),
  L('AI for Sports', '体育领域 AI', 'スポーツAI'),
  L('Multimodal Models', '多模态模型', 'マルチモーダルモデル')
]

export const techTags = [
  'LLM',
  'vLLM',
  'LLM Fine-tuning',
  'In-Context Learning',
  'Python',
  'PyTorch',
  'JavaScript',
  'Vue.js',
  'CI/CD',
  'SQA',
  'Automated Testing'
]

export const languages = [
  L('Chinese (Native)', '中文（母语）', '中国語（母語）'),
  L('Japanese (Business)', '日本語（商务）', '日本語（ビジネス）'),
  L('English (Everyday & Academic Communication)', 'English（日常・学术交流）', '英語（日常・学術交流）'),
  L('한국어（TV를 보며 어깨너머로 배워 간단한 단어 정도는 쓸 수 있어요）', '한국어（TV를 보며 어깨너머로 배워 간단한 단어 정도는 쓸 수 있어요）', '한국어（TV를 보며 어깨너머로 배워 간단한 단어 정도는 쓸 수 있어요）')
]

// icon: one of 'football' | 'fitness' | 'mountain' | 'hiking' | 'language' | 'exchange' | 'travel'
// label: L(en, zh, ja)
export const hobbies = [
  { label: L('Football (Juventus and Italy fan)', '足球（尤文图斯和意大利队球迷）', 'サッカー（ユヴェントスとイタリア代表のファン）'), icon: 'football' },
  { label: L('Fitness', '健身', 'フィットネス'), icon: 'fitness' },
  { label: L('Mountaineering', '登山', '登山'), icon: 'mountain' },
  { label: L('Hiking', '徒步', 'ハイキング'), icon: 'hiking' },
  { label: L('Language Learning', '语言学习', '語学学習'), icon: 'language' },
  { label: L('Cross-cultural Exchange', '跨文化交流', '異文化交流'), icon: 'exchange' },
  { label: L('Travel', '旅行', '旅行'), icon: 'travel' }
]

export const publications = [
  {
    authors: 'Sun, Haoran, Natthawut Kertkeidkachorn, and Kiyoaki Shirai.',
    title: 'Visual and Memory–Augmented Soccer Commentary Generation.',
    venue: 'Proceedings of the 64th Annual Meeting of the Association for Computational Linguistics (ACL 2026)',
    year: '2026',
    pdf: 'https://aclanthology.org/2026.acl-long.485.pdf',
    code: 'https://github.com/JAIST-KnOWLab/Augmented_Soccer'
  },
  {
    authors: 'Masaaki Shimada, Yoshiyuki Matsuzaki, Haruna Miyamoto, Kouhei Narumi, Sun Haoran, Yao Wenbo, and Yo Nakawake.',
    title: "Quantitative Analysis of Character 'Cuteness' in Modern Manga.",
    venue: 'The 42nd Annual Meeting of the Japanese Cognitive Science Society (JCSS 2025)',
    year: '2025',
    pdf: 'https://www.jcss.gr.jp/meetings/jcss2025/proceedings/pdf/JCSS2025_P3-34.pdf'
  }
]

export const projects = [
  {
    slug: 'mandarin-speech-envelope',
    title: 'Investigation of Temporal Amplitude Envelope Information in Mandarin Speech',
    tags: [L('Internship', '实习', 'インターン')],
    href: '/project/mandarin-speech-envelope',
    external: false
  },
  {
    slug: 'makefile-generator',
    title: L('Automatic Makefile Generation for Large-Scale Projects', '大规模项目的makefile自动生成', '大規模プロジェクト向けMakefile自動生成'),
    tags: [L('Work', '工作', '仕事')]
  }
]

export const affiliations = [
  { title: 'JAIST NLP Lab', subtitle: 'NLP Lab', href: 'https://www.jaist.ac.jp/nlp/lab/' },
  { title: 'JAIST KnOWLab', subtitle: 'KnOWLab', href: 'https://sites.google.com/view/knowlab-jaist/home' }
]
