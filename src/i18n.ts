import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "experiments": "Experiments",
        "about": "About",
        "creators": "Creators"
      },
      "home": {
        "title": "EduLab 3D",
        "subtitle": "Interactive 3D Science Experiments",
        "description": "Explore physics, chemistry, and biology through immersive 3D simulations directly in your browser.",
        "start_experiment": "Start Experiment",
        "view_all": "View All Experiments",
        "learn_more": "Learn More",
        "welcome": "Welcome aboard"
      },
      "experiments": {
        "state-changes": {
          "title": "Water State Changes",
          "summary": "Dial temperature and pressure to observe water shifting between ice, liquid, and vapor in real time."
        },
        "boyles-law": {
          "title": "Boyle's Law Piston",
          "summary": "Compress or expand a virtual syringe to see the inverse relationship between pressure and volume."
        },
        "planet-orbits": {
          "title": "Planet Orbit Sandbox",
          "summary": "Drag planets to adjust orbital radius and watch how period and velocity respond in real time."
        },
        "pendulum-playground": {
          "title": "Pendulum Playground",
          "summary": "Set length and mass to explore how a pendulum’s period changes and compare runs side by side."
        },
        "refraction-lab": {
          "title": "Light Refraction Tank",
          "summary": "Swap materials in a shallow tank to visualize how indices of refraction bend a laser beam."
        },
        "circuits-mini": {
          "title": "Mini Circuit Builder",
          "summary": "Snap in batteries, bulbs, and switches to build simple series or parallel circuits with live current readouts."
        },
        "plate-tectonics": {
          "title": "Plate Tectonics Slider",
          "summary": "Slide continental plates toward, past, or away from each other to see ridges, trenches, and quakes form."
        }
      },
      "common": {
        "level": "Level",
        "duration": "Duration",
        "focus": "Focus",
        "tags": "Tags",
        "beginner": "Beginner",
        "intermediate": "Intermediate",
        "advanced": "Advanced"
      },
      "experiments_page": {
        "eyebrow": "Live catalogue",
        "title": "Experiments built for curious classrooms.",
        "lede": "Filter by level, subject focus, or concept to find the perfect starting point. Every simulation includes pacing tips, printable lab notes, and built-in assessment moments.",
        "search_label": "Search experiments",
        "search_placeholder": "Try “Boyle’s law” or “plasma”",
        "matches": "matches",
        "empty": "No experiments match that search yet. Try another term or focus area.",
        "launch": "Launch simulation"
      },
      "browser_menu": {
        "about": {
          "label": "About",
          "tagline": "Mission, story, and the humans building EduLab3D.",
          "what_is": "What is EduLab3D?",
          "what_is_desc": "Why we exist and how the lab works.",
          "creators": "Creators",
          "creators_desc": "Meet the students behind the experiments."
        },
        "experiments": {
          "label": "Experiments",
          "tagline": "Curated simulations grouped by difficulty and topic.",
          "by_level": "By level",
          "by_level_desc": "Pick Beginner, Intermediate, or Advanced.",
          "all": "All experiments",
          "all_desc": "Browse the full catalogue at once."
        },
        "contact": {
          "label": "Contact",
          "tagline": "Get help, share feedback, or contribute.",
          "email": "Email support"
        }
      },
      "about_page": {
        "eyebrow": "About Us",
        "title": "Empowering the next generation of scientists.",
        "lede": "EduLab3D is an open-source initiative built by students, for students. Our mission is to make high-quality science education accessible to everyone, anywhere, through interactive 3D simulations.",
        "story_title": "Our Story",
        "story_p1": "It started with a simple question: \"Why are science labs so expensive?\" We realized that many schools lack the resources to provide hands-on experiments for their students. By leveraging modern web technologies, we can bring the lab to the browser, free of charge.",
        "story_p2": "What began as a small hackathon project has grown into a platform used by classrooms around the world. We believe that visual learning is key to understanding complex scientific concepts.",
        "involved_title": "Get Involved",
        "involved_p": "We are always looking for contributors! Whether you are a developer, designer, or teacher, there is a place for you in our community.",
        "contact_us": "Contact Us"
      },
      "creators_page": {
        "eyebrow": "The Team",
        "title": "Meet the minds behind the lab.",
        "lede": "EduLab3D is brought to you by passionate developers dedicated to making science education accessible and engaging.",
        "devlog": {
          "role": "UI Developer",
          "desc": "Crafting the visual experience and interface. Dedicated to making the lab intuitive, responsive, and beautiful for every student."
        },
        "discord": "Discord"
      },
      "not_found": {
        "title": "404",
        "subtitle": "Lost in the void?",
        "desc": "The experiment you are looking for has drifted into a black hole.",
        "back_home": "Return to Safety"
      }
    }
  },
  ko: {
    translation: {
      "nav": {
        "experiments": "실험",
        "about": "소개",
        "creators": "제작자"
      },
      "home": {
        "title": "EduLab3D",
        "subtitle": "인터랙티브 3D 과학 실험",
        "description": "브라우저에서 직접 몰입형 3D 시뮬레이션을 통해 여러 실험을 직접 해보세요.",
        "start_experiment": "실험 시작하기",
        "view_all": "모든 실험 보기",
        "learn_more": "더 알아보기",
        "welcome": "탑승을 환영합니다."
      },
      "experiments": {
        "state-changes": {
          "title": "물의 상태 변화",
          "summary": "온도와 압력을 조절하여 물이 얼음, 액체, 수증기 사이에서 실시간으로 변화하는 것을 관찰하세요."
        },
        "boyles-law": {
          "title": "보일의 법칙 피스톤",
          "summary": "가상 주사기를 압축하거나 확장하여 압력과 부피 사이의 반비례 관계를 확인하세요."
        },
        "planet-orbits": {
          "title": "행성 궤도 샌드박스",
          "summary": "행성을 드래그하여 궤도 반지름을 조정하고 주기와 속도가 실시간으로 어떻게 반응하는지 지켜보세요."
        },
        "pendulum-playground": {
          "title": "진자 놀이터",
          "summary": "길이와 질량을 설정하여 진자의 주기가 어떻게 변하는지 탐구하고 실행 결과를 나란히 비교해보세요."
        },
        "refraction-lab": {
          "title": "빛 굴절 탱크",
          "summary": "얕은 탱크의 재료를 바꿔가며 굴절률이 레이저 빔을 어떻게 굽히는지 시각화하세요."
        },
        "circuits-mini": {
          "title": "미니 회로 빌더",
          "summary": "배터리, 전구, 스위치를 연결하여 실시간 전류 판독값이 있는 간단한 직렬 또는 병렬 회로를 만드세요."
        },
        "plate-tectonics": {
          "title": "판 구조론 슬라이더",
          "summary": "대륙판을 서로 향하게, 스치게, 또는 멀어지게 밀어 해령, 해구, 지진이 형성되는 것을 확인하세요."
        }
      },
      "common": {
        "level": "난이도",
        "duration": "소요 시간",
        "focus": "주제",
        "tags": "태그",
        "beginner": "초급",
        "intermediate": "중급",
        "advanced": "고급"
      },
      "experiments_page": {
        "eyebrow": "라이브 카탈로그",
        "title": "호기심 많은 학교를 위한 실험.",
        "lede": "난이도, 주제, 개념별로 필터링하여 완벽한 시작점을 찾으세요. 모든 시뮬레이션에는 페이싱 팁, 인쇄 가능한 실험 노트, 내장된 평가 순간이 포함되어 있습니다.",
        "search_label": "실험 검색",
        "search_placeholder": "“보일의 법칙” 또는 “플라즈마”를 검색해보세요.",
        "matches": "개 일치",
        "empty": "검색 결과가 없습니다. 다른 용어나 주제로 검색해보세요.",
        "launch": "실험 시작"
      },
      "browser_menu": {
        "about": {
          "label": "소개",
          "tagline": "목표, 이야기, 그리고 EduLab3D를 만드는 사람들.",
          "what_is": "EduLab3D란?",
          "what_is_desc": "우리의 존재 이유와 연구실 운영 방식.",
          "creators": "제작자",
          "creators_desc": "실험 뒤에 있는 학생들을 만나보세요."
        },
        "experiments": {
          "label": "실험",
          "tagline": "난이도와 주제별로 정리된 시뮬레이션.",
          "by_level": "난이도별",
          "by_level_desc": "초급, 중급, 고급 중 선택하세요.",
          "all": "모든 실험",
          "all_desc": "전체 카탈로그를 한 번에 둘러보세요."
        },
        "contact": {
          "label": "문의",
          "tagline": "도움을 받거나, 피드백을 공유하거나, 기여하세요.",
          "email": "이메일 지원"
        }
      },
      "about_page": {
        "eyebrow": "팀 소개",
        "title": "차세대 과학자들에게 힘을 실어줍니다.",
        "lede": "EduLab3D는 학생들에 의해, 학생들을 위해 만들어진 오픈 소스 이니셔티브입니다. 우리의 미션은 인터랙티브 3D 시뮬레이션을 통해 누구나, 어디서나 고품질의 과학 교육을 접할 수 있게 하는 것입니다.",
        "story_title": "우리의 이야기",
        "story_p1": "간단한 질문에서 시작되었습니다: \"왜 과학 실험실은 그렇게 비쌀까?\" 우리는 많은 학교들이 학생들에게 실습 실험을 제공할 자원이 부족하다는 것을 깨달았습니다. 현대 웹 기술을 활용하여 우리는 비용 없이 실험실을 브라우저로 가져올 수 있습니다.",
        "story_p2": "작은 학교 프로젝트에서 시작된 것이 이 곳까지 오게 되었습니다. 우리는 시각적 학습이 복잡한 과학 개념을 이해하는 데 핵심이라고 믿습니다.",
        "involved_title": "참여하기",
        "involved_p": "우리는 항상 기여자를 찾고 있습니다! 개발자, 디자이너, 교사 등 누구에게나 우리 커뮤니티에 자리가 있습니다.",
        "contact_us": "문의하기"
      },
      "creators_page": {
        "eyebrow": "팀 소개",
        "title": "연구실 뒤의 주역들을 만나보세요.",
        "lede": "EduLab3D는 과학 교육을 접근하기 쉽고 흥미롭게 만들기 위해 헌신하는 열정적인 개발자들이 제공합니다.",
        "devlog": {
          "role": "UI 개발자",
          "desc": "시각적 경험과 인터페이스를 제작합니다. 모든 학생에게 직관적이고 반응이 빠르며 아름다운 연구실을 만드는 데 전념합니다."
        },
        "discord": "디스코드"
      },
      "not_found": {
        "title": "404",
        "subtitle": "공허 속에서 길을 잃으셨나요?",
        "desc": "찾으시는 페이지가 블랙홀로 빨려 들어갔습니다.",
        "back_home": "안전한 곳으로 돌아가기"
      }
    }
  },
  ja: {
    translation: {
      "nav": {
        "experiments": "実験",
        "about": "概要",
        "creators": "クリエイター"
      },
      "home": {
        "title": "EduLab 3D",
        "subtitle": "インタラクティブな3D科学実験",
        "description": "ブラウザで直接、没入型の3Dシミュレーションを通じて物理学、化学、生物学を探求しましょう。",
        "start_experiment": "実験を始める",
        "view_all": "すべての実験を見る",
        "learn_more": "詳細",
        "welcome": "ようこそ"
      },
      "experiments": {
        "state-changes": {
          "title": "水の相転移",
          "summary": "温度と圧力を調整して、水が氷、液体、水蒸気の間でリアルタイムに変化する様子を観察します。"
        },
        "boyles-law": {
          "title": "ボイルの法則ピストン",
          "summary": "仮想シリンジを圧縮または拡張して、圧力と体積の反比例関係を確認します。"
        },
        "planet-orbits": {
          "title": "惑星軌道サンドボックス",
          "summary": "惑星をドラッグして軌道半径を調整し、周期と速度がリアルタイムでどのように反応するかを観察します。"
        },
        "pendulum-playground": {
          "title": "振り子遊び場",
          "summary": "長さと質量を設定して、振り子の周期がどのように変化するかを探求し、実行結果を並べて比較します。"
        },
        "refraction-lab": {
          "title": "光の屈折タンク",
          "summary": "浅いタンクの材料を交換して、屈折率がレーザービームをどのように曲げるかを視覚化します。"
        },
        "circuits-mini": {
          "title": "ミニ回路ビルダー",
          "summary": "バッテリー、電球、スイッチを接続して、リアルタイムの電流読み取り値を持つ単純な直列または並列回路を作成します。"
        },
        "plate-tectonics": {
          "title": "プレートテクトニクススライダー",
          "summary": "大陸プレートを互いに向かわせたり、すれ違わせたり、遠ざけたりして、海嶺、海溝、地震が形成される様子を確認します。"
        }
      },
      "common": {
        "level": "レベル",
        "duration": "所要時間",
        "focus": "トピック",
        "tags": "タグ",
        "beginner": "初級",
        "intermediate": "中級",
        "advanced": "上級"
      },
      "experiments_page": {
        "eyebrow": "ライブカタログ",
        "title": "好奇心旺盛な教室のための実験。",
        "lede": "レベル、トピック、概念でフィルタリングして、完璧な出発点を見つけましょう。すべてのシミュレーションには、ペース配分のヒント、印刷可能な実験ノート、組み込みの評価の瞬間が含まれています。",
        "search_label": "実験を検索",
        "search_placeholder": "「ボイルの法則」や「プラズマ」を検索",
        "matches": "件一致",
        "empty": "検索結果がありません。別の用語やトピックで検索してみてください。",
        "launch": "シミュレーション開始"
      },
      "browser_menu": {
        "about": {
          "label": "概要",
          "tagline": "ミッション、ストーリー、そしてEduLab3Dを作る人々。",
          "what_is": "EduLab3Dとは？",
          "what_is_desc": "私たちの存在理由とラボの運営方法。",
          "creators": "クリエイター",
          "creators_desc": "実験の背後にいる学生たちに会いましょう。"
        },
        "experiments": {
          "label": "実験",
          "tagline": "難易度とトピック別に整理されたシミュレーション。",
          "by_level": "レベル別",
          "by_level_desc": "初級、中級、上級から選択してください。",
          "all": "すべての実験",
          "all_desc": "カタログ全体を一度に閲覧します。"
        },
        "contact": {
          "label": "お問い合わせ",
          "tagline": "助けを求めたり、フィードバックを共有したり、貢献したりします。",
          "email": "メールサポート"
        }
      },
      "about_page": {
        "eyebrow": "私たちについて",
        "title": "次世代の科学者に力を。",
        "lede": "EduLab3Dは、学生によって、学生のために作られたオープンソースのイニシアチブです。私たちの使命は、インタラクティブな3Dシミュレーションを通じて、誰でも、どこでも、高品質な科学教育にアクセスできるようにすることです。",
        "story_title": "私たちのストーリー",
        "story_p1": "それは単純な疑問から始まりました。「なぜ科学実験室はそんなに高価なのか？」私たちは、多くの学校が学生に実践的な実験を提供するリソースが不足していることに気づきました。現代のウェブ技術を活用することで、費用をかけずにラボをブラウザに持ち込むことができます。",
        "story_p2": "小さなハッカソンプロジェクトとして始まったものが、今では世界中の教室で使用されるプラットフォームに成長しました。私たちは、視覚的な学習が複雑な科学的概念を理解するための鍵であると信じています。",
        "involved_title": "参加する",
        "involved_p": "私たちは常に貢献者を探しています！開発者、デザイナー、教師など、誰にでも私たちのコミュニティに場所があります。",
        "contact_us": "お問い合わせ"
      },
      "creators_page": {
        "eyebrow": "チーム",
        "title": "ラボの背後にいる心に会う。",
        "lede": "EduLab3Dは、科学教育をアクセスしやすく魅力的なものにすることに専念する情熱的な開発者によって提供されています。",
        "devlog": {
          "role": "UI開発者",
          "desc": "視覚的な体験とインターフェースを作成します。すべての学生にとって直感的で、反応が良く、美しいラボを作ることに専念しています。"
        },
        "discord": "Discord"
      },
      "not_found": {
        "title": "404",
        "subtitle": "虚空で迷子になりましたか？",
        "desc": "お探しの実験はブラックホールに吸い込まれました。",
        "back_home": "安全な場所に戻る"
      }
    }
  },
  zh: {
    translation: {
      "nav": {
        "experiments": "实验",
        "about": "关于",
        "creators": "创作者"
      },
      "home": {
        "title": "EduLab 3D",
        "subtitle": "交互式3D科学实验",
        "description": "直接在浏览器中通过沉浸式3D模拟探索物理、化学和生物学。",
        "start_experiment": "开始实验",
        "view_all": "查看所有实验",
        "learn_more": "了解更多",
        "welcome": "欢迎登船"
      },
      "experiments": {
        "state-changes": {
          "title": "水的三态变化",
          "summary": "调节温度和压力，实时观察水在冰、液体和蒸汽之间的变化。"
        },
        "boyles-law": {
          "title": "波义耳定律活塞",
          "summary": "压缩或扩展虚拟注射器，观察压力和体积之间的反比关系。"
        },
        "planet-orbits": {
          "title": "行星轨道沙盒",
          "summary": "拖动行星调整轨道半径，实时观察周期和速度如何响应。"
        },
        "pendulum-playground": {
          "title": "摆锤游乐场",
          "summary": "设置长度和质量，探索摆锤周期的变化，并并排比较运行结果。"
        },
        "refraction-lab": {
          "title": "光折射水槽",
          "summary": "在浅水槽中更换材料，可视化折射率如何弯曲激光束。"
        },
        "circuits-mini": {
          "title": "迷你电路构建器",
          "summary": "连接电池、灯泡和开关，构建具有实时电流读数的简单串联或并联电路。"
        },
        "plate-tectonics": {
          "title": "板块构造滑块",
          "summary": "滑动大陆板块使其相互靠近、擦过或远离，观察海脊、海沟和地震的形成。"
        }
      },
      "common": {
        "level": "难度",
        "duration": "时长",
        "focus": "主题",
        "tags": "标签",
        "beginner": "初级",
        "intermediate": "中级",
        "advanced": "高级"
      },
      "experiments_page": {
        "eyebrow": "实时目录",
        "title": "为充满好奇心的课堂打造的实验。",
        "lede": "按难度、主题或概念筛选，找到完美的起点。每个模拟都包含进度提示、可打印的实验笔记和内置的评估时刻。",
        "search_label": "搜索实验",
        "search_placeholder": "尝试搜索“波义耳定律”或“等离子体”",
        "matches": "个匹配",
        "empty": "暂无匹配的实验。尝试其他术语或主题。",
        "launch": "启动模拟"
      },
      "browser_menu": {
        "about": {
          "label": "关于",
          "tagline": "使命、故事以及构建EduLab3D的人们。",
          "what_is": "什么是EduLab3D？",
          "what_is_desc": "我们存在的原因以及实验室的运作方式。",
          "creators": "创作者",
          "creators_desc": "认识实验背后的学生们。"
        },
        "experiments": {
          "label": "实验",
          "tagline": "按难度和主题分组的精选模拟。",
          "by_level": "按难度",
          "by_level_desc": "选择初级、中级或高级。",
          "all": "所有实验",
          "all_desc": "一次浏览完整目录。"
        },
        "contact": {
          "label": "联系",
          "tagline": "获取帮助、分享反馈或做出贡献。",
          "email": "邮件支持"
        }
      },
      "about_page": {
        "eyebrow": "关于我们",
        "title": "赋能下一代科学家。",
        "lede": "EduLab3D是一个由学生建立、为学生服务的开源计划。我们的使命是通过交互式3D模拟，让任何人、在任何地方都能获得高质量的科学教育。",
        "story_title": "我们的故事",
        "story_p1": "一切始于一个简单的问题：“为什么科学实验室这么贵？”我们意识到许多学校缺乏为学生提供动手实验的资源。利用现代网络技术，我们可以免费将实验室带到浏览器中。",
        "story_p2": "最初的一个小型黑客马拉松项目现已发展成为世界各地课堂使用的平台。我们相信视觉学习是理解复杂科学概念的关键。",
        "involved_title": "参与其中",
        "involved_p": "我们一直在寻找贡献者！无论您是开发人员、设计师还是教师，我们的社区都有您的位置。",
        "contact_us": "联系我们"
      },
      "creators_page": {
        "eyebrow": "团队",
        "title": "认识实验室背后的头脑。",
        "lede": "EduLab3D由致力于让科学教育变得易于获取和引人入胜的热情开发人员为您呈现。",
        "devlog": {
          "role": "UI开发人员",
          "desc": "打造视觉体验和界面。致力于为每位学生制作直观、响应迅速且美观的实验室。"
        },
        "discord": "Discord"
      },
      "not_found": {
        "title": "404",
        "subtitle": "迷失在虚空中？",
        "desc": "您寻找的实验已飘入黑洞。",
        "back_home": "返回安全地带"
      }
    }
  },
  es: {
    translation: {
      "nav": {
        "experiments": "Experimentos",
        "about": "Acerca de",
        "creators": "Creadores"
      },
      "home": {
        "title": "EduLab 3D",
        "subtitle": "Experimentos de Ciencia 3D Interactivos",
        "description": "Explora física, química y biología a través de simulaciones 3D inmersivas directamente en tu navegador.",
        "start_experiment": "Iniciar Experimento",
        "view_all": "Ver Todos los Experimentos",
        "learn_more": "Saber Más",
        "welcome": "Bienvenido a bordo"
      },
      "experiments": {
        "state-changes": {
          "title": "Cambios de Estado del Agua",
          "summary": "Ajusta la temperatura y la presión para observar cómo el agua cambia entre hielo, líquido y vapor en tiempo real."
        },
        "boyles-law": {
          "title": "Pistón de la Ley de Boyle",
          "summary": "Comprime o expande una jeringa virtual para ver la relación inversa entre presión y volumen."
        },
        "planet-orbits": {
          "title": "Caja de Arena de Órbitas Planetarias",
          "summary": "Arrastra planetas para ajustar el radio orbital y observa cómo responden el período y la velocidad en tiempo real."
        },
        "pendulum-playground": {
          "title": "Patio de Péndulos",
          "summary": "Establece la longitud y la masa para explorar cómo cambia el período de un péndulo y compara ejecuciones lado a lado."
        },
        "refraction-lab": {
          "title": "Tanque de Refracción de Luz",
          "summary": "Intercambia materiales en un tanque poco profundo para visualizar cómo los índices de refracción doblan un rayo láser."
        },
        "circuits-mini": {
          "title": "Mini Constructor de Circuitos",
          "summary": "Conecta baterías, bombillas e interruptores para construir circuitos simples en serie o paralelo con lecturas de corriente en vivo."
        },
        "plate-tectonics": {
          "title": "Deslizador de Tectónica de Placas",
          "summary": "Desliza placas continentales una hacia la otra, rozándolas o alejándolas para ver formarse crestas, trincheras y terremotos."
        }
      },
      "common": {
        "level": "Nivel",
        "duration": "Duración",
        "focus": "Enfoque",
        "tags": "Etiquetas",
        "beginner": "Principiante",
        "intermediate": "Intermedio",
        "advanced": "Avanzado"
      },
      "experiments_page": {
        "eyebrow": "Catálogo en vivo",
        "title": "Experimentos creados para aulas curiosas.",
        "lede": "Filtra por nivel, enfoque temático o concepto para encontrar el punto de partida perfecto. Cada simulación incluye consejos de ritmo, notas de laboratorio imprimibles y momentos de evaluación integrados.",
        "search_label": "Buscar experimentos",
        "search_placeholder": "Prueba “Ley de Boyle” o “plasma”",
        "matches": "coincidencias",
        "empty": "Ningún experimento coincide con esa búsqueda todavía. Prueba con otro término o área de enfoque.",
        "launch": "Lanzar simulación"
      },
      "browser_menu": {
        "about": {
          "label": "Acerca de",
          "tagline": "Misión, historia y los humanos construyendo EduLab3D.",
          "what_is": "¿Qué es EduLab3D?",
          "what_is_desc": "Por qué existimos y cómo funciona el laboratorio.",
          "creators": "Creadores",
          "creators_desc": "Conoce a los estudiantes detrás de los experimentos."
        },
        "experiments": {
          "label": "Experimentos",
          "tagline": "Simulaciones seleccionadas agrupadas por dificultad y tema.",
          "by_level": "Por nivel",
          "by_level_desc": "Elige Principiante, Intermedio o Avanzado.",
          "all": "Todos los experimentos",
          "all_desc": "Explora el catálogo completo de una vez."
        },
        "contact": {
          "label": "Contacto",
          "tagline": "Obtén ayuda, comparte comentarios o contribuye.",
          "email": "Soporte por correo"
        }
      },
      "about_page": {
        "eyebrow": "Sobre Nosotros",
        "title": "Empoderando a la próxima generación de científicos.",
        "lede": "EduLab3D es una iniciativa de código abierto construida por estudiantes, para estudiantes. Nuestra misión es hacer que la educación científica de alta calidad sea accesible para todos, en cualquier lugar, a través de simulaciones 3D interactivas.",
        "story_title": "Nuestra Historia",
        "story_p1": "Comenzó con una pregunta simple: \"¿Por qué son tan caros los laboratorios de ciencias?\" Nos dimos cuenta de que muchas escuelas carecen de los recursos para proporcionar experimentos prácticos a sus estudiantes. Aprovechando las tecnologías web modernas, podemos llevar el laboratorio al navegador, de forma gratuita.",
        "story_p2": "Lo que comenzó como un pequeño proyecto de hackathon se ha convertido en una plataforma utilizada por aulas de todo el mundo. Creemos que el aprendizaje visual es clave para comprender conceptos científicos complejos.",
        "involved_title": "Involúcrate",
        "involved_p": "¡Siempre estamos buscando colaboradores! Ya seas desarrollador, diseñador o maestro, hay un lugar para ti en nuestra comunidad.",
        "contact_us": "Contáctanos"
      },
      "creators_page": {
        "eyebrow": "El Equipo",
        "title": "Conoce a las mentes detrás del laboratorio.",
        "lede": "EduLab3D es presentado por desarrolladores apasionados dedicados a hacer que la educación científica sea accesible y atractiva.",
        "devlog": {
          "role": "Desarrollador UI",
          "desc": "Creando la experiencia visual y la interfaz. Dedicado a hacer que el laboratorio sea intuitivo, receptivo y hermoso para cada estudiante."
        },
        "discord": "Discord"
      },
      "not_found": {
        "title": "404",
        "subtitle": "¿Perdido en el vacío?",
        "desc": "El experimento que buscas ha drifted hacia un agujero negro.",
        "back_home": "Regresar a la seguridad"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

