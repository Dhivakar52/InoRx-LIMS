export interface ReportData {
  department: string;
  title: string;
  preparedBy: string;
  reportDate: string;
  summary: string;
  table: {
    id: number;
    employee: string;
    status: string;
    remarks: string;
  }[];
}
export const departments = [
  "Select Department",
  "Biochemistry",
  "Immunoassay",
  "Clinical Pathology",
  "Microbiology",
  "Sample Tracking",
];
export const reports: ReportData[] = [
  {
    department: "HR",
    title: "HR Department Report",
    preparedBy: "Admin",
    reportDate: "12-06-2025",
    summary: "Employee attendance and leave report.",

    table: [
      {
        id: 1,
        employee: "John",
        status: "Present",
        remarks: "Good"
      },
      {
        id: 2,
        employee: "David",
        status: "Leave",
        remarks: "Medical"
      }
    ]
  },

  {
    department: "Finance",
    title: "Finance Department Report",
    preparedBy: "Admin",
    reportDate: "12-06-2025",

    summary: "Monthly finance report.",

    table: [
      {
        id: 1,
        employee: "Alex",
        status: "Completed",
        remarks: "Verified"
      }
    ]
  },

  {
    department: "IT",
    title: "IT Department Report",
    preparedBy: "Admin",
    reportDate: "12-06-2025",

    summary: "Server Health Report.",

    table: [
      {
        id: 1,
        employee: "Steve",
        status: "Running",
        remarks: "Healthy"
      }
    ]
  }
];