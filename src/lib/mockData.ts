// Mock data for Xai Intelligence Workspace

export const kpiData = [
  {
    id: "data-points",
    label: "Data Points Processed",
    value: 2_847_391,
    delta: "+12.4%",
    positive: true,
    unit: "",
  },
  {
    id: "insights",
    label: "Insights Generated",
    value: 1_284,
    delta: "+8.7%",
    positive: true,
    unit: "",
  },
  {
    id: "accuracy",
    label: "Model Accuracy",
    value: 98.6,
    delta: "+0.3%",
    positive: true,
    unit: "%",
  },
  {
    id: "latency",
    label: "Avg. Latency",
    value: 42,
    delta: "-18ms",
    positive: true,
    unit: "ms",
  },
];

export const chartData = [
  { time: "00:00", insights: 42, anomalies: 3, processed: 1200 },
  { time: "02:00", insights: 58, anomalies: 5, processed: 1450 },
  { time: "04:00", insights: 39, anomalies: 2, processed: 980 },
  { time: "06:00", insights: 72, anomalies: 7, processed: 1800 },
  { time: "08:00", insights: 95, anomalies: 4, processed: 2300 },
  { time: "10:00", insights: 128, anomalies: 9, processed: 3100 },
  { time: "12:00", insights: 147, anomalies: 6, processed: 3600 },
  { time: "14:00", insights: 163, anomalies: 11, processed: 3950 },
  { time: "16:00", insights: 189, anomalies: 8, processed: 4200 },
  { time: "18:00", insights: 201, anomalies: 13, processed: 4580 },
  { time: "20:00", insights: 174, anomalies: 7, processed: 3900 },
  { time: "22:00", insights: 142, anomalies: 5, processed: 3200 },
];

export const tableData = [
  {
    id: "INS-0041",
    source: "Sales Pipeline",
    insight: "Q3 conversion rate declining in EMEA segment",
    confidence: 97,
    priority: "Critical",
    time: "2m ago",
  },
  {
    id: "INS-0040",
    source: "Customer Churn",
    insight: "Cohort 2024-Q2 shows 3× higher churn probability",
    confidence: 94,
    priority: "High",
    time: "8m ago",
  },
  {
    id: "INS-0039",
    source: "Supply Chain",
    insight: "Inventory anomaly detected: SKU-8821 overstock",
    confidence: 91,
    priority: "Medium",
    time: "15m ago",
  },
  {
    id: "INS-0038",
    source: "User Behavior",
    insight: "Feature adoption spike: AI Copilot +340% WoW",
    confidence: 99,
    priority: "High",
    time: "23m ago",
  },
  {
    id: "INS-0037",
    source: "Financial",
    insight: "Margin compression risk in Q4 forecast",
    confidence: 88,
    priority: "Medium",
    time: "41m ago",
  },
];

export const navItems = [
  { icon: "grid", label: "Overview", id: "overview" },
  { icon: "zap", label: "Insights", id: "insights", badge: 12 },
  { icon: "bar-chart", label: "Analytics", id: "analytics" },
  { icon: "database", label: "Data Sources", id: "data-sources" },
  { icon: "cpu", label: "AI Models", id: "ai-models" },
  { icon: "bell", label: "Alerts", id: "alerts", badge: 3 },
];

export const insightFlowStages = [
  {
    id: "ingest",
    number: "01",
    title: "Ingest Data",
    subtitle: "Any source, any format",
    description:
      "Connect to 200+ data sources in minutes. Xai normalizes structured, semi-structured, and unstructured data into a unified intelligence layer — without pipelines, without code.",
    tags: ["REST APIs", "CSV / Parquet", "Webhooks", "Streaming", "SQL / NoSQL"],
    color: "#06B6D4",
  },
  {
    id: "analyze",
    number: "02",
    title: "Analyze with AI",
    subtitle: "Deep pattern recognition",
    description:
      "Purpose-built AI models run continuously on your data — detecting anomalies, correlating signals across domains, and surfacing patterns that no human analyst could see at scale.",
    tags: ["Anomaly Detection", "Correlation Engine", "Forecasting", "NLP", "Clustering"],
    color: "#7C3AED",
  },
  {
    id: "insight",
    number: "03",
    title: "Generate Insight",
    subtitle: "From signal to decision",
    description:
      "Every insight arrives as a crisp, actionable briefing — with confidence scores, root cause analysis, and a recommended action. Designed for decision-makers, not data engineers.",
    tags: ["Confidence Scores", "Root Cause", "Actions", "Auto-Reports", "Alerts"],
    color: "#10B981",
  },
];
