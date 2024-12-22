import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const initialTimetable = [
  ["Crt", "Crt", "Crt", "", ""], // Monday
  ["", "", "", "", ""], // Tuesday
  ["", "", "", "", ""], // Wednesday
  ["", "", "", "", ""], // Thursday
  ["", "", "", "", ""], // Friday
];

const App = () => {
  const [timetable, setTimetable] = useState(initialTimetable);
  const [removedSubjects, setRemovedSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [selectedDay, setSelectedDay] = useState(0); // Default to Monday (index 0)
  const [selectedSlot, setSelectedSlot] = useState(0); // Default to first time slot

  // Handle adding subject to the timetable
  const addSubject = () => {
    if (!subject) return; // Don't allow empty subjects
    const newTimetable = [...timetable];
    newTimetable[selectedDay][selectedSlot] = subject;
    setTimetable(newTimetable);
    setSubject(""); // Clear input field after adding
  };

  // Handle removing a subject and putting it into the big text box
  const removeSubject = (dayIndex, slotIndex) => {
    const newTimetable = [...timetable];
    const removed = newTimetable[dayIndex][slotIndex];

    if (removed) {
      newTimetable[dayIndex][slotIndex] = ""; // Remove from timetable
      setTimetable(newTimetable);

      // Add removed subject to the big text box
      setRemovedSubjects((prevRemoved) => [...prevRemoved, removed]);
    }
  };

  // Detect duplicate subjects in a single day
  const isDuplicateSubject = (dayIndex, subject) => {
    const subjects = timetable[dayIndex];
    return subjects.filter((sub) => sub === subject).length > 1;
  };

  // Handle dropping a subject into the timetable from the text box
  const handleDropToTable = (event, dayIndex, slotIndex) => {
    event.preventDefault();
    const droppedSubject = event.dataTransfer.getData("text");

    if (droppedSubject) {
      const newTimetable = [...timetable];
      newTimetable[dayIndex][slotIndex] = droppedSubject;
      setTimetable(newTimetable);

      // Remove the subject from the removedSubjects list
      setRemovedSubjects(
        removedSubjects.filter((subject) => subject !== droppedSubject)
      );
    }
  };

  // Allow the drop event to fire
  const allowDrop = (event) => {
    event.preventDefault();
  };

  // Handle dragging a subject from the text box back to the table
  const handleDragStart = (event, subject) => {
    event.dataTransfer.setData("text", subject);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Timetable
      </Typography>

      {/* Subject input and selection */}
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Day</InputLabel>
            <Select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              label="Day"
            >
              <MenuItem value={0}>Monday</MenuItem>
              <MenuItem value={1}>Tuesday</MenuItem>
              <MenuItem value={2}>Wednesday</MenuItem>
              <MenuItem value={3}>Thursday</MenuItem>
              <MenuItem value={4}>Friday</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Slot</InputLabel>
            <Select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(Number(e.target.value))}
              label="Slot"
            >
              {[...Array(5)].map((_, i) => (
                <MenuItem key={i} value={i}>
                  Slot {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={addSubject}
          >
            Add Subject
          </Button>
        </Grid>
      </Grid>

      {/* Timetable */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Day/Time</TableCell>
              {[...Array(5)].map((_, i) => (
                <TableCell key={i} align="center">
                  Slot {i + 1}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timetable.map((day, dayIndex) => (
              <TableRow key={dayIndex}>
                <TableCell>
                  {
                    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][
                      dayIndex
                    ]
                  }
                </TableCell>
                {day.map((subject, slotIndex) => (
                  <TableCell
                    key={slotIndex}
                    align="center"
                    sx={{
                      cursor: "move",
                      backgroundColor: isDuplicateSubject(dayIndex, subject)
                        ? "rgba(255, 0, 0, 0.1)"
                        : "rgba(52, 230, 49, 0.1)",
                    }}
                    draggable={subject !== ""}
                    onDragStart={(e) => handleDragStart(e, subject)}
                    onDrop={(e) => handleDropToTable(e, dayIndex, slotIndex)}
                    onDragOver={allowDrop}
                  >
                    {subject ? (
                      <>
                        {subject}
                        <Button
                          size="small"
                          color="error"
                          onClick={() => removeSubject(dayIndex, slotIndex)}
                          sx={{ ml: 1 ,
                            // minWidth: 'auto',
                            
                          }}
                        >
                          <RemoveCircleIcon  />
                        </Button>
                      </>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No Subject
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Big text box to show removed subjects */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          border: "1px dashed #ccc",
          minHeight: 100,
          backgroundColor: "#f9f9f9",
        }}
        onDrop={allowDrop}
        onDragOver={allowDrop}
      >
        <Typography variant="h6" gutterBottom>
          Removed Subjects
        </Typography>
        {removedSubjects.length === 0 && (
          <Typography variant="body2" color="textSecondary">
            No removed subjects.
          </Typography>
        )}
        {removedSubjects.map((removed, index) => (
          <Box
            key={index}
            sx={{
              p: 1,
              m: 1,
              backgroundColor: "#e0e0e0",
              border: "1px solid #ccc",
              cursor: "move",
              borderRadius: "4px",
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, removed)}
          >
            {removed}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default App;
