import { InputFields } from "@/types/types";

export const searchInputFields: InputFields[] = [
  {
    type: "text",
    name: "search",
    placeholder: "",
    label: "Search",
  },
];

export const securityClassForm: InputFields[] = [
  {
    type: "text",
    name: "name",
    placeholder: "",
    label: "Security class",
    min: "0",
  },
  {
    type: "number",
    name: "authorizedAmount",
    placeholder: "",
    label: "Authorized amount",
    min: "0",
  },
  {
    type: "number",
    name: "issuedAmount",
    placeholder: "",
    label: "Issued amount",
    min: "0",
  },
  {
    type: "number",
    name: "authorizedCapital",
    placeholder: "",
    label: "Authorized Capital",
    min: "0",
  },
  {
    type: "number",
    name: "issuedCapital",
    placeholder: "",
    label: "Issued capital",
    min: "0",
  },
];
