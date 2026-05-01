import type { Department } from "@/data/categories";

const POOL: Record<Department, string[]> = {
  "Emergency Services":      ["Insp. R. Solanki", "Insp. M. Jadeja"],
  "Police":                  ["SI K. Patel", "SI A. Vasava"],
  "Buildings & Planning":    ["Eng. P. Mistry", "Eng. S. Desai"],
  "Roads & Transport":       ["Eng. H. Patel", "Eng. V. Rana"],
  "Water Board":             ["Off. N. Shah", "Off. R. Modi"],
  "Electricity (DGVCL)":     ["JE B. Tandel", "JE D. Naik"],
  "Drainage & Sanitation":   ["Off. K. Solanki", "Off. P. Gohil"],
  "Solid Waste":             ["Sup. J. Vasava", "Sup. M. Rathod"],
  "Health Office":           ["Dr. A. Mehta", "Dr. R. Pandya"],
  "Land & Revenue":          ["Tehsildar P. Joshi"],
  "Social Welfare":          ["Off. S. Chauhan"],
  "Education":               ["BEO M. Trivedi"],
  "Licences & Trade":        ["Off. K. Bhatt"],
  "Disaster & Environment":  ["Off. R. Parmar"],
  "Governance / RTI":        ["PIO V. Shukla"],
};

export const pickOfficer = (dept: Department) => {
  const list = POOL[dept] ?? ["Officer on duty"];
  return list[Math.floor(Math.random() * list.length)];
};
