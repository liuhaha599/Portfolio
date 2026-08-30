import { useEffect, useRef, useState } from "react";
import ChromaGrid from "./ChromaGrid";
import Masonry from "./Masonry";
import GuanceProjectDetail from "./GuanceProjectDetail";

const appBasePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const appPath = (path) => `${appBasePath}${path.startsWith("/") ? path : `/${path}`}`;

const projects = [
  {
    id: "01",
    slug: "guance",
    title: "观测云",
    type: "SaaS 平台 · 功能迭代",
    period: "2023 - 至今",
    caption: "企业级可观测平台 · 功能迭代与体验优化",
    summary:
      "面向企业的可观测性 SaaS 平台，提供日志、指标、链路等数据监控能力，持续优化复杂信息架构与核心操作流程。",
    role: "平台功能迭代 / 信息架构与交互优化 / 开发还原走查 / 用户反馈分析 / 设计规范与 Icon 体系建设",
    accent: "blue",
    image: "/assets/guance-figma/hero.webp",
    imagePosition: "center top",
  },
  {
    id: "02",
    slug: "cloudcare",
    title: "CloudCare",
    type: "Web & SaaS · 0-1 设计",
    period: "2023 - 2024",
    caption: "企业云服务平台 · 官网与 SaaS 产品设计",
    summary:
      "面向企业用户的云服务平台，包含品牌官网、CloudCare Pro 管理平台及相关 SaaS 产品。",
    role: "需求分析 / 页面规划 / 交互设计 / 视觉落地 / 多端视觉语言与体验一致性建设",
    accent: "violet",
    image: "/assets/cloudcare-project-hero.jpg",
  },
  {
    id: "03",
    slug: "cloudflux",
    title: "CloudFlux 官网",
    type: "企业官网 · 视觉&体验升级",
    period: "2024",
    caption: "多云管理平台官网 · 信息架构与视觉设计",
    summary:
      "围绕 CloudFlux 多云管理平台搭建产品官网，聚焦云纳管、云服务、云运营与云运维等核心能力的清晰表达。",
    role: "产品价值梳理 / 信息架构 / 页面规划 / 官网视觉设计 / 响应式适配 / 开发走查",
    accent: "blue",
    image: "/assets/cloudflux-project-cover.jpg",
    imagePosition: "center top",
  },
];

const resumeProjects = [
  {
    title: "观测云",
    type: "SaaS 平台 · 功能迭代",
    period: "2023 - 至今",
    summary: "面向企业的可观测性 SaaS 平台，提供日志、指标、链路等数据监控能力。",
    responsibilities: [
      "负责平台功能迭代设计，结合业务需求优化信息架构、交互流程及视觉体验。",
      "跟进设计方案落地，进行开发还原走查，持续优化产品体验一致性。",
      "收集并分析用户反馈，持续优化页面布局、交互流程及视觉体验。",
      "参与产品设计规范及 Icon 体系建设，推动设计资产沉淀与复用。",
    ],
  },
  {
    title: "CloudCare",
    type: "Web & SaaS · 0-1 设计",
    period: "2023 - 2024",
    summary: "面向企业用户的云服务平台，包含官网、Pro 管理平台及 SaaS 产品。",
    responsibilities: [
      "完成产品从需求分析、页面规划、交互设计到视觉落地的完整设计流程。",
      "根据不同业务场景建立统一视觉语言，提升多端产品体验一致性。",
    ],
  },
  {
    title: "CloudFlux",
    type: "官网设计 · 视觉与体验升级",
    period: "2023",
    summary: "重构官网信息架构，优化产品能力与解决方案展示逻辑。",
    responsibilities: [],
  },
];

const socialWorks = [
  {
    title: "玩转数据世界",
    type: "公众号首图 · Visual Design",
    category: "公众号首图",
    image: "/assets/social/0102玩转数据世界.png",
    ratio: "2 / 1",
    height: 300,
  },
  {
    title: "全链路分析",
    type: "公众号首图 · Visual Design",
    category: "公众号首图",
    image: "/assets/social/0129全链路分析.png",
    ratio: "2 / 1",
    height: 300,
  },
  {
    title: "APISIX",
    type: "公众号首图 · Visual Design",
    category: "公众号首图",
    image: "/assets/social/0220APISIX.png",
    ratio: "2 / 1",
    height: 300,
  },
  {
    title: "Python Services",
    type: "公众号首图 · Visual Design",
    category: "公众号首图",
    image: "/assets/social/0304PYTHON.png",
    ratio: "2 / 1",
    height: 300,
  },
  {
    title: "组合监控",
    type: "公众号首图 · Visual Design",
    category: "公众号首图",
    image: "/assets/social/0408解密组合监控.png",
    ratio: "2 / 1",
    height: 300,
  },
  {
    title: "NVIDIA GPU",
    type: "公众号首图 · Visual Design",
    category: "公众号首图",
    image: "/assets/social/0717英伟达GPU.png",
    ratio: "2 / 1",
    height: 300,
  },
  {
    title: "工程师为本",
    type: "公众号首图 · Visual Design",
    category: "公众号首图",
    image: "/assets/social/0722-工程师为本，创新为核.png",
    ratio: "2 / 1",
    height: 300,
  },
  {
    title: "1024 程序员节",
    type: "公众号首图 · Campaign",
    category: "公众号首图",
    image: "/assets/social/1024-3.png",
    ratio: "2 / 1",
    height: 300,
  },
  {
    title: "OpenTelemetry 最佳实践",
    type: "公众号首图 · Visual Design",
    category: "公众号首图",
    image: "/assets/social/1220最佳实践.png",
    ratio: "2 / 1",
    height: 300,
  },
  {
    title: "PostgreSQL",
    type: "公众号首图 · Visual Design",
    category: "公众号首图",
    image: "/assets/social/1225SQL.png",
    ratio: "2 / 1",
    height: 300,
  },
  {
    title: "CloudCare 功能更新",
    type: "公众号首图 · Product Update",
    category: "公众号首图",
    image: "/assets/social/功能更新.webp",
    ratio: "1280 / 381",
    height: 250,
  },
  {
    title: "技术解析",
    type: "公众号首图 · Visual Design",
    category: "公众号首图",
    image: "/assets/social/技术解析.png",
    ratio: "1280 / 381",
    height: 250,
  },
  {
    title: "监控事件自定义",
    type: "公众号首图 · Product Feature",
    category: "公众号首图",
    image: "/assets/social/监控事件自定义.jpg",
    ratio: "897 / 381",
    height: 280,
  },
  {
    title: "链路追踪",
    type: "公众号首图 · Visual Design",
    category: "公众号首图",
    image: "/assets/social/链路追踪.png",
    ratio: "2 / 1",
    height: 300,
  },
  {
    title: "内置视图",
    type: "公众号首图 · Product Feature",
    category: "公众号首图",
    image: "/assets/social/内置视图.png",
    ratio: "2 / 1",
    height: 300,
  },
  {
    title: "行业前沿",
    type: "公众号首图 · Visual Design",
    category: "公众号首图",
    image: "/assets/social/行业前沿.png",
    ratio: "1280 / 381",
    height: 250,
    previewPosition: "left center",
  },
  {
    title: "智能监控",
    type: "公众号首图 · 3D Visual",
    category: "公众号首图",
    image: "/assets/social/智能监控.jpg",
    ratio: "897 / 380",
    height: 280,
  },
  {
    title: "SSL 证书",
    type: "公众号首图 · Visual Design",
    category: "公众号首图",
    image: "/assets/social/ssl.png",
    ratio: "2 / 1",
    height: 300,
  },
  {
    title: "自定义 TraceID",
    type: "公众号首图 · Visual Design",
    category: "公众号首图",
    image: "/assets/social/自定义 traceId.png",
    ratio: "2 / 1",
    height: 300,
  },
  {
    title: "Druid 数据库",
    type: "公众号首图 · Visual Design",
    category: "公众号首图",
    image: "/assets/social/0813Druid数据库.png",
    ratio: "2 / 1",
    height: 300,
  },
];

const otherWorks = [
  {
    title: "1024 程序员节",
    type: "其他 · Campaign",
    category: "其他",
    image: "/assets/other/1024_副本.jpg",
    ratio: "750 / 1334",
    height: 720,
    previewPosition: "top",
  },
  {
    title: "企业级产品海报",
    type: "其他 · Product Poster",
    category: "其他",
    image: "/assets/other/企业级海报.webp",
    ratio: "1560 / 14300",
    height: 920,
    previewPosition: "top",
  },
  {
    title: "日志平台长图",
    type: "其他 · Product Poster",
    category: "其他",
    image: "/assets/other/日志.webp",
    ratio: "1560 / 7890",
    height: 900,
    previewPosition: "top",
  },
  {
    title: "实时监控长图",
    type: "其他 · Product Poster",
    category: "其他",
    image: "/assets/other/实时监控.webp",
    ratio: "1560 / 8162",
    height: 900,
    previewPosition: "top",
  },
  {
    title: "市场动态",
    type: "其他 · Editorial",
    category: "其他",
    image: "/assets/other/市场动态.jpg",
    ratio: "1080 / 2267",
    height: 760,
    previewPosition: "top",
  },
  {
    title: "移动端品牌长图",
    type: "其他 · Mobile Visual",
    category: "其他",
    image: "/assets/other/手机端备份 14.png",
    ratio: "780 / 2496",
    height: 820,
    previewPosition: "top",
  },
  {
    title: "RUM 用户体验分析",
    type: "其他 · Product Poster",
    category: "其他",
    image: "/assets/other/RUM.webp",
    ratio: "1560 / 8396",
    height: 900,
    previewPosition: "top",
  },
];

