const heroDescription =
  "可观测性平台用于统一采集、存储、查询和关联 Metrics、Logs、Traces、RUM、Profile、Kubernetes、云资源、事件和业务指标，让研发、SRE、运维和平台团队从同一上下文理解系统为什么异常、影响哪些服务以及应该由谁处理。";

const exactSections = [
  {
    key: "background",
    src: "/assets/guance-exact/background@2x.png",
    height: 763,
    alt: "观测云项目背景、迭代背景、我的职责与业务诉求",
  },
  {
    key: "feedback",
    src: "/assets/guance-exact/feedback@2x-v2.png",
    height: 842,
    alt: "观测云用户反馈与内部自查",
  },
  {
    key: "strategy",
    src: "/assets/guance-exact/strategy@2x.png",
    height: 952,
    alt: "观测云设计目标及策略",
  },
  {
    key: "standards",
    src: "/assets/guance-exact/standards@2x.png",
    height: 1215,
    alt: "观测云颜色、文字、布局、间距、圆角、图表与图标设计规范",
  },
  {
    key: "components",
    src: "/assets/guance-2x/components/export.png",
    height: 1217,
    alt: "观测云组件化设计与组件界面示例",
  },
  {
    key: "ai",
    src: "/assets/guance-2x/ai/export.png",
    height: 1289,
    alt: "观测云 AI 助手设计与产品界面",
  },
  {
    key: "agent",
    src: "/assets/guance-2x/agent/export.png",
    height: 1086,
    alt: "观测云 Agent 可观测设计与产品界面",
  },
  {
    key: "error",
    src: "/assets/guance-2x/error/export.png",
    height: 2355,
    alt: "观测云错误追踪设计与产品界面",
  },
  {
    key: "incident",
    src: "/assets/guance-2x/incident/export.png",
    height: 2062,
    alt: "观测云事件管理设计与产品界面",
  },
  {
    key: "resource",
    src: "/assets/guance-2x/resource/export.png",
    height: 1434,
    alt: "观测云统一资源目录设计与产品界面",
  },
  {
    key: "final",
    src: "/assets/guance-2x/final/export.png",
    height: 1080,
    alt: "更多观测云产品页面",
    crop: true,
  },
];

function Hero() {
  return (
    <section className="guance-exact-hero" aria-labelledby="guance-title">
      <div className="guance-exact-hero-copy">
        <p className="guance-exact-kicker">GUANCE CLOUD</p>
        <h1 id="guance-title">观测云</h1>
        <h2>AI 时代的可观测平台</h2>
        <p className="guance-exact-lead">{heroDescription}</p>
        <span className="guance-exact-mark" aria-hidden="true" />
      </div>
      <div className="guance-exact-hero-art" aria-hidden="true">
        <img
          src="/assets/guance-2x/hero/hero-export.png"
          alt=""
          width="3840"
          height="1800"
          fetchPriority="high"
        />
      </div>
      <span className="guance-exact-hero-mask" aria-hidden="true" />
    </section>
  );
}

function ExactSection({ section }) {
  const style = section.crop
    ? { "--section-height": `${section.height}px` }
    : { aspectRatio: `1920 / ${section.height}` };

  return (
    <section
      className={`guance-exact-section${section.crop ? " is-cropped" : ""}`}
      style={style}
      aria-label={section.alt}
    >
      <img src={section.src} alt={section.alt} loading="lazy" decoding="async" />
    </section>
  );
}

export default function GuanceProjectDetail({ nav }) {
  return (
    <main className="project-detail-page guance-exact-page">
      {nav}
      <div className="guance-exact-canvas">
        <Hero />
        {exactSections.map((section) => (
          <ExactSection key={section.key} section={section} />
        ))}
      </div>
    </main>
  );
}
