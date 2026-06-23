export interface ReportData {
  subjectId?: string;
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

export interface SubjectRecord {
  subjectId: string;
  subjectName: string;
  departments: string[];
}

export const subjectRecords: SubjectRecord[] = [
  {
    subjectId: "4065635",
    subjectName: "Priya Sharma",
    departments: ["Biochemistry", "Immunoassay"],
  },
  {
    subjectId: "3142433",
    subjectName: "Rahul Verma",
    departments: ["Biochemistry", "Sample Tracking"],
  },
  {
    subjectId: "5278491",
    subjectName: "Anitha Raj",
    departments: ["Clinical Pathology", "Microbiology"],
  },
  {
    subjectId: "6103287",
    subjectName: "Karthik Naidu",
    departments: ["Immunoassay", "Clinical Pathology"],
  },
  {
    subjectId: "7294156",
    subjectName: "Meena Kumari",
    departments: ["Microbiology", "Sample Tracking"],
  },
  {
    subjectId: "8351074",
    subjectName: "Suresh Babu",
    departments: ["Biochemistry", "Immunoassay", "Sample Tracking"],
  },
];

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