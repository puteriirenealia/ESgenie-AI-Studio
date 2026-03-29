export interface ESGData {
  companyName: string;
  industry: string;
  electricityKwh: number;
  fuelLitres: number;
  wasteKg: number;
  recycledKg: number;
  waterM3: number;
  totalEmployees: number;
  womenLeadershipPct: number;
  trainingHours: number;
  localSupplierPct: number;
  antiBriberyPolicy: string;
  dataPrivacyStatus: string;
  esgPolicyStatus: string;
}

export interface AgentLog {
  type: 'PLAN' | 'TOOL' | 'REFLECTION' | 'REPORT' | 'VISION' | 'RESULT';
  message: string;
  detail?: string;
}

export interface AnalysisResult {
  scores: {
    environment: number;
    social: number;
    governance: number;
    total: number;
  };
  metrics: {
    carbon_tco2e: number;
    waste_diversion_pct: number;
    diversity_pct: number;
  };
  report: string;
  logs: AgentLog[];
}
