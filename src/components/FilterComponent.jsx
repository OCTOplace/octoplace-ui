import {
  Box,
  Typography,
  TextField,
  Select,
  FormControl,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function FilterComponent({ filterPage }) {
  const [time, setTime] = useState(24);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: "1rem",
      width: "250px",
      minWidth: "250px",
      height: "100%",
      minHeight: "100vh",
      padding: "1rem",
      backgroundColor: "#151515",
      color: "#f4f4f4",
      boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.25)",
      borderRadius: ".75rem",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: "1rem",
    },
    columnShort: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: ".1rem",
      width: "100%",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: ".5rem",
    },
    checkboxRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    boxRow: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: ".1rem",
    },
    checkbox: {
      color: "#6C6C6C",
      "&.Mui-checked": {
        color: "#F78C09",
      },
    },
    p: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    accordion: {
      backgroundColor: "transparent",
      color: "#f4f4f4",
      border: "none",
      boxShadow: "none",
      width: "100%",
    },
    accordionHeader: {
      fontWeight: 400,
      fontsize: "1rem",
      px: 0,
    },
    accordionBody: {
      backgroundColor: "#151515",
      display: "flex",
      flexDirection: "column",
      gap: 1,
    },
  };

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  if (filterPage === "Market") {
    return (
      <Box sx={styles.container}>
        <Box sx={styles.column}>
          <Typography variant="h6">Price</Typography>
          <Box sx={styles.row}>
            <TextField
              type="url"
              variant="standard"
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
              hiddenLabel
              className="input-wo-padding"
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#6c6c6c",
                },
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  padding: "0",
                },
              }}
              InputProps={{
                style: {
                  color: "#6C6C6C",
                  border: "1px solid #6C6C6C",
                  textAlign: "center",
                  borderRadius: "0.594rem",
                  padding: "0.5rem",
                },
                disableUnderline: true,
                size: "small",
                placeholder: "Min",
              }}
            />
            <Typography variant="p">to</Typography>
            <TextField
              type="url"
              variant="standard"
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
              hiddenLabel
              className="input-wo-padding"
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#6c6c6c",
                },
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  color: "#262626!important",
                  padding: "0",
                },
              }}
              InputProps={{
                style: {
                  backgroundColor: "#F78C09",
                  border: "1px solid #262626",
                  borderRadius: "0.594rem",
                  padding: "0.5rem",
                },
                disableUnderline: true,
                size: "small",
                placeholder: "Max",
              }}
            />{" "}
          </Box>
        </Box>
        <Box sx={styles.column}>
          <Typography variant="h6">Blockchain</Typography>
          <FormControl
            sx={{
              width: "218px",
              color: "#f4f4f4",
              border: "1px solid #ced4da",
              borderRadius: ".5rem",
            }}
            size="small"
          >
            <Select
              value={time}
              onChange={handleChange}
              sx={{
                color: "#f4f4f4",
                fontSize: ".75rem",
                width: "100%",
                borderRadius: ".5rem",
                "& .MuiSelect-icon": {
                  color: "white",
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={24}>Day</MenuItem>
              <MenuItem value={7}>Week</MenuItem>
              <MenuItem value={30}>Month</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={styles.column}>
          <Typography variant="h6">Blockchain</Typography>
          <FormControl
            sx={{
              width: "218px",
              color: "#f4f4f4",
              border: "1px solid #ced4da",
              borderRadius: ".5rem",
            }}
            size="small"
          >
            <Select
              value={time}
              onChange={handleChange}
              sx={{
                color: "#f4f4f4",
                fontSize: ".75rem",
                width: "100%",
                borderRadius: ".5rem",
                "& .MuiSelect-icon": {
                  color: "white",
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={24}>Day</MenuItem>
              <MenuItem value={7}>Week</MenuItem>
              <MenuItem value={30}>Month</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    );
  }

  if (filterPage === "Collection") {
    return (
      <Box sx={styles.container}>
        <Box sx={styles.columnShort}>
          <Typography variant="h6">Status</Typography>
          <Box sx={styles.checkboxRow}>
            <Typography sx={styles.p}>For Sale Only</Typography>
            <Box sx={styles.boxRow}>
              <Typography sx={styles.p}>26</Typography>
              <Checkbox sx={styles.checkbox} />
            </Box>
          </Box>
          <Box sx={styles.checkboxRow}>
            <Typography sx={styles.p}>For Sale Only</Typography>
            <Box sx={styles.boxRow}>
              <Typography sx={styles.p}>26</Typography>
              <Checkbox sx={styles.checkbox} />
            </Box>
          </Box>
          <Box sx={styles.checkboxRow}>
            <Typography sx={styles.p}>For Sale Only</Typography>
            <Box sx={styles.boxRow}>
              <Typography sx={styles.p}>26</Typography>
              <Checkbox sx={styles.checkbox} />
            </Box>
          </Box>
          <Box sx={styles.checkboxRow}>
            <Typography sx={styles.p}>For Sale Only</Typography>
            <Box sx={styles.boxRow}>
              <Typography sx={styles.p}>26</Typography>
              <Checkbox sx={styles.checkbox} />
            </Box>
          </Box>
        </Box>
        <Box sx={styles.column}>
          <Typography variant="h6">Price</Typography>
          <Box sx={styles.row}>
            <TextField
              type="url"
              variant="standard"
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
              hiddenLabel
              className="input-wo-padding"
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#6c6c6c",
                },
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  padding: "0",
                },
              }}
              InputProps={{
                style: {
                  color: "#6C6C6C",
                  border: "1px solid #6C6C6C",
                  textAlign: "center",
                  borderRadius: "0.594rem",
                  padding: "0.5rem",
                },
                disableUnderline: true,
                size: "small",
                placeholder: "Min",
              }}
            />
            <Typography variant="p">to</Typography>
            <TextField
              type="url"
              variant="standard"
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
              hiddenLabel
              className="input-wo-padding"
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#6c6c6c",
                },
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  color: "#262626!important",
                  padding: "0",
                },
              }}
              InputProps={{
                style: {
                  backgroundColor: "#F78C09",
                  border: "1px solid #262626",
                  borderRadius: "0.594rem",
                  padding: "0.5rem",
                },
                disableUnderline: true,
                size: "small",
                placeholder: "Max",
              }}
            />{" "}
          </Box>
        </Box>
        <Accordion sx={styles.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#f4f4f4" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={styles.accordionHeader}
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails sx={styles.accordionBody}>
            <Box sx={styles.checkboxRow}>
              <Typography sx={styles.p}>For Sale Only</Typography>
              <Box sx={styles.boxRow}>
                <Typography sx={styles.p}>26</Typography>
                <Checkbox sx={styles.checkbox} />
              </Box>
            </Box>
            <Box sx={styles.checkboxRow}>
              <Typography sx={styles.p}>For Sale Only</Typography>
              <Box sx={styles.boxRow}>
                <Typography sx={styles.p}>26</Typography>
                <Checkbox sx={styles.checkbox} />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  }

  if (filterPage === "Dashboard") {
    return (
      <Box sx={styles.container}>
        <Box sx={styles.columnShort}>
          <Typography variant="h6">Status</Typography>
          <Box sx={styles.checkboxRow}>
            <Typography sx={styles.p}>For Sale Only</Typography>
            <Box sx={styles.boxRow}>
              <Typography sx={styles.p}>26</Typography>
              <Checkbox sx={styles.checkbox} />
            </Box>
          </Box>
          <Box sx={styles.checkboxRow}>
            <Typography sx={styles.p}>For Sale Only</Typography>
            <Box sx={styles.boxRow}>
              <Typography sx={styles.p}>26</Typography>
              <Checkbox sx={styles.checkbox} />
            </Box>
          </Box>
          <Box sx={styles.checkboxRow}>
            <Typography sx={styles.p}>For Sale Only</Typography>
            <Box sx={styles.boxRow}>
              <Typography sx={styles.p}>26</Typography>
              <Checkbox sx={styles.checkbox} />
            </Box>
          </Box>
          <Box sx={styles.checkboxRow}>
            <Typography sx={styles.p}>For Sale Only</Typography>
            <Box sx={styles.boxRow}>
              <Typography sx={styles.p}>26</Typography>
              <Checkbox sx={styles.checkbox} />
            </Box>
          </Box>
        </Box>
        <Box sx={styles.column}>
          <Typography variant="h6">Blockchain</Typography>
          <FormControl
            sx={{
              width: "218px",
              color: "#f4f4f4",
              border: "1px solid #ced4da",
              borderRadius: ".5rem",
            }}
            size="small"
          >
            <Select
              value={time}
              onChange={handleChange}
              sx={{
                color: "#f4f4f4",
                fontSize: ".75rem",
                width: "100%",
                borderRadius: ".5rem",
                "& .MuiSelect-icon": {
                  color: "white",
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={24}>Day</MenuItem>
              <MenuItem value={7}>Week</MenuItem>
              <MenuItem value={30}>Month</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={styles.column}>
          <Typography variant="h6">Blockchain</Typography>
          <FormControl
            sx={{
              width: "218px",
              color: "#f4f4f4",
              border: "1px solid #ced4da",
              borderRadius: ".5rem",
            }}
            size="small"
          >
            <Select
              value={time}
              onChange={handleChange}
              sx={{
                color: "#f4f4f4",
                fontSize: ".75rem",
                width: "100%",
                borderRadius: ".5rem",
                "& .MuiSelect-icon": {
                  color: "white",
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={24}>Day</MenuItem>
              <MenuItem value={7}>Week</MenuItem>
              <MenuItem value={30}>Month</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    );
  }
}

export default FilterComponent;
