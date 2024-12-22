import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MenuItem, Select, FormControl, InputLabel, Grid } from "@mui/material";

export default function BasicEditingGrid() {
  const [filterYear, setFilterYear] = useState("");
  const [filterSemester, setFilterSemester] = useState("");
  const [filterSubject, setFilterSubject] = useState("");

  const handleYearChange = (event) => {
    setFilterYear(event.target.value);
    setFilterSemester(""); // Reset semester when year changes
    setFilterSubject(""); // Reset subject when year changes
  };

  const handleSemesterChange = (event) => {
    setFilterSemester(event.target.value);
    setFilterSubject(""); // Reset subject when semester changes
  };

  const handleSubjectChange = (event) => {
    setFilterSubject(event.target.value);
  };

  const filteredSubjects =
    filterYear && filterSemester
      ? subjects[filterYear][filterSemester] || []
      : [];
  const getRandomSubject = () =>
    filteredSubjects[Math.floor(Math.random() * filteredSubjects.length)] || "";

  const columns = [
    {
      field: "day",
      headerName: "Day",
      width: 180,
      editable: false,
    },
    ...Array.from({ length: 5 }, (_, index) => ({
      field: `period${index + 1}`,
      headerName: `Period ${index + 1}`,
      width: 220,
      editable: true,
      renderCell: (params) =>
        !filterSubject || params.value === filterSubject ? params.value : "",
      renderEditCell: (params) => (
        <Select
          defaultValue={params.value}
          onChange={(e) =>
            params.api.setEditCellValue({
              id: params.id,
              field: `period${index + 1}`,
              value: e.target.value,
            })
          }
          fullWidth
        >
          {filteredSubjects.map((subject) => (
            <MenuItem key={subject} value={subject}>
              {subject}
            </MenuItem>
          ))}
        </Select>
      ),
    })),
  ];
  const rows = [
    {
      id: 1,
      day: "Monday",
      period1: getRandomSubject(),
      period2: getRandomSubject(),
      period3: getRandomSubject(),
      period4: getRandomSubject(),
      period5: getRandomSubject(),
    },
    {
      id: 2,
      day: "Tuesday",
      period1: getRandomSubject(),
      period2: getRandomSubject(),
      period3: getRandomSubject(),
      period4: getRandomSubject(),
      period5: getRandomSubject(),
    },
    {
      id: 3,
      day: "Wednesday",
      period1: getRandomSubject(),
      period2: getRandomSubject(),
      period3: getRandomSubject(),
      period4: getRandomSubject(),
      period5: getRandomSubject(),
    },
    {
      id: 4,
      day: "Thursday",
      period1: getRandomSubject(),
      period2: getRandomSubject(),
      period3: getRandomSubject(),
      period4: getRandomSubject(),
      period5: getRandomSubject(),
    },
    {
      id: 5,
      day: "Friday",
      period1: getRandomSubject(),
      period2: getRandomSubject(),
      period3: getRandomSubject(),
      period4: getRandomSubject(),
      period5: getRandomSubject(),
    },
    {
      id: 6,
      day: "Satarday",
      period1: getRandomSubject(),
      period2: getRandomSubject(),
      period3: getRandomSubject(),
      period4: getRandomSubject(),
      period5: getRandomSubject(),
    },
  ];
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Year</InputLabel>
          <Select value={filterYear} onChange={handleYearChange}>
            <MenuItem value="">All Years</MenuItem>
            {Object.keys(subjects).map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Semester</InputLabel>
          <Select
            value={filterSemester}
            onChange={handleSemesterChange}
            disabled={!filterYear}
          >
            <MenuItem value="">All Semesters</MenuItem>
            {filterYear &&
              Object.keys(subjects[filterYear]).map((semester) => (
                <MenuItem key={semester} value={semester}>
                  {semester}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Subject</InputLabel>
          <Select
            value={filterSubject}
            onChange={handleSubjectChange}
            disabled={!filterYear || !filterSemester}
          >
            <MenuItem value="">All Subjects</MenuItem>
            {filteredSubjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 435, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            onRowEditCommit={(params) => console.log("Row updated:", params)}
          />
        </div>
      </Grid>
    </Grid>
  );
}


const subjects = {
  "1st Year": {
    "Semester 1": [
      "C PROGRAMMING",
      "LOGIC THEORY",
      "INFORMATION TECHNOLOGY",
      "MATHS",
      "BUSINESS ECONOMICS",
      "COMMUNICATION SKILLS",
    ],
    "Semester 2": [
      "C PROGRAMMING",
      "LOGIC THEORY",
      "INFORMATION TECHNOLOGY",
      "MATHS",
      "BUSINESS ECONOMICS",
      "COMMUNICATION SKILLS",
    ], // Add specific subjects if needed
    "Semester 3": [
      "C PROGRAMMING",
      "LOGIC THEORY",
      "INFORMATION TECHNOLOGY",
      "MATHS",
      "BUSINESS ECONOMICS",
      "COMMUNICATION SKILLS",
    ], // Add specific subjects if needed
  },
  "2nd Year": {
    "Semester 1": [
      "JAVA-OOPS THROUGH JAVA",
      "MATHEMATICAL FOUNDATIONS FOR DATA SCIENCE",
      "PRINCIPLES OF MARKETING",
      "DATABASE MANAGEMENT SYSTEMS",
      "DATA COMMUNICATION COMPUTER NETWORK",
      "LEADERSHIP AND MANAGEMENT SKILLS",
    ],
    "Semester 2": [
      "JAVA-OOPS THROUGH JAVA",
      "MATHEMATICAL FOUNDATIONS FOR DATA SCIENCE",
      "PRINCIPLES OF MARKETING",
      "DATABASE MANAGEMENT SYSTEMS",
      "DATA COMMUNICATION COMPUTER NETWORK",
      "LEADERSHIP AND MANAGEMENT SKILLS",
    ], // Add specific subjects if needed
    "Semester 3": [
      "JAVA-OOPS THROUGH JAVA",
      "MATHEMATICAL FOUNDATIONS FOR DATA SCIENCE",
      "PRINCIPLES OF MARKETING",
      "DATABASE MANAGEMENT SYSTEMS",
      "DATA COMMUNICATION COMPUTER NETWORK",
      "LEADERSHIP AND MANAGEMENT SKILLS",
    ], // Add specific subjects if needed
  },
  "3rd Year": {
    "Semester 1": [
      "R-Data Science Using R Programming",
      "DTI-Design Thinking For Innovation",
      "DSS-Decision Support Systems",
      "SE-Software Engineering",
      "CD-Compiler Design",
      "OB-Organizational Behaviour",
      "SPORTS",
    ],
    "Semester 2": [
      "R-Data Science Using R Programming",
      "DTI-Design Thinking For Innovation",
      "DSS-Decision Support Systems",
      "SE-Software Engineering",
      "CD-Compiler Design",
      "OB-Organizational Behaviour",
      "SPORTS",
    ],
    "Semester 3": [
      "R-Data Science Using R Programming",
      "DTI-Design Thinking For Innovation",
      "DSS-Decision Support Systems",
      "SE-Software Engineering",
      "CD-Compiler Design",
      "OB-Organizational Behaviour",
      "SPORTS",
    ],
    "Semester 4": [
      "R-Data Science Using R Programming",
      "DTI-Design Thinking For Innovation",
      "DSS-Decision Support Systems",
      "SE-Software Engineering",
      "CD-Compiler Design",
      "OB-Organizational Behaviour",
      "SPORTS",
    ],
  },
  "4th Year": {
    "Semester 1": [
      "Machine Learning",
      "AI Ethics",
      "Data Analysis",
      "Cloud Computing",
      "Blockchain",
      "Quantum Physics",
    ],
    "Semester 2": [
      "Machine Learning",
      "AI Ethics",
      "Data Analysis",
      "Cloud Computing",
      "Blockchain",
      "Quantum Physics",
    ],
    "Semester 3": [
      "Machine Learning",
      "AI Ethics",
      "Data Analysis",
      "Cloud Computing",
      "Blockchain",
      "Quantum Physics",
    ],
  },
};