const explorationWorks = [
  {
    title: "暗色场景 · 白模",
    type: "3D · Scene Study",
    category: "3D",
    image: "/assets/3d/暗色场景-白模.webp",
    ratio: "16 / 9",
    height: 360,
  },
  {
    title: "暗色场景 · 渲染",
    type: "3D · Final Render",
    category: "3D",
    image: "/assets/3d/暗色渲染.webp",
    ratio: "16 / 9",
    height: 360,
  },
  {
    title: "登录场景 · 白模",
    type: "3D · Scene Study",
    category: "3D",
    image: "/assets/3d/登录页白模.jpg",
    ratio: "16 / 9",
    height: 360,
  },
  {
    title: "登录注册 · 页面应用",
    type: "3D · UI Application",
    category: "3D",
    image: "/assets/3d/登录注册@2x.webp",
    ratio: "16 / 9",
    height: 360,
  },
  {
    title: "智慧 AI · 白模",
    type: "3D · Form Study",
    category: "3D",
    image: "/assets/3d/智慧AI-白模.webp",
    ratio: "32 / 13",
    height: 320,
  },
  {
    title: "智慧 AI · 渲染",
    type: "3D · Final Render",
    category: "3D",
    image: "/assets/3d/智慧AI.jpg",
    ratio: "32 / 13",
    height: 320,
  },
  {
    title: "数据星 · 白模",
    type: "3D · Product Visual",
    category: "3D",
    image: "/assets/3d/xing-白模.webp",
    ratio: "3 / 4",
    height: 780,
  },
  {
    title: "数据星 · 渲染",
    type: "3D · Final Render",
    category: "3D",
    image: "/assets/3d/xing-渲染.webp",
    ratio: "3 / 4",
    height: 780,
  },
  {
    title: "居家时光",
    type: "插画 · Lifestyle Scene",
    category: "插画",
    image: "/assets/illustration/家居2.webp",
    ratio: "5 / 7",
    height: 700,
  },
  {
    title: "四牌楼",
    type: "插画 · Architecture",
    category: "插画",
    image: "/assets/illustration/建筑.webp",
    ratio: "2 / 3",
    height: 720,
  },
  {
    title: "夏日树下",
    type: "插画 · Character Scene",
    category: "插画",
    image: "/assets/illustration/日系人物场景.webp",
    ratio: "620 / 877",
    height: 700,
  },
  {
    title: "森林朋友",
    type: "插画 · Character",
    category: "插画",
    image: "/assets/illustration/动物插画.webp",
    ratio: "2 / 3",
    height: 720,
  },
  {
    title: "快餐图鉴",
    type: "插画 · Food Poster",
    category: "插画",
    image: "/assets/illustration/矢量插画-快餐_画板 1.png",
    ratio: "3000 / 3127",
    height: 520,
  },
  {
    title: "元宵节海报",
    type: "插画 · Festival Poster",
    category: "插画",
    image: "/assets/illustration/元宵节海报.webp",
    ratio: "375 / 667",
    height: 800,
  },
  {
    title: "蘑菇花园",
    type: "插画 · Plant Scene",
    category: "插画",
    image: "/assets/illustration/植物小场景.webp",
    ratio: "1 / 1",
    height: 520,
  },
  {
    title: "森林蘑菇",
    type: "插画 · Plant Scene",
    category: "插画",
    image: "/assets/illustration/植物小场景1.webp",
    ratio: "671 / 910",
    height: 680,
  },
  {
    title: "中秋海报",
    type: "插画 · Festival Poster",
    category: "插画",
    image: "/assets/illustration/中秋海报.jpg",
    ratio: "375 / 667",
    height: 800,
  },
  ...socialWorks,
  ...otherWorks,
  {
    title: "数据能力图标合集",
    type: "3D · Icon Collection",
    category: "3D",
    image: "/assets/3d/data-capability-icons.webp",
    ratio: "1763 / 966",
    height: 360,
  },
];

const explorationFilters = ["全部", "3D", "插画", "公众号首图", "其他"];

const parseRatio = (ratio) => {
  const [width, height] = String(ratio ?? "").split("/").map(Number);
  return width > 0 && height > 0 ? width / height : 1;
};

const masonryItems = explorationWorks.map((work, index) => ({
  id: `visual-${index + 1}`,
  img: work.image ?? "/assets/exploration-atlas-v1.webp",
  aspectRatio: work.category === "其他" ? 9 / 16 : parseRatio(work.ratio),
  title: work.title,
  type: work.type,
  cell: work.cell,
  work,
}));

const explorationFeaturedImages = [
  "/assets/3d/暗色渲染.webp",
  "/assets/3d/data-capability-icons.webp",
  "/assets/illustration/建筑.webp",
  "/assets/3d/智慧AI.jpg",
  "/assets/3d/登录注册@2x.webp",
  "/assets/illustration/日系人物场景.webp",
  "/assets/3d/xing-渲染.webp",
  "/assets/social/智能监控.jpg",
  "/assets/illustration/动物插画.webp",
  "/assets/social/1024-3.png",
  "/assets/illustration/元宵节海报.webp",
  "/assets/other/1024_副本.jpg",
  "/assets/social/0717英伟达GPU.png",
];

const explorationFeaturedSet = new Set(explorationFeaturedImages);
const featuredMasonryItems = explorationFeaturedImages
  .map((image) => masonryItems.find((item) => item.img === image))
  .filter(Boolean);
const remainingMasonryGroups = explorationFilters.slice(1).map((category) => (
  masonryItems.filter(
    (item) => item.work.category === category && !explorationFeaturedSet.has(item.img),
  )
));
const mixedRemainingMasonryItems = [];

while (remainingMasonryGroups.some((group) => group.length)) {
  remainingMasonryGroups.forEach((group) => {
    const item = group.shift();
    if (item) mixedRemainingMasonryItems.push(item);
  });
}

const curatedMasonryItems = [...featuredMasonryItems, ...mixedRemainingMasonryItems];

const explorationColumns = [
  [explorationWorks[16], explorationWorks[5], explorationWorks[9]],
  [otherWorks[0], explorationWorks[1]],
  [explorationWorks[3], otherWorks[1]],
  [explorationWorks[13], socialWorks[0]],
];

const strengths = [
  {
    title: "AI 辅助分析",
    text: "理解业务与用户需求，快速梳理问题与设计机会。",
  },
  {
    title: "AI 生成方案",
    text: "探索多种设计方向，加速方案验证与视觉表达。",
  },
  {
    title: "人工决策",
    text: "结合业务与体验，对方案进行决策和优化打磨。",
  },
  {
    title: "AI 辅助落地",
    text: "优化设计交付流程，提升从方案到产品的落地效率。",
  },
];

const practiceChromaItems = strengths.map((item) => ({
  ...item,
  borderColor: "#5467ef",
  gradient: "linear-gradient(145deg, rgba(84, 103, 239, 0.12) 0%, rgba(10, 12, 20, 0.98) 54%, #07090f 100%)",
}));

const experience = [
  {
    period: "2022.12 — 至今",
    company: "观测未来信息技术有限公司",
    role: "UI 设计师",
    highlights: ["企业级可观测平台设计", "Design System 建设"],
  },
  {
    period: "2021.07 - 2022.11",
    company: "上海炫卉文化传播有限公司",
    role: "UI 设计师",
    summary: "多端产品设计，覆盖官网、Web 平台及管理后台。",
    noWrap: true,
  },
  {
    period: "2020.08 - 2021.06",
    company: "山西诺阿科技有限公司",
    role: "实习",
    summary: "App / Web / 小程序 / 管理后台",
  },
];

const marqueeLogos = [
  { image: "/assets/logo-premiere.png", name: "Premiere Pro" },
  { image: "/assets/logo-photoshop.png", name: "Photoshop" },
  { image: "/assets/logo-illustrator.png", name: "Illustrator" },
  { image: "/assets/logo-after-effects.png", name: "After Effects" },
  { image: "/assets/logo-sketch.png", name: "Sketch" },
  { image: "/assets/logo-chatgpt.png", name: "ChatGPT" },
  { image: "/assets/logo-figma.png", name: "Figma" },
  { image: "/assets/logo-blender.png", name: "Blender" },
];

const metrics = [
  { value: "2+", label: "年 UI 设计经验" },
  { value: "5", label: "简历项目沉淀" },
  { value: "4", label: "多端设计场景" },
  { value: "B端", label: "后台系统重点经验" },
];

function ProjectCard({ project }) {
  return (
    <a
      className={`project-card ${project.accent}`}
      href={appPath(`/projects/${project.slug}`)}
      aria-label={`查看${project.title}项目详情`}
    >
      <div className={`project-media project-media-${project.slug}`}>
        <img
          src={project.image}
          alt={`${project.title}项目封面`}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: project.imagePosition ?? "center" }}
        />
      </div>
      <div className="project-card-body">
        <div className="project-card-copy">
          <h3>{project.title}</h3>
          <p>{project.type}</p>
        </div>
        <span className="project-period">{project.period}</span>
        <span className="project-open" aria-hidden="true">查看项目 <i>↗</i></span>
      </div>
    </a>
  );
}

