export interface QualityMarker {
  id: string;
  name: string;
  description: string;
  symbol: string;
  value: string;
  status: "verified" | "testing" | "passed";
}

export interface CertificateInfo {
  certificateId: string;
  metal: string;
  purity: string;
  hallmark: string;
  issueDate: string;
  labRef: string;
  status: string;
}
