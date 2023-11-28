interface SecurityClass {
  name: string;
}

interface SecurityHolder {
  fullName: string;
  type: string;
}

export type Transaction = {
  __typename?: "Transaction";
  amount?: number | null;
  forgottenProperty?: string;
  companyId: string | null;
  exDate?: Date | null;
  fromSecurityHolder?: string | null;
  fromSecurityHolderId?: string | null;
  notes?: string | null;
  positionWithinDay: number | null;
  pricePerShare?: number | null;
  recordDate: string | null;
  securityClass?: SecurityClass | null;
  securityClassId: string | null;
  splitFactor?: number | null;
  state: string | null;
  toSecurityHolder?: SecurityHolder | null;
  toSecurityHolderId?: string | null;
  transactionIdentifier: string | null;
  type: string;
};

export type TableData = {
  id?: string;
  name?: string;
  nominalValue?: number;
  authorizedAmount?: number;
  issuedAmount?: number;
  authorizedCapital?: number;
  issuedCapital?: number;
  randomNumber?: number;
  total?: number;
};

export type Column = {
  field: keyof TableData;

  label: string;
};

export type Message = {
  message: string | undefined;
  type: string | undefined;
};

export type ValidationReport = {
  isValid: boolean | null;

  name: string | null | number;
  value: string | number | undefined | null;
};

export type InputFields = {
  label: string | null;
  name: string | null;
  min?: string | null;
  placeholder?: string | null;
  type: string | null;
};