function ExplorationPage() {
  const [selectedWork, setSelectedWork] = useState(null);
  const [activeFilter, setActiveFilter] = useState("全部");
  const closeButtonRef = useRef(null);
  const filteredMasonryItems = activeFilter === "全部"
    ? curatedMasonryItems
    : masonryItems.filter((item) => item.work.category === activeFilter);

  useEffect(() => {
    if (!selectedWork) return undefined;

    const lastFocused = document.activeElement;
    document.body.classList.add("modal-open");
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedWork(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
      lastFocused?.focus?.();
    };
  }, [selectedWork]);

  return (
    <main className="gallery-page">
      <header className="gallery-page-header">
        <a className="brand" href={appPath("/#exploration")} aria-label="返回首页视觉探索">
          <strong>LXY</strong>
          <span aria-hidden="true" />
        </a>
        <a className="gallery-back" href={appPath("/#exploration")}>返回首页</a>
      </header>

      <section className="gallery-page-content page-shell">
        <div className="gallery-page-heading">
          <h1>视觉探索</h1>
          <span>探索产品设计之外的视觉表达，通过 3D、插画与品牌视觉设计，拓展数字体验中的更多可能。</span>
          <div className="gallery-filters" role="group" aria-label="作品类型筛选">
            {explorationFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "is-active" : ""}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <Masonry
          items={filteredMasonryItems}
          onItemClick={setSelectedWork}
          ease="power3.out"
          duration={0.9}
          stagger={0.07}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.95}
          blurToFocus
          colorShiftOnHover={false}
        />
      </section>

      {selectedWork && (
        <div
          className={`gallery-lightbox-backdrop ${selectedWork.category === "其他" ? "is-long" : ""}`}
          onMouseDown={() => setSelectedWork(null)}
        >
          <section
            className={`gallery-lightbox ${selectedWork.category === "其他" ? "is-long" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-lightbox-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="gallery-lightbox-close"
              type="button"
              ref={closeButtonRef}
              onClick={() => setSelectedWork(null)}
              aria-label="关闭作品预览"
              title="关闭"
            >
              ×
            </button>
            <div
              className={`gallery-lightbox-visual ${selectedWork.image ? "has-image" : ""} ${selectedWork.category === "其他" ? "is-long" : ""}`}
              style={{ "--work-ratio": selectedWork.ratio }}
            >
              {selectedWork.image ? (
                <img
                  className="gallery-lightbox-image"
                  src={selectedWork.image}
                  alt=""
                  aria-hidden="true"
                />
              ) : (
                <div
                  className={`gallery-lightbox-art exploration-art ${selectedWork.cell ?? ""}`}
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="gallery-lightbox-copy">
              <span>{selectedWork.type}</span>
              <h2 id="gallery-lightbox-title">{selectedWork.title}</h2>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function ResumePage() {
  return (
    <main className="resume-page">
      <header className="resume-page-header">
        <div className="resume-page-nav page-shell">
          <a className="brand" href={appPath("/")} aria-label="返回作品集首页">
            <strong>LXY</strong>
            <span aria-hidden="true" />
          </a>
          <div className="resume-page-actions">
            <a className="resume-back" href={appPath("/")}>返回作品集</a>
            <a className="resume-download" href={appPath("/assets/liuxueyuan-resume.pdf")} download="刘雪源简历- UI设计师.pdf">
              下载 PDF
            </a>
          </div>
        </div>
      </header>

      <section className="resume-page-hero page-shell">
        <div>
          <p>UI / UX DESIGNER</p>
          <h1>刘雪源<span>5 年 +</span></h1>
        </div>
        <p className="resume-page-lead">
          专注企业级产品、SaaS 平台与品牌体验设计，具备从需求分析、信息架构、交互设计到视觉落地的完整实践经验。
        </p>
      </section>

      <div className="resume-page-layout page-shell">
        <div className="resume-page-main">
          <section className="resume-web-section">
            <div className="resume-web-title">
              <h2>工作经历</h2>
              <span>2020.08 - 至今</span>
            </div>

            <article className="resume-job">
              <header>
                <div><h3>观测未来信息技术有限公司</h3><span>UI 设计师</span></div>
                <time>2022.12 - 至今</time>
              </header>
              <p>负责企业级 SaaS 产品及品牌体验设计。</p>
              <ol>
                <li>独立负责 CloudCare 多端产品设计，覆盖官网、Pro 端及 SaaS 平台。</li>
                <li>参与观测云核心产品功能迭代，基于设计体系完成新功能设计与视觉优化。</li>
                <li>负责 CloudFlux 官网及服务端、运营端日常设计支持。</li>
              </ol>
            </article>

            <article className="resume-job">
              <header>
                <div><h3>上海炫卉文化传播有限公司</h3><span>UI 设计师</span></div>
                <time>2021.07 - 2022.11</time>
              </header>
              <p>独立负责公司多端产品设计，覆盖官网、Web 平台及管理后台。</p>
              <ol>
                <li>负责 Pmarketing 官网及平台设计，完成页面规划、交互设计及视觉落地。</li>
                <li>负责天玑增长引擎管理后台设计，优化业务流程及信息展示体验。</li>
              </ol>
            </article>

            <article className="resume-job">
              <header>
                <div><h3>山西诺阿科技有限公司</h3><span>设计实习</span></div>
                <time>2020.08 - 2021.06</time>
              </header>
              <p>参与品牌及互联网产品设计项目。</p>
            </article>
          </section>

          <section className="resume-web-section resume-projects-section">
            <div className="resume-web-title">
              <h2>项目经验</h2>
              <span>SELECTED PROJECTS</span>
            </div>
            {resumeProjects.map((project) => (
              <article className="resume-web-project" key={project.title}>
                <header>
                  <div>
                    <h3>{project.title}</h3>
                    <span>{project.type}</span>
                  </div>
                  <time>{project.period}</time>
                </header>
                <p>{project.summary}</p>
                {project.responsibilities.length > 0 && (
                  <>
                    <strong>负责内容</strong>
                    <ol>
                      {project.responsibilities.map((item) => <li key={item}>{item}</li>)}
                    </ol>
                  </>
                )}
              </article>
            ))}
          </section>
        </div>

        <aside className="resume-page-aside">
          <div className="resume-aside-profile">
            <img src="/assets/resume-profile.jpeg" alt="刘雪源个人照片" />
            <div>
              <strong>刘雪源</strong>
              <span>UI / UX DESIGNER</span>
            </div>
          </div>

          <section className="resume-aside-section resume-aside-contact">
            <h2>联系方式</h2>
            <a href="tel:15535432414"><span>电话</span>15535432414</a>
            <a href="mailto:liuxueyuan599@163.com"><span>邮箱</span>liuxueyuan599@163.com</a>
            <p><span>政治面貌</span>中国共产党党员</p>
            <p><span>所在地</span>上海</p>
          </section>

          <section className="resume-aside-section">
            <h2>核心能力</h2>
            <dl>
              <div><dt>产品设计</dt><dd>B 端后台、SaaS 平台及官网产品设计，具备需求分析、交互设计与体验优化能力。</dd></div>
              <div><dt>设计体系</dt><dd>Design System 建设、组件库及图标体系搭建经验。</dd></div>
              <div><dt>AI 辅助设计</dt><dd>探索 AI 在设计流程中的应用，辅助方案探索、视觉生成与效率提升。</dd></div>
              <div><dt>工具</dt><dd>Figma / Sketch / Photoshop / Illustrator / AI 工具</dd></div>
            </dl>
          </section>

          <section className="resume-aside-section">
            <h2>教育经历</h2>
            <strong>统招本科 <span>2017 - 2021</span></strong>
            <p>视觉传达设计</p>
          </section>

          <section className="resume-aside-section">
            <h2>自我评价</h2>
            <p>5 年 UI/UX 设计经验，专注企业级产品与复杂业务场景设计，具备从 0-1 产品设计、设计体系建设及跨团队协作能力。</p>
          </section>
        </aside>
      </div>

      <footer className="resume-page-footer page-shell">
        <span>LXY. UI/UX Designer</span>
        <span>Portfolio ©2026</span>
      </footer>
    </main>
  );
}

function ProjectDetailNav({ activeProject, onProjectChange }) {
  const projectLinks = [
    { slug: "guance", label: "观测云" },
    { slug: "cloudcare", label: "CloudCare" },
    { slug: "cloudflux", label: "CloudFlux" },
  ];

  return (
    <nav className="project-detail-nav" aria-label="项目详情导航">
      <div className="project-detail-nav-inner">
        <a className="brand project-detail-brand" href={appPath("/#top")} aria-label="返回作品集首页">
          <strong>LXY</strong>
          <span aria-hidden="true" />
        </a>
        <div className="project-detail-nav-links">
          {projectLinks.map((item) => (
            <button
              type="button"
              className={activeProject === item.slug ? "is-active" : ""}
              aria-pressed={activeProject === item.slug}
              onClick={() => onProjectChange(item.slug)}
              key={item.slug}
            >
              {item.label}
            </button>
          ))}
        </div>
        <a className="project-detail-resume" href={appPath("/#top")}><span>返回首页</span></a>
      </div>
    </nav>
  );
}

function ProjectDetailPage({ project, onProjectChange }) {
  const isGuance = project.slug === "guance";
  const isCloudFlux = project.slug === "cloudflux";
  const isCloudCare = project.slug === "cloudcare";

  if (isGuance) {
    return (
      <GuanceProjectDetail
        nav={<ProjectDetailNav activeProject={project.slug} onProjectChange={onProjectChange} />}
      />
    );
  }

  if (isCloudFlux) {
    return (
      <main className="project-detail-page cloudflux-detail">
        <ProjectDetailNav activeProject={project.slug} onProjectChange={onProjectChange} />
        <section className="cloudflux-hero" aria-labelledby="cloudflux-title">
          <div className="cloudflux-hero-inner">
            <div className="cloudflux-display-title">
              <h1 id="cloudflux-title">CLOUDFLUX</h1>
              <span aria-hidden="true">CLOUDFLUX</span>
            </div>
            <img
              className="cloudflux-device"
              src="/assets/cloudflux-device-cutout.webp"
              alt="展示 CloudFlux 多云管理平台官网的笔记本电脑置于石台上"
              width="1479"
              height="1063"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <a
            className="cloudflux-url-strip"
            href="https://www.cloudflux.cn"
            target="_blank"
            rel="noreferrer"
          >
            https://www.cloudflux.cn
          </a>
        </section>

        <section className="cloudflux-services" aria-labelledby="cloudflux-services-title">
          <span className="cloudflux-section-number" aria-hidden="true">01</span>
          <h2 id="cloudflux-services-title">
            我们提供<span>什么服务？</span>
          </h2>
          <h3>平台建设 / 在线运营 / 监控运维 / 售后服务</h3>
          <p>
            <strong>CloudFlux</strong> 平台是面向政府、企业、运营商等客户提供一整套实现多种云资源混合管理云计算运营服务平台。
            以多云整合、可视化、交互优化、专业定制、持续集成、多部署形态等产品优势实现 IT 自服务管理，
            动态调度资源，异构资源的统一管理、统一监控，自动化运维和应用自动化编排、部署，持续提升企业的运营效率和运维能力。
          </p>
          <i className="cloudflux-section-rule" aria-hidden="true" />
        </section>

        <section className="cloudflux-style-direction" aria-labelledby="cloudflux-style-title">
          <div className="cloudflux-style-inner">
            <span className="cloudflux-style-number" aria-hidden="true">02</span>
            <h2 id="cloudflux-style-title">
              我们想改版成<span>什么风格？</span>
            </h2>
            <h3>品牌化 / 简约轻质感 / 灵动交互</h3>
            <ul>
              <li>全新的设计语言，强化品牌调性，打造用户记忆点</li>
              <li>采用 3D 轻质感效果，丰富整体空间感，更贴近「未来」、「层次」</li>
              <li>交互效果上增加更灵活的反馈，吸引用户探索</li>
            </ul>
            <i className="cloudflux-style-rule" aria-hidden="true" />
          </div>
        </section>

        <section className="cloudflux-moodboard" aria-label="CloudFlux 情绪版设计方向">
          <article className="cloudflux-moodboard-copy">
            <span className="cloudflux-quote-mark" aria-hidden="true">“</span>
            <div>
              <h2>情绪版</h2>
              <p>EMOTIONAL<br />EDITION</p>
            </div>
          </article>
          <figure className="cloudflux-moodboard-image">
            <img src="/assets/cloudflux-moodboard/orange-discs.jpg" alt="橙色半透明圆盘组成的轻盈三维视觉" loading="lazy" decoding="async" />
          </figure>
          <figure className="cloudflux-moodboard-image">
            <img src="/assets/cloudflux-moodboard/blue-orbits.jpg" alt="蓝色与橙色悬浮圆盘组成的未来感视觉" loading="lazy" decoding="async" />
          </figure>
          <figure className="cloudflux-moodboard-image">
            <img src="/assets/cloudflux-moodboard/water-ripple.jpg" alt="蓝白色水滴涟漪形成的灵动视觉" loading="lazy" decoding="async" />
          </figure>
        </section>

        <section className="cloudflux-type-system" aria-labelledby="cloudflux-type-title">
          <div className="cloudflux-type-intro">
            <span className="cloudflux-type-number" aria-hidden="true">03</span>
            <h2 id="cloudflux-type-title">
              文字秩序<span>做减法</span>
            </h2>
            <p className="cloudflux-type-intro-cn">
              文字是信息交互最直观的媒介，字体系统应有效帮助用户获取信息内容本身，去除不必要的大小阶梯，
              保持统一的信息节奏和阅读体验
            </p>
            <p className="cloudflux-type-intro-en" lang="en">
              Text is the most intuitive medium for information exchange. A typeface system should effectively help users
              access the content itself, removing unnecessary size variations and maintaining a consistent information
              rhythm and reading experience.
            </p>
          </div>

          <div className="cloudflux-font-family">
            <h3>苹方体</h3>
            <ul aria-label="苹方字体字重">
              <li><span>Regular</span><i>/</i><b>Aa</b></li>
              <li><span>Medium</span><i>/</i><b>Aa</b></li>
              <li><span>Bold</span><i>/</i><b>Aa</b></li>
            </ul>
          </div>

          <div className="cloudflux-type-demo">
            <p className="cloudflux-type-glyph" aria-label="字体示例 Aa">Aa</p>
            <ul className="cloudflux-type-scale" aria-label="CloudFlux 字号规范">
              <li><strong>28PX</strong><span>Title</span></li>
              <li><strong>22PX</strong><span>Subtitle</span></li>
              <li><strong>16PX</strong><span>Main body</span></li>
              <li><strong>12PX</strong><span>Small test</span></li>
            </ul>
          </div>
        </section>

        <section className="cloudflux-color-system" aria-labelledby="cloudflux-color-title">
          <div className="cloudflux-color-copy">
            <h2 id="cloudflux-color-title">
              <strong>色彩<br />减重</strong>
              <i aria-hidden="true" />
              <span>视觉<br />降噪</span>
            </h2>
            <p>COLOR DESATURATION</p>
          </div>
          <div className="cloudflux-color-palette" aria-label="CloudFlux 品牌色板">
            <span className="cloudflux-swatch cloudflux-swatch-orange" title="#FF6600" />
            <span className="cloudflux-swatch cloudflux-swatch-charcoal" title="#37332F" />
            <span className="cloudflux-swatch cloudflux-swatch-darkgray" title="#484848" />
            <span className="cloudflux-swatch cloudflux-swatch-gray" title="#77736F" />
            <span className="cloudflux-swatch cloudflux-swatch-lightgray" title="#C6C6C6" />
            <span className="cloudflux-swatch cloudflux-swatch-pale" title="#E3E3E3" />
          </div>
        </section>

        <section className="cloudflux-icon-system" aria-labelledby="cloudflux-icon-title">
          <div className="cloudflux-icon-header">
            <span className="cloudflux-icon-number" aria-hidden="true">04</span>
            <h2 id="cloudflux-icon-title">
              图标风格<span>统一化</span>
            </h2>
            <p>
              <strong>ICON</strong> 的设计上采用了透明毛玻璃的设计质感，贴合改版方向，同时也在交互上增加了更灵活的反馈，
              使用起来更加灵动
            </p>
          </div>

          <div className="cloudflux-icon-overview">
            <p lang="en">
              The design of ICON features a transparent frosted glass texture, aligning with the redesign direction,
              while also adding more flexible interaction feedback, making it more dynamic to use.
            </p>
            <div aria-label="Icon Design">
              <span>ICON DESIGN</span>
            </div>
          </div>

          <div className="cloudflux-icon-gallery">
            <img
              src="/assets/cloudflux-icon-showcase.jpg"
              alt="CloudFlux 橙色与灰色毛玻璃图标设计合集"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>

        <section className="cloudflux-interaction-system" aria-labelledby="cloudflux-interaction-title">
          <div className="cloudflux-interaction-header">
            <span className="cloudflux-interaction-number" aria-hidden="true">05</span>
            <h2 id="cloudflux-interaction-title">
              交互方式<span>明确性</span>
            </h2>
            <p className="cloudflux-interaction-copy-cn">
              给用户传达的内容变得丰富，因此页面要呈现的元素也会变多，这时候需要把干扰信息弱化，
              强化重点信息，鼠标交互凸显动效，明确可交互性，指哪交互在哪，让用户专注内容
            </p>
            <p className="cloudflux-interaction-copy-en" lang="en">
              The content delivered to users becomes richer, leading to an increase in elements displayed on the page.
              At this point, it&apos;s necessary to minimize distracting information, emphasize key points, highlight
              interactive effects with mouse interactions, clarify interactivity, and ensure that interactions occur
              precisely where the user points, allowing them to focus on the content.
            </p>
          </div>

          <div className="cloudflux-interaction-showcase" aria-label="CloudFlux 鼠标交互范围示意">
            <figure>
              <img
                src="/assets/cloudflux-interaction-horizontal.jpg"
                alt="横向内容卡片的鼠标交互范围示意"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <figure>
              <img
                src="/assets/cloudflux-interaction-vertical.jpg"
                alt="纵向内容卡片的鼠标交互范围示意"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section className="cloudflux-brand-showcase" aria-labelledby="cloudflux-brand-title">
          <header className="cloudflux-presentation-header">
            <h2 id="cloudflux-brand-title">
              提升<span>品牌调性</span>
            </h2>
            <h3>干净&nbsp;&nbsp;/&nbsp;&nbsp;轻快&nbsp;&nbsp;/&nbsp;&nbsp;轻科技</h3>
            <p>
              我们优化了第一屏布局风格，颜色干净统一，突出品牌色，减少操作入口，只保留咨询入口，
              让页面更具有冲击力和品牌调性，让用户更聚焦我们的服务
            </p>
          </header>

          <div className="cloudflux-brand-panels">
            <figure>
              <img
                src="/assets/cloudflux-brand-home.jpg"
                alt="CloudFlux 多云管理平台官网首页与全生命周期服务支持体系"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <figure>
              <img
                src="/assets/cloudflux-brand-icons.jpg"
                alt="CloudFlux 平台建设、在线运营、监控运维和售后服务的三维视觉"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section className="cloudflux-solutions-showcase" aria-labelledby="cloudflux-solutions-title">
          <header className="cloudflux-presentation-header">
            <h2 id="cloudflux-solutions-title">
              解决方案<span>灵活展现</span>
            </h2>
            <h3>分割&nbsp;&nbsp;/&nbsp;&nbsp;质感&nbsp;&nbsp;/&nbsp;&nbsp;冲击</h3>
            <p>
              优化了解决方案的呈现方式，升级成了立体动效切换背景，增加和用户的互动，提高点击率
            </p>
          </header>

          <figure className="cloudflux-solutions-main">
            <img
              src="/assets/cloudflux-solutions-main.jpg"
              alt="CloudFlux 多云管理、科研云、政务云与 ENS 虚商管理解决方案"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div className="cloudflux-solutions-states" aria-label="CloudFlux 解决方案背景切换效果">
            {[1, 2, 3, 4].map((state) => (
              <figure key={state}>
                <img
                  src={`/assets/cloudflux-solutions-state-${state}.jpg`}
                  alt={`CloudFlux 解决方案交互展示效果 ${state}`}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </section>

        <section className="cloudflux-overall-display" aria-labelledby="cloudflux-overall-title">
          <header className="cloudflux-overall-header">
            <h2 id="cloudflux-overall-title">整体页面展示</h2>
            <p>OVERALL PAGE DISPLAY</p>
          </header>
      <figure className="cloudflux-overall-visual">
        <img
          src="/assets/cloudflux-overall-pages-full-clean.jpg"
          alt="CloudFlux 官网多个页面的整体设计展示"
          loading="lazy"
          decoding="async"
        />
        <figcaption>THANKS FOR WATCHING</figcaption>
      </figure>
        </section>
      </main>
    );
  }

  if (isCloudCare) {
    const cloudCareProPersonas = [
      {
        avatar: "/assets/cloudcare-persona-ops.png",
        avatarLabel: "女性运维工程师头像",
        title: "运维工程师",
        scenario: "负责日常监控、告警响应与故障排查，高频查看云资源运行状态、服务健康度及异常信息。",
        pain: [
          "核心运行信息分散，需要跨模块反复查看",
          "异常发生时定位路径较长，影响故障处理效率",
          "告警上下文不足，难以快速判断问题影响与处理进展",
        ],
      },
      {
        avatar: "/assets/cloudcare-persona-architect.png",
        avatarLabel: "男性技术负责人头像",
        title: "架构师 / 技术负责人",
        scenario: "关注云资源整体运行情况、服务稳定性与异常趋势，通过全局数据辅助技术决策。",
        pain: [
          "缺少统一视角，整体资源与服务状态难以掌握",
          "异常与趋势信息分散，潜在风险不易及时发现",
          "关键数据缺少连续呈现，技术判断依赖多处信息整合",
        ],
      },
    ];

    const cloudCareSaasPersonas = [
      {
        avatar: "/assets/cloudcare-persona-admin.png",
        avatarLabel: "男性 IT 管理员头像",
        title: "IT 管理员 / 运维主管",
        scenario: "负责企业 IT 资源、账号、资产及系统配置管理，同时处理审批、情报、报告等日常事务。",
        pain: [
          "业务模块较多，高频功能查找与切换成本高",
          "资产、账号、项目等管理对象分散，缺少统一管理入口",
          "审批、情报等事务状态难持续跟踪，容易遗漏待办",
        ],
      },
      {
        avatar: "/assets/cloudcare-persona-manager.png",
        avatarLabel: "女性企业管理者头像",
        title: "项目负责人 / IT 管理者",
        scenario: "统筹项目计划、任务执行与团队协作，通过进度、工时及审批数据掌握项目整体推进情况。",
        pain: [
          "项目与任务信息分散，整体进度难以快速掌握",
          "时间计划与任务关系复杂，项目风险不易直观识别",
          "审批与执行状态需要持续跟踪，协作过程容易产生信息断层",
        ],
      },
    ];

    const cloudCareProJourneyColumns = [
      {
        module: "数据中心",
        behavior: "观测云上资产、费用分布、余额，接收故障告警和工单数据",
        goal: "实现本地数据中心全监控，打通与云上资源的观测壁垒，支撑混合云运维决策",
        focus: "实现本地数据中心全监控，打通与云上资源的观测壁垒，支撑混合云运维决策",
      },
      {
        module: "观测云",
        behavior: "通过指标、日志、链路统一观测业务运行状态，实时查看系统数据与可视化分析。",
        goal: "全面捕捉系统的运行数据，可以快速发现数据异常，掌握宏观运行状态",
        focus: "采用卡片式可视化布局，突出核心指标与异常状态，帮助快速发现问题。",
      },
      {
        module: "CloudLinker",
        behavior: "查看运维操作日志、告警处理记录、系统变更痕迹，导出审计报表",
        goal: "确保运维操作可追溯、可审计，满足企业合规需求，排查人为操作引发的故障",
        focus: "设计简洁的审计日志可视化界面，清晰标注操作轨迹；交互上简化审计查询、报表的导出流程，支持快速筛选，降低合规操作成本。",
      },
      {
        module: "阿里云",
        behavior: "对接阿里云资源，观测 ECS、RDS 等指标，联动阿里云告警",
        goal: "实现阿里云资源与自有业务系统统一观测，无需切换阿里云控制台，提升运维效率",
        focus: "统一阿里云资源入口与交互，整合指标和告警，提升运维效率。",
      },
      {
        module: "CloudSolution",
        behavior: "自定义面板配置，整合多模块数据适配个性化运维场景",
        goal: "实现云上多系统、多资源统一观测，打破数据壁垒，适配个性化运维需求",
        focus: "支持自定义监控面板布局，组件拖拽可调；简化面板配置流程，适配个性化运维场景，降低定制成本。",
      },
      {
        module: "CloudAdvisor",
        behavior: "查看运维优化建议，调整系统配置与告警规则",
        goal: "依托智能建议，优化运维策略，降低故障发生率，提升系统运行稳定性",
        focus: "清晰分区呈现运维优化建议，突出核心建议；交互上简化系统配置、告警规则调整操作，建议与配置入口联动，提升优化效率。",
      },
      {
        module: "CloudAlpha",
        behavior: "查看异常根因并分析结果，获取故障处理指引",
        goal: "快速锁定故障根因、获取专业处理建议，缩短故障处理时间",
        focus: "优化根因分析结果可视化呈现，逻辑清晰、重点突出；交互上提供直观故障处理指引，指引与操作入口联动，缩短排障路径。",
      },
      {
        module: "管理与支持",
        behavior: "管理账号权限，绑定账单并查询、导出消费明细",
        goal: "实现账号权限与消费账单绑定，快速核对账号关联资源消费，简化对账流程",
        focus: "设计简洁的权限与账单管理界面，层级清晰；交互上简化账号权限配置、账单绑定与核对流程，减少操作步骤，提升管理效率。",
      },
    ];

    const cloudCareSaasJourneyColumns = [
      {
        module: "项目管理",
        behavior: "创建/管理 IT 运维项目、分配项目成员权限、跟踪项目进度、关联项目相关资源与账单，记录项目操作日志",
        goal: "实现 IT 运维项目全流程管控，明确成员权责、关联资源账单，确保项目有序推进、可追溯",
        focus: "采用清晰分栏布局，项目进度、成员权责可视化呈现；交互上简化项目创建、进度跟踪操作，流程化设计，实现进度可追、操作便捷。",
      },
      {
        module: "报告管理",
        behavior: "生成项目进度、情报处置、资产统计、操作审计等各类报告，支持导出与归档，关联账单发票备案",
        goal: "实现各类管理报告一站式生成、导出与归档，支撑管理决策与合规审计，简化备案流程",
        focus: "设计报告一键生成、导出、归档流程，贴合企业备案场景，降低操作成本。",
      },
      {
        module: "操作审计",
        behavior: "记录所有用户操作行为、系统变更、权限调整、账单操作等痕迹，支持筛选查询、导出审计日志",
        goal: "确保所有管理操作可追溯、可审计，排查违规操作，满足企业合规管控与风险排查需求",
        focus: "设计审计日志列表，操作详情清晰可辨；交互上支持操作日志快速筛选、导出，关键操作标注突出，满足合规追溯需求。",
      },
      {
        module: "情报管理",
        behavior: "收集 IT 资源异常、安全风险、合规隐患等情报，分类标注等级，推送至对应负责人，跟踪处置进度",
        goal: "实现 IT 管控情报全生命周期管理，快速捕捉风险隐患、及时处置，降低企业 IT 运营风险",
        focus: "按等级区分情报视觉样式，异常情报高亮提醒；交互上简化情报分类、处置跟踪操作，实现情报全生命周期管控，提升风险处置效率。",
      },
      {
        module: "资产管理",
        behavior: "对多云 IT 资产进行统一纳管、分类、关联资源消费，记录资产全生命周期",
        goal: "实现多云资产一站式管控，清晰掌握资产分布与状态，避免资产闲置、流失，优化资产利用效率",
        focus: "采用列表布局，多云资产分类可视化呈现；交互上简化资产新建、同步操作，支持批量处理，实现资产状态清晰、管控高效。",
      },
      {
        module: "云账号管理",
        behavior: "统一管理多云账号、企业成员账号，分配账号权限、绑定账单权限，管控账号安全与登录状态",
        goal: "实现云账号与成员账号统一管控，权限分级清晰，保障账号安全，简化账号管理流程",
        focus: "清晰区分账号权限层级，安全状态直观呈现；交互上简化账号接入、权限配置流程，实现多账号统一管控，兼顾安全与易用性。",
      },
      {
        module: "系统管理",
        behavior: "配置系统参数、自定义权限规则、管理不同账户、角色和权限配置，维护系统稳定运行，适配企业个性化需求",
        goal: "保障系统稳定、安全运行，实现系统个性化配置，适配不同企业的管理规范与规模需求",
        focus: "设计简洁的参数配置界面，操作入口直观；交互上支持个性化配置，流程简化，预留扩展入口，保障系统稳定且适配企业需求。",
      },
    ];

    const cloudCareDesignPrinciples = [
      {
        number: "01",
        title: "专业可信",
        goal: "面向运维与 IT 管理场景，建立清晰、稳定的信息层级，让复杂数据与关键状态能够被快速理解与判断。",
        measures: "通过卡片、图表、列表匹配不同数据颗粒度，强化异常、告警与关键指标的视觉优先级；减少非必要视觉干扰，让用户聚焦核心数据与当前状态。",
      },
      {
        number: "02",
        title: "高效易用",
        goal: "围绕监控、排障、审批、项目管理等高频任务减少查找、跳转与重复操作，提升复杂 B 端场景下的任务处理效率。",
        measures: "聚合高频入口与关键操作，通过筛选、状态分类、侧滑详情等方式减少页面跳转；优化核心流程的信息组织，让用户从“发现问题”到“查看详情 / 执行操作”形成连续路径。",
      },
      {
        number: "03",
        title: "统一体验",
        goal: "统一 CloudCare Pro 与 SaaS 的信息结构和交互语言，降低用户在不同业务模块与系统间切换的认知成本。",
        measures: "统一导航逻辑、状态表达、组件形态及核心交互模式，并针对 Pro 的运维场景与 SaaS 的管理场景保留业务差异，在统一设计语言下兼顾不同使用诉求。",
      },
      {
        number: "04",
        title: "安全可控",
        goal: "针对账号、资产、审批、操作记录等企业管理场景，强化关键操作反馈与过程可追溯性，提升系统使用的安全感与可控性。",
        measures: "通过状态反馈、操作确认、权限与敏感信息展示规范，明确关键操作结果；结合日志、流程记录等信息保留操作上下文，帮助用户追踪业务过程。",
      },
    ];

    const cloudCareSpecialGoals = [
      {
        title: "CloudCare Pro 专项目标",
        subtitle: "缩短故障发现与排查路径",
        goal: "围绕运维人员从「发现异常 → 定位问题 → 查看详情 → 处理问题」的核心路径，优化监控、告警与故障详情的信息组织，降低复杂运维数据的阅读与排查成本。",
        measures: "聚合关键运行指标与异常状态，通过状态分级、趋势分析、侧滑详情及时间线等方式建立连续排障路径；统一阿里云生态与 CloudDirector 等能力入口，减少跨模块查找与页面跳转。",
      },
      {
        title: "CloudCare SaaS 专项目标",
        subtitle: "提升多维 IT 管理效率",
        goal: "围绕项目、资产、情报、审批及账单等企业管理场景，建立统一的信息入口与管理视角，让分散的 IT 管理事务能够集中查看、持续跟踪与高效处理。",
        measures: "通过全局导航整合业务入口，以首页看板聚合关键管理数据；统一项目、审批、资产等模块的信息结构与状态表达，让用户从全局概览快速进入具体管理任务。",
      },
    ];

    const cloudCareDashboardHighlights = [
      {
        title: "服务周期直观呈现，看板内容支持按需配置",
        text: "服务时间以大数字和独立卡片强化剩余周期感知，降低用户遗漏续费节点的风险；通过自定义看板开放首页内容配置，让不同用户能够围绕自身关注重点组织信息。",
        media: "/assets/cloudcare-detail/cloudcare-dashboard-customize@2x.png",
        mediaAlt: "CloudCare 自定义看板入口",
        mediaVariant: "compact",
      },
      {
        title: "核心信息集中呈现，减少跨模块查找",
        text: "将云上资产、费用余额、告警与工单等高频信息集中在首页，并通过卡片、图表与列表区分信息层级，减少用户进入不同模块反复查询。",
        media: "/assets/cloudcare-detail/cloudcare-dashboard-assets@2x.png",
        mediaAlt: "CloudCare 云上资产模块",
      },
      {
        title: "风险信息强化层级，重要状态优先感知",
        text: "针对服务到期、余额、告警等具有时效性和风险属性的数据，通过数字强化、状态色和趋势变化建立视觉优先级，让用户快速识别当前需要关注的问题。",
      },
      {
        title: "指标、趋势、明细分层，建立连续阅读路径",
        text: "根据不同数据的阅读方式，将关键指标以数字呈现、变化情况以趋势图呈现、具体对象以列表呈现，让用户从“看状态”自然过渡到“查问题”。",
        media: "/assets/cloudcare-detail/cloudcare-dashboard-workorder-trend@2x.png",
        mediaAlt: "CloudCare 工单创建趋势图",
      },
    ];

    const cloudCareAlertHighlights = [
      {
        title: "侧滑承载告警详情，保持排查上下文连续",
        text: "在高频告警浏览场景中采用侧滑详情，用户无需离开当前列表即可查看告警内容与处理进度，关闭后继续原位置排查，减少页面往返。",
      },
      {
        title: "时间线还原告警处理过程，让状态变化可追溯",
        text: "将告警从创建、受理到恢复的状态变化组织为时间线，相比静态状态字段，更直观地呈现事件当前阶段与历史处理过程。",
        media: "/assets/cloudcare-detail/cloudcare-alert-timeline@2x.png",
        mediaAlt: "CloudCare 告警处理时间线",
      },
      {
        title: "关键信息分层组织，降低复杂告警的阅读成本",
        text: "将告警等级、核心描述与基础信息优先呈现，详细参数与处理日志进一步分区组织，让用户先快速识别问题，再按需深入查看，避免大量信息平铺带来的阅读压力。",
      },
    ];

    const cloudCareSaasHomeHighlights = [
      {
        title: "多业务模块下的分层导航",
        text: "面对项目、情报、报告、资产等多业务模块，将分散入口收拢至统一导航，并通过业务分类与双列布局建立清晰层级，减少多级菜单展开与反复切换，让用户更快定位目标功能，也能降低功能持续扩展带来的导航复杂度。在承载更多业务能力的同时，保持当前工作区的聚焦与导航可扩展性。",
      },
      {
        title: "统一工作视角，建立首页信息层级",
        text: "将首页拆分为「个人看板」与「系统看板」，优先呈现与用户直接相关的任务、情报、审批与文档，再下沉至系统运行数据，让信息顺序从“与我相关”自然过渡到“全局状态”。",
      },
      {
        title: "聚合关键运行信息，减少跨模块查找",
        text: "将 SLA、项目进度、最新动态与业务趋势集中至首页，并根据数据特征分别采用指标、列表、时间线与趋势图呈现，让用户从整体状态快速深入到具体业务变化。减少跨模块查找与切换，让首页从功能入口转变为工作状态总览。",
      },
    ];

    const cloudCareWorkflowHighlights = [
      {
        title: "按处理阶段组织任务，让当前事项优先浮现",
        text: "将流程按「待处理 / 已处理 / 已发起 / 汇总」划分，并结合分类、状态、发起人等条件进一步筛选，让用户从大量流程中快速聚焦当前需要处理的事项，降低日常审批中的查找成本。",
      },
      {
        title: "流程与进度并行呈现，让协作状态持续可追踪",
        text: "详情页采用左右分区，将当前流程内容与成员职责集中在主区域，审批、抄送、执行等节点通过时间线持续记录，使用户处理当前任务时，也能同步判断流程所处阶段及上下游协作状态。",
      },
      {
        title: "配置与结果同步呈现，降低复杂流程搭建成本",
        text: "采用「流程结构 + 属性配置」双栏布局，将字段、审批节点与参与成员集中在左侧呈现，右侧承载对应配置，使用户在保持流程全局认知的同时完成局部编辑，减少配置过程中频繁切换带来的上下文丢失。",
      },
    ];

    const cloudCareProjectHighlights = [
      {
        title: "列表与时间轴并行，兼顾信息查看与进度判断",
        text: "将项目名称、时间、进度等结构化信息与甘特图横向对应，让用户无需在列表与计划视图间反复切换，即可同时理解「项目是什么」与「进行到哪里」。",
      },
      {
        title: "项目任务层级展开，让计划关系清晰可见",
        text: "通过项目与子任务的层级展开，并在时间轴中同步呈现任务周期与关联关系，让用户从项目整体快速深入到具体任务，降低复杂计划的理解成本。",
      },
      {
        title: "状态差异视觉化，让异常进度优先被发现",
        text: "通过颜色区分未开始、正常、逾期与提前等状态，并结合进度比例呈现实际完成情况，让用户在浏览大量项目时快速识别异常与需要关注的计划。",
        media: "/assets/cloudcare-detail/cloudcare-gantt-status-legend@2x.png",
        mediaAlt: "项目计划状态图例：未开始、正常、逾期与提前",
        mediaVariant: "status-legend",
      },
    ];

    const renderCloudCareHighlights = (items, className = "") => (
      <div className={`cloudcare-case-notes ${className}`.trim()}>
        {items.map((item) => (
          <article className="cloudcare-case-note" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            {item.media && (
              <figure className={`cloudcare-case-note-media${item.mediaVariant ? ` cloudcare-case-note-media--${item.mediaVariant}` : ""}`}>
                <img src={item.media} alt={item.mediaAlt} loading="lazy" decoding="async" />
              </figure>
            )}
          </article>
        ))}
      </div>
    );

    const renderPersonaGroup = (title, personas) => (
      <section className="cloudcare-persona-group" aria-label={title}>
        <h3>{title}</h3>
        <div className="cloudcare-persona-cards">
          {personas.map((persona) => (
            <article className="cloudcare-persona-card" key={persona.title}>
              <span className="cloudcare-persona-avatar">
                <img src={persona.avatar} alt={persona.avatarLabel} loading="lazy" decoding="async" />
              </span>
              <h4>{persona.title}</h4>
              <div className="cloudcare-persona-block">
                <h5>使用场景</h5>
                <p>{persona.scenario}</p>
              </div>
              <div className="cloudcare-persona-block">
                <h5>核心痛点</h5>
                <p>{persona.pain.map((item) => <span key={item}>{item}</span>)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );

    return (
      <main className="project-detail-page cloudcare-detail">
        <ProjectDetailNav activeProject={project.slug} onProjectChange={onProjectChange} />
        <section className="cloudcare-hero" aria-labelledby="cloudcare-title">
          <div className="cloudcare-hero-art" aria-hidden="true" />
          <div className="cloudcare-hero-inner">
            <div className="cloudcare-copy">
              <div className="cloudcare-eyebrow">
                <span className="cloudcare-mini-mark" aria-hidden="true">
                  <img src="/assets/cloudcare-logo.png" alt="" />
                </span>
                <p>一站式的云管理服务平台</p>
              </div>
              <h1 id="cloudcare-title">
                CLOUDCARE
                <span>Pro &amp; SaaS</span>
                <span>DESIGN</span>
              </h1>
              <span className="cloudcare-direction" aria-hidden="true">
                <i />
              </span>
            </div>

          </div>
        </section>
        <section className="cloudcare-background" aria-labelledby="cloudcare-background-title">
          <div className="cloudcare-background-inner">
            <header className="cloudcare-background-copy">
              <h2 id="cloudcare-background-title">项目背景</h2>
              <p>
                本项目为驻云科技 CloudCare 系列产品（Pro端 + SaaS端），两款产品分别聚焦企业 IT 运维与云管理场景，
                解决企业上云后核心系统监控不足、云资源管控分散的核心痛点。核心目标是通过搭建统一设计语言，
                优化监控排障、资源管理等核心场景体验，平衡专业度与易用性，助力产品实现“故障快速定位”与
                “IT统一管控”，提升企业 IT 运维效率与决策准确性。
              </p>
            </header>

            <img
              className="cloudcare-pain-map"
              src="/assets/cloudcare-pain-map.png"
              alt="CloudCare 业务侧与用户侧核心痛点关系图"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>
        <section className="cloudcare-personas" aria-labelledby="cloudcare-personas-title">
          <div className="cloudcare-personas-inner">
            <h2 id="cloudcare-personas-title">用户画像</h2>
            <div className="cloudcare-persona-groups">
              {renderPersonaGroup("CloudCare Pro", cloudCareProPersonas)}
              {renderPersonaGroup("CloudCare SaaS", cloudCareSaasPersonas)}
            </div>
          </div>
        </section>
        <section className="cloudcare-goals" aria-labelledby="cloudcare-goals-title">
          <div className="cloudcare-goals-inner">
            <h2 id="cloudcare-goals-title">设计目标</h2>

            <div className="cloudcare-goal-principles">
              {cloudCareDesignPrinciples.map((item) => (
                <article className="cloudcare-goal-principle" key={item.number}>
                  <span className="cloudcare-goal-number" aria-hidden="true">{item.number}</span>
                  <h3>{item.title}</h3>
                  <div className="cloudcare-goal-copy">
                    <h4>设计目标</h4>
                    <p>{item.goal}</p>
                  </div>
                  <div className="cloudcare-goal-copy">
                    <h4>具体措施</h4>
                    <p>{item.measures}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="cloudcare-special-goals">
              {cloudCareSpecialGoals.map((item) => (
                <article className="cloudcare-special-goal" key={item.title}>
                  <h3>{item.title}</h3>
                  <div className="cloudcare-goal-copy">
                    <h4>{item.subtitle}</h4>
                    <p>{item.goal}</p>
                  </div>
                  <div className="cloudcare-goal-copy">
                    <h4>具体措施</h4>
                    <p>{item.measures}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="cloudcare-journey cloudcare-journey--pro" aria-labelledby="cloudcare-journey-title">
          <div className="cloudcare-journey-inner">
            <h2 id="cloudcare-journey-title">
              用户体验地图 <span>（CloudCare Pro）</span>
            </h2>
            <div className="cloudcare-journey-scroll" tabIndex="0" aria-label="CloudCare Pro 用户体验地图，可横向滚动">
              <div className="cloudcare-journey-grid">
                <div className="cloudcare-journey-label cloudcare-journey-head">模块</div>
                {cloudCareProJourneyColumns.map((item) => (
                  <div className="cloudcare-journey-module" key={item.module}>{item.module}</div>
                ))}

                <div className="cloudcare-journey-label">用户行为</div>
                {cloudCareProJourneyColumns.map((item) => (
                  <div className="cloudcare-journey-cell cloudcare-journey-behavior" key={`${item.module}-behavior`}>
                    {item.behavior}
                  </div>
                ))}

                <div className="cloudcare-journey-label">核心目标</div>
                {cloudCareProJourneyColumns.map((item) => (
                  <div className="cloudcare-journey-cell cloudcare-journey-goal" key={`${item.module}-goal`}>
                    {item.goal}
                  </div>
                ))}

                <div className="cloudcare-journey-label">设计重点</div>
                {cloudCareProJourneyColumns.map((item) => (
                  <div className="cloudcare-journey-cell cloudcare-journey-focus" key={`${item.module}-focus`}>
                    {item.focus}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div className="cloudcare-continuation">
          <section className="cloudcare-case-section" aria-labelledby="cloudcare-dashboard-title">
            <div className="cloudcare-case-inner">
              <h2 id="cloudcare-dashboard-title">构建清晰的信息层级，让经营状态一目了然</h2>
              <div className="cloudcare-case-layout cloudcare-dashboard-layout">
                {renderCloudCareHighlights(cloudCareDashboardHighlights)}
                <figure className="cloudcare-case-figure cloudcare-dashboard-figure">
                  <img
                    src="/assets/cloudcare-detail/cloudcare-dashboard@2x.webp"
                    alt="CloudCare Pro 经营看板与重点数据界面"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </div>
            </div>
          </section>

          <section className="cloudcare-case-section" aria-labelledby="cloudcare-alert-title">
            <div className="cloudcare-case-inner">
              <h2 id="cloudcare-alert-title">重构告警阅读路径，让问题定位更清晰高效</h2>
              <div className="cloudcare-case-layout cloudcare-alert-layout">
                <figure className="cloudcare-case-figure cloudcare-alert-figure">
                  <img
                    src="/assets/cloudcare-detail/cloudcare-alert-detail@2x.png"
                    alt="CloudCare 告警详情侧滑面板与处理时间线"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                {renderCloudCareHighlights(cloudCareAlertHighlights)}
              </div>
            </div>
          </section>

          <section className="cloudcare-more-pages" aria-labelledby="cloudcare-pro-more-pages-title">
            <img
              className="cloudcare-more-pages-visual"
              src="/assets/cloudcare-detail/cloudcare-pro-more-pages@2x.webp"
              alt="CloudCare Pro 更多产品页面展示"
              loading="lazy"
              decoding="async"
            />
            <header className="cloudcare-more-pages-heading">
              <h2 id="cloudcare-pro-more-pages-title">更多页面</h2>
            </header>
          </section>

          <section className="cloudcare-journey cloudcare-journey--saas" aria-labelledby="cloudcare-saas-journey-title">
            <div className="cloudcare-journey-inner">
              <h2 id="cloudcare-saas-journey-title">
                用户体验地图 <span>（CloudCare SaaS）</span>
              </h2>
              <div className="cloudcare-journey-scroll" tabIndex="0" aria-label="CloudCare SaaS 用户体验地图，可横向滚动">
                <div className="cloudcare-journey-grid cloudcare-journey-grid--saas">
                  <div className="cloudcare-journey-label cloudcare-journey-head">模块</div>
                  {cloudCareSaasJourneyColumns.map((item) => (
                    <div className="cloudcare-journey-module" key={item.module}>{item.module}</div>
                  ))}
  
                  <div className="cloudcare-journey-label">用户行为</div>
                  {cloudCareSaasJourneyColumns.map((item) => (
                    <div className="cloudcare-journey-cell cloudcare-journey-behavior" key={`${item.module}-behavior`}>
                      {item.behavior}
                    </div>
                  ))}
  
                  <div className="cloudcare-journey-label">核心目标</div>
                  {cloudCareSaasJourneyColumns.map((item) => (
                    <div className="cloudcare-journey-cell cloudcare-journey-goal" key={`${item.module}-goal`}>
                      {item.goal}
                    </div>
                  ))}
  
                  <div className="cloudcare-journey-label">设计重点</div>
                  {cloudCareSaasJourneyColumns.map((item) => (
                    <div className="cloudcare-journey-cell cloudcare-journey-focus" key={`${item.module}-focus`}>
                      {item.focus}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="cloudcare-case-section" aria-labelledby="cloudcare-saas-home-title">
            <div className="cloudcare-case-inner">
              <h2 id="cloudcare-saas-home-title">重构信息入口与首页层级，提升复杂业务的获取效率</h2>
              <div className="cloudcare-case-layout cloudcare-saas-home-layout">
                {renderCloudCareHighlights(cloudCareSaasHomeHighlights)}
                <figure className="cloudcare-case-figure cloudcare-saas-nav-figure">
                  <img
                    src="/assets/cloudcare-detail/cloudcare-saas-nav@2x.png"
                    alt="CloudCare SaaS 分层业务导航"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <figure className="cloudcare-case-figure cloudcare-saas-home-figure">
                  <img
                    src="/assets/cloudcare-detail/cloudcare-saas-home@2x.webp"
                    alt="CloudCare SaaS 工作首页"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </div>
            </div>
          </section>

          <section className="cloudcare-case-section" aria-labelledby="cloudcare-workflow-title">
            <div className="cloudcare-case-inner">
              <h2 id="cloudcare-workflow-title">围绕流程全生命周期，建立清晰可控的审批体验</h2>
              {renderCloudCareHighlights(cloudCareWorkflowHighlights, "cloudcare-case-notes--columns")}
              <figure className="cloudcare-case-figure cloudcare-workflow-figure">
                <img
                  src="/assets/cloudcare-detail/cloudcare-workflow@2x.webp"
                  alt="CloudCare SaaS 审批列表、流程详情和流程配置界面"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </section>

          <section className="cloudcare-case-section" aria-labelledby="cloudcare-project-plan-title">
            <div className="cloudcare-case-inner">
              <h2 id="cloudcare-project-plan-title">融合任务结构与时间进度，让项目计划更直观可控</h2>
              <div className="cloudcare-case-layout cloudcare-project-plan-layout">
                {renderCloudCareHighlights(cloudCareProjectHighlights)}
                <figure className="cloudcare-case-figure cloudcare-gantt-figure">
                  <img
                    src="/assets/cloudcare-detail/cloudcare-gantt@2x.webp"
                    alt="CloudCare SaaS 项目任务甘特图"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </div>
            </div>
          </section>

          <section className="cloudcare-more-pages" aria-labelledby="cloudcare-saas-more-pages-title">
            <img
              className="cloudcare-more-pages-visual"
              src="/assets/cloudcare-detail/cloudcare-saas-more-pages@2x.webp"
              alt="CloudCare SaaS 更多产品页面展示"
              loading="lazy"
              decoding="async"
            />
            <header className="cloudcare-more-pages-heading">
              <h2 id="cloudcare-saas-more-pages-title">更多页面</h2>
            </header>
          </section>

          <section className="cloudcare-case-section" aria-labelledby="cloudcare-design-system-title">
            <div className="cloudcare-case-inner">
              <h2 id="cloudcare-design-system-title">统一的设计规范</h2>
              <figure className="cloudcare-case-figure cloudcare-design-system-figure">
                <img
                  src="/assets/cloudcare-detail/cloudcare-design-system@2x.png"
                  alt="CloudCare 颜色、表单、按钮和导航组件设计规范"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="project-detail-page project-detail-generic">
      <ProjectDetailNav activeProject={project.slug} onProjectChange={onProjectChange} />
      <header className="project-detail-generic-header">
        <p>PROJECT {project.id}</p>
        <h1>{project.title}</h1>
        <p className="project-detail-lead">{project.caption}</p>
      </header>
      <div className="project-detail-generic-image">
        <img src={project.image} alt={`${project.title}项目视觉`} />
      </div>
      <section className="project-detail-generic-copy">
        <span>项目概述</span>
        <h2>{project.summary}</h2>
        <p>{project.role}</p>
      </section>
    </main>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("");
  const [navScrolled, setNavScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactVideoReady, setContactVideoReady] = useState(false);
  const [selectedExplorationWork, setSelectedExplorationWork] = useState(null);
  const contactCloseRef = useRef(null);
  const contactVideoRef = useRef(null);
  const explorationCloseRef = useRef(null);

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return undefined;

    const scrollToTarget = () => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    };
    const frame = window.requestAnimationFrame(scrollToTarget);
    const timer = window.setTimeout(scrollToTarget, 120);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const sectionIds = ["about", "projects", "exploration", "strengths", "contact"];
    const onScroll = () => {
      const anchor = window.scrollY + window.innerHeight * 0.36;
      let current = "";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= anchor) current = id;
      });

      setActiveSection(current);
      setNavScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = contactVideoRef.current;
    if (!target || !("IntersectionObserver" in window)) {
      setContactVideoReady(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setContactVideoReady(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = document.getElementById("projects");
    const track = section?.querySelector(".project-list");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    if (!section || !track) return undefined;

    let maxHorizontalScroll = 0;

    const measure = () => {
      maxHorizontalScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    };

    const handleWheel = (event) => {
      if (!desktopQuery.matches || maxHorizontalScroll === 0 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const rect = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const isCentered = rect.top <= viewportCenter && rect.bottom >= viewportCenter;
      if (!isCentered) return;

      const movingForward = event.deltaY > 0;
      const canMove = movingForward
        ? track.scrollLeft < maxHorizontalScroll - 1
        : track.scrollLeft > 1;
      if (!canMove) return;

      event.preventDefault();
      const modeScale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      const nextScroll = track.scrollLeft + event.deltaY * modeScale * 0.35;
      track.scrollLeft = Math.min(maxHorizontalScroll, Math.max(0, nextScroll));
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    desktopQuery.addEventListener("change", measure);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", measure);
    measure();

    return () => {
      resizeObserver.disconnect();
      desktopQuery.removeEventListener("change", measure);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (!contactOpen) return undefined;

    const previouslyFocused = document.activeElement;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setContactOpen(false);
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", closeOnEscape);
    window.requestAnimationFrame(() => contactCloseRef.current?.focus());

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
      previouslyFocused?.focus?.();
    };
  }, [contactOpen]);

  useEffect(() => {
    if (!selectedExplorationWork) return undefined;

    const previouslyFocused = document.activeElement;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedExplorationWork(null);
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", closeOnEscape);
    window.requestAnimationFrame(() => explorationCloseRef.current?.focus());

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
      previouslyFocused?.focus?.();
    };
  }, [selectedExplorationWork]);

  return (
    <main>
      <nav className={`nav ${navScrolled ? "is-scrolled" : ""}`} aria-label="主导航">
        <a className="brand" href="#top" aria-label="返回首页">
          <strong>LXY</strong>
          <span aria-hidden="true" />
        </a>
        <div className="nav-links">
          <a className={activeSection === "about" ? "is-active" : ""} href="#about">关于</a>
          <a className={activeSection === "projects" ? "is-active" : ""} href="#projects">项目</a>
          <a className={activeSection === "exploration" ? "is-active" : ""} href="#exploration">探索</a>
          <a className={activeSection === "strengths" || activeSection === "contact" ? "is-active" : ""} href="#strengths">实践</a>
        </div>
        <a
          className="nav-cta"
          href={appPath("/resume")}
        >
          <span>查看简历</span>
        </a>
      </nav>

      <div className="opening-canvas">
        <div className="hero-fluid" aria-hidden="true">
          <video
            className="hero-video"
            poster="/assets/hero-fluid-v2.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            width="1440"
            height="810"
          >
            <source src="/assets/hero-aura-video.webm" type='video/webm; codecs="vp9"' />
            <source src="/assets/hero-aura-video.mp4" type='video/mp4; codecs="avc1.640028"' />
          </video>
        </div>
      <section className="hero" id="top">
        <div className="hero-content page-shell" data-reveal>
          <p className="hero-period">2023-2026</p>
          <h1>DESIGN JOURNAL</h1>
          <p className="hero-description">记录产品设计、探索体验与视觉的多种可能</p>
          <div className="hero-actions">
            <a className="primary-action" href="#projects">
              <span>探索作品</span>
              <span className="action-rule" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="resume-card-stage">
          <div className="resume-card" data-reveal>
          <aside className="resume-profile">
            <div className="resume-photo">
              <img src="/assets/profile.jpg" alt="刘雪源个人形象照" loading="lazy" decoding="async" />
              <span className="photo-glow" aria-hidden="true" />
            </div>
            <div className="resume-identity">
              <strong>PRODUCT DESIGNER</strong>
              <span>SaaS · Web · Design System</span>
            </div>
            <div className="resume-contact">
              <p className="resume-heading">联系方式</p>
              <a href="mailto:liuxueyuan599@163.com"><span>邮箱</span>liuxueyuan599@163.com</a>
              <p><span>所在地</span>上海</p>
            </div>
          </aside>

          <div className="resume-content">
            <header className="resume-intro">
              <div className="resume-wordmark">
                <p className="resume-hello">Hello! I’m</p>
                <div>
                  <h2>LIU XUEYUAN<span>.</span></h2>
                </div>
                <div className="resume-summary-tags">
                  <span>5 年 + 经验</span>
                  <span>SaaS 产品</span>
                  <span>Web 设计</span>
                  <span>Design System</span>
                  <span>AI 辅助设计</span>
                </div>
              </div>
            </header>
            <div className="resume-divider" />
            <div className="resume-grid">
              <section className="resume-experience">
                <p className="resume-heading">工作经历</p>
                <div className="experience-list">
                  {experience.map((item) => (
                    <article className="experience-item" key={item.company}>
                      <time>{item.period}</time>
                      <div>
                        <h3>{item.company}</h3>
                        <strong>{item.role}</strong>
                        {item.summary ? <p className={item.noWrap ? "experience-nowrap" : undefined}>{item.summary}</p> : item.place && <p>{item.place} <span>/</span> 中国</p>}
                        {item.highlights && (
                          <ul className="experience-highlights">
                            {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                          </ul>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
              <div className="resume-side-info">
                <section className="resume-advantages">
                  <p className="resume-heading">设计方向</p>
                  <p className="design-direction-copy">
                    专注企业级产品与 SaaS 平台设计，擅长从复杂业务中梳理信息结构，
                    通过系统化设计语言打造一致、高效的数字体验。<br />
                    探索 AI 在设计流程中的应用，辅助方案探索、视觉生成与效率提升。
                  </p>
                </section>
                <section className="design-philosophy">
                  <p className="resume-heading">设计理念</p>
                  <p>
                    <strong>好的设计，</strong><br />
                    让复杂的信息变得简单，<br />
                    让产品体验更加自然。
                  </p>
                </section>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="section-label">Profile</div>
        <div className="about-layout">
          <div className="portrait-card" data-reveal>
            <img src="/assets/profile.jpg" alt="刘雪源个人形象照" loading="lazy" decoding="async" />
            <div className="portrait-caption">
              <span>UI/UX Designer</span>
              <strong>Shanghai</strong>
            </div>
          </div>

          <div className="about-copy" data-reveal>
            <p className="section-kicker">个人经历</p>
            <h2>设计专业背景，聚焦产品逻辑、视觉一致性与真实落地。</h2>
            <p>
              统招本科视觉传达设计背景，具备 UI 设计、产品流程理解、手绘基础与创新思维。
              工作中参与企业官网、小程序、App、PC 端后台系统与宣传物料设计，能够配合产品经理完成产品框架、
              DEMO 原型、界面设计、组件规范和开发交付。
            </p>
            <p>
              简历经历包含上海炫芃文化传播有限公司与山西诺阿科技有限公司，项目覆盖电商优惠小程序、
              增长管理后台、精准营销平台、概念书店 App 与女包品牌官网等方向。
            </p>

            <div className="contact-strip">
              <a href="tel:15535432414">15535432414</a>
              <a href="mailto:liuxueyuan599@163.com">liuxueyuan599@163.com</a>
            </div>

            <div className="metrics-grid">
              {metrics.map((item) => (
                <div className="metric-card" key={item.label} data-reveal>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>

      <div
        className="logo-marquee"
        aria-label="Design tools: Premiere Pro, Photoshop, Illustrator, After Effects, Sketch, ChatGPT, Figma, Blender"
      >
        <div className="logo-marquee-track" aria-hidden="true">
          {[0, 1].map((group) => (
            <div className="logo-marquee-group" key={group}>
              {marqueeLogos.map((logo) => (
                <span className="logo-marquee-item" key={`${group}-${logo.name}`}>
                  <span className="logo-marquee-icon">
                    <img src={logo.image} alt="" loading="lazy" decoding="async" />
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="projects section" id="projects">
        <div className="page-shell">
          <div className="projects-heading content-section-heading">
            <h2>精选项目</h2>
            <p>记录产品设计实践，探索体验、系统与视觉之间的可能。</p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <ProjectCard project={project} key={project.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="exploration section" id="exploration">
        <div className="page-shell">
          <div className="exploration-heading content-section-heading" data-reveal>
            <h2>视觉探索</h2>
            <p>探索产品设计之外的视觉表达，通过 3D、插画与品牌视觉设计，拓展数字体验中的更多可能。</p>
          </div>

          <div className="exploration-grid">
            {explorationColumns.map((column, columnIndex) => (
              <div className={`exploration-column column-${columnIndex + 1}`} key={`column-${columnIndex + 1}`}>
                {column.map((work, workIndex) => (
                  <article
                    className="exploration-card"
                    key={work.title}
                    tabIndex={0}
                    role="button"
                    aria-label={`放大查看${work.title}`}
                    data-reveal
                    onClick={() => setSelectedExplorationWork(work)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedExplorationWork(work);
                      }
                    }}
                    style={{
                      "--work-ratio": work.ratio,
                      "--reveal-delay": `${(columnIndex * 3 + workIndex) * 55}ms`,
                    }}
                  >
                    {work.image ? (
                      <img
                        className="exploration-image"
                        src={work.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        style={{ objectPosition: work.previewPosition ?? "center" }}
                        aria-hidden="true"
                      />
                    ) : (
                      <div
                        className={`exploration-art ${work.cell ?? ""}`}
                        aria-hidden="true"
                      />
                    )}
                    <div className="exploration-overlay">
                      <span>{work.type}</span>
                      <h3>{work.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>

          <div className="exploration-more" data-reveal>
            <a className="exploration-more-action" href={appPath("/exploration")} aria-label="查看全部探索作品">
              <span>查看更多</span>
            </a>
          </div>
        </div>
      </section>

      {selectedExplorationWork && (
        <div
          className={`gallery-lightbox-backdrop ${selectedExplorationWork.category === "其他" ? "is-long" : ""}`}
          onMouseDown={() => setSelectedExplorationWork(null)}
        >
          <section
            className={`gallery-lightbox ${selectedExplorationWork.category === "其他" ? "is-long" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-gallery-lightbox-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="gallery-lightbox-close"
              type="button"
              ref={explorationCloseRef}
              onClick={() => setSelectedExplorationWork(null)}
              aria-label="关闭作品预览"
              title="关闭"
            >
              ×
            </button>
            <div
              className={`gallery-lightbox-visual ${selectedExplorationWork.image ? "has-image" : ""} ${selectedExplorationWork.category === "其他" ? "is-long" : ""}`}
              style={{ "--work-ratio": selectedExplorationWork.ratio }}
            >
              {selectedExplorationWork.image ? (
                <img
                  className="gallery-lightbox-image"
                  src={selectedExplorationWork.image}
                  alt=""
                  aria-hidden="true"
                />
              ) : (
                <div
                  className={`gallery-lightbox-art exploration-art ${selectedExplorationWork.cell ?? ""}`}
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="gallery-lightbox-copy">
              <span>{selectedExplorationWork.type}</span>
              <h2 id="home-gallery-lightbox-title">{selectedExplorationWork.title}</h2>
            </div>
          </section>
        </div>
      )}

      <section className="strengths page-shell section" id="strengths">
        <div className="section-header content-section-heading">
          <div>
            <h2>设计实践</h2>
          </div>
          <p>探索 AI 与设计流程结合，通过智能辅助提升效率，同时保持设计判断与体验价值。</p>
        </div>

        <div data-reveal>
          <ChromaGrid
            items={practiceChromaItems}
            radius={320}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>
      </section>

      <section className="contact-finale" id="contact">
        <div className="contact-fluid" ref={contactVideoRef} aria-hidden="true">
          <video
            key={contactVideoReady ? "contact-video-ready" : "contact-video-idle"}
            className="contact-video"
            poster="/assets/contact-fluid-frame.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            width="1440"
            height="810"
          >
            {contactVideoReady && (
              <>
                <source src="/assets/hero-aura-video.webm" type='video/webm; codecs="vp9"' />
                <source src="/assets/hero-aura-video.mp4" type='video/mp4; codecs="avc1.640028"' />
              </>
            )}
          </video>
        </div>
        <div className="page-shell finale-inner" data-reveal>
          <div className="finale-content">
            <h2>KEEP EXPLORING</h2>
            <p className="finale-description">
              感谢你的浏览，会持续记录设计探索<br />
              期待未来与你一起，通过设计创造更清晰、更高效的产品体验。
            </p>
            <div className="finale-actions">
              <a className="finale-primary" href={appPath(`/projects/${projects[0].slug}`)}><span>查看项目</span></a>
              <button type="button" onClick={() => setContactOpen(true)}><span>联系我</span></button>
            </div>
          </div>
        </div>
        <footer className="contact-footer">
          <div className="page-shell finale-foot">
            <span>LXY.</span>
            <span>UI/UX Designer.</span>
            <span>SaaS · Web · Design System</span>
            <span>Portfolio ©2026</span>
          </div>
        </footer>
      </section>

      {contactOpen && (
        <div
          className="contact-modal-backdrop"
          onMouseDown={() => setContactOpen(false)}
          role="presentation"
        >
          <section
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              ref={contactCloseRef}
              className="contact-modal-close"
              type="button"
              aria-label="关闭联系弹窗"
              onClick={() => setContactOpen(false)}
            >
              <img src="/assets/contact-close-source.png" alt="" aria-hidden="true" />
            </button>

            <div className="contact-modal-intro">
              <div className="contact-modal-heading">
                <h2 id="contact-modal-title">LET’S<br />CONNECT!</h2>
              </div>
              <span className="contact-modal-rule" aria-hidden="true" />
              <p>期待与您交流合作，<br />一起创造更多有价值的设计。</p>
              <img
                className="contact-modal-art"
                src="/assets/contact-envelope-v1.webp"
                alt=""
                aria-hidden="true"
              />
            </div>

            <div className="contact-modal-details">
              <a className="contact-method" href="mailto:liuxueyuan599@163.com">
                <img className="contact-method-icon" src="/assets/contact-email-source.png" alt="" aria-hidden="true" />
                <strong>邮箱</strong>
                <span>liuxueyuan599@163.com</span>
              </a>
              <span className="contact-method-divider" aria-hidden="true" />
              <a className="contact-method" href="tel:15535432414">
                <img className="contact-method-icon" src="/assets/contact-phone-source.png" alt="" aria-hidden="true" />
                <strong>电话</strong>
                <span>155 3543 2414</span>
              </a>
            </div>
          </section>
        </div>
      )}

      <a
        className={`back-to-top ${navScrolled ? "is-visible" : ""}`}
        href="#top"
        aria-label="返回顶部"
        title="返回顶部"
      >
        ↑
      </a>

    </main>
  );
}

function RootApp() {
  const getCurrentPath = () => {
    const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
    if (!appBasePath || !pathname.startsWith(appBasePath)) return pathname;
    return pathname.slice(appBasePath.length) || "/";
  };
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  useEffect(() => {
    const onPopState = () => setCurrentPath(getCurrentPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const switchProject = (slug) => {
    const nextPath = `/projects/${slug}`;
    if (nextPath === currentPath) return;
    window.history.pushState({}, "", appPath(nextPath));
    setCurrentPath(nextPath);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  if (currentPath === "/exploration") return <ExplorationPage />;
  if (currentPath === "/resume") return <ResumePage />;
  if (currentPath.startsWith("/projects/")) {
    const projectSlug = currentPath.split("/").pop();
    const project = projects.find((item) => item.slug === projectSlug);
    if (project) return <ProjectDetailPage project={project} onProjectChange={switchProject} />;
  }
  return <App />;
}

export default RootApp;
