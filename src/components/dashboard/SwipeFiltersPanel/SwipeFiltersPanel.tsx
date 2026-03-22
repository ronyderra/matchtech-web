"use client";

import { useState } from "react";
import styles from "./SwipeFiltersPanel.module.css";

const SENIORITY = ["Any", "Junior", "Mid", "Senior", "Lead", "Principal"];
const EMPLOYMENT = ["Any", "Full-time", "Part-time", "Contract", "Internship"];
const WORK_MODEL = ["Any", "Remote", "Hybrid", "On-site"];
const COMPANY_SIZE = ["Any", "1–50", "51–200", "201–1000", "1000+"];
const INDUSTRY = [
  "Any",
  "Software & internet",
  "Finance & banking",
  "Healthcare & biotech",
  "Retail & e-commerce",
  "Manufacturing",
  "Media & entertainment",
  "Education",
  "Government & nonprofit",
  "Other",
];
const DEPARTMENT = [
  "Any",
  "Engineering",
  "Product",
  "Design",
  "Data & analytics",
  "Infrastructure & DevOps",
  "Security",
  "Sales & GTM",
  "Operations",
  "Other",
];
const YEARS_EXP = ["Any", "0–2 years", "3–5 years", "6–10 years", "10+ years"];

/** Filter rows (see table body below). */
export function SwipeFiltersPanel() {
  const [seniority, setSeniority] = useState("Any");
  const [department, setDepartment] = useState("Any");
  const [industry, setIndustry] = useState("Any");
  const [employment, setEmployment] = useState("Any");
  const [workModel, setWorkModel] = useState("Any");
  const [yearsExp, setYearsExp] = useState("Any");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [location, setLocation] = useState("");
  const [companySize, setCompanySize] = useState("Any");

  return (
    <aside className={styles.root} aria-label="Job filters">
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Filter</th>
              <th scope="col">Your choice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.labelCell}>Seniority</td>
              <td>
                <select
                  className={styles.control}
                  value={seniority}
                  onChange={(e) => setSeniority(e.target.value)}
                  aria-label="Seniority"
                >
                  {SENIORITY.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className={styles.labelCell}>Department</td>
              <td>
                <select
                  className={styles.control}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  aria-label="Department or function"
                >
                  {DEPARTMENT.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className={styles.labelCell}>Industry</td>
              <td>
                <select
                  className={styles.control}
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  aria-label="Industry"
                >
                  {INDUSTRY.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className={styles.labelCell}>Employment</td>
              <td>
                <select
                  className={styles.control}
                  value={employment}
                  onChange={(e) => setEmployment(e.target.value)}
                  aria-label="Employment type"
                >
                  {EMPLOYMENT.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className={styles.labelCell}>Work model</td>
              <td>
                <select
                  className={styles.control}
                  value={workModel}
                  onChange={(e) => setWorkModel(e.target.value)}
                  aria-label="Work model"
                >
                  {WORK_MODEL.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className={styles.labelCell}>Years experience</td>
              <td>
                <select
                  className={styles.control}
                  value={yearsExp}
                  onChange={(e) => setYearsExp(e.target.value)}
                  aria-label="Years of experience"
                >
                  {YEARS_EXP.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className={styles.labelCell}>Min salary (USD)</td>
              <td>
                <input
                  className={styles.control}
                  type="number"
                  min={0}
                  step={1000}
                  placeholder="e.g. 150000"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  aria-label="Minimum salary"
                />
              </td>
            </tr>
            <tr>
              <td className={styles.labelCell}>Max salary (USD)</td>
              <td>
                <input
                  className={styles.control}
                  type="number"
                  min={0}
                  step={1000}
                  placeholder="e.g. 250000"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  aria-label="Maximum salary"
                />
              </td>
            </tr>
            <tr>
              <td className={styles.labelCell}>Location</td>
              <td>
                <input
                  className={styles.control}
                  type="text"
                  placeholder="City, country, or remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  aria-label="Location"
                />
              </td>
            </tr>
            <tr>
              <td className={styles.labelCell}>Company size</td>
              <td>
                <select
                  className={styles.control}
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  aria-label="Company size"
                >
                  {COMPANY_SIZE.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.applyBtn}>
          Apply filters
        </button>
        <button
          type="button"
          className={styles.resetBtn}
          onClick={() => {
            setSeniority("Any");
            setDepartment("Any");
            setIndustry("Any");
            setEmployment("Any");
            setWorkModel("Any");
            setYearsExp("Any");
            setMinSalary("");
            setMaxSalary("");
            setLocation("");
            setCompanySize("Any");
          }}
        >
          Reset
        </button>
      </div>
    </aside>
  );
}
