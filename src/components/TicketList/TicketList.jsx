import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import testRequest from "../../test-request.json";
import { styledTheme } from "../../theme";
import AirCompanyLogo from "../../assets/AirCompanyLogo.png";
import React, { useState } from "react";
const TicketList = () => {
  const [activeButton, setActiveButton] = useState(0);
  const getButtonStyles = (isActive) => ({
    color: isActive ? styledTheme.font.white : styledTheme.font.boldGrey,
    backgroundColor: isActive
      ? styledTheme.colors.blue
      : styledTheme.colors.white,
    fontWeight: "bold",
    
    padding: "16px 50px",
    "&.MuiButtonGroup-firstButton": {
      border: "none",
    },
  });

  return (
    <>
      <ButtonGroup
        variant="contained"
        aria-label="Basic button group"
        sx={{ marginBottom: "20px", width: "100%" }}    
      >
        <Button
          onClick={() => setActiveButton(0)}
          sx={getButtonStyles(activeButton === 0)}
          fullWidth
        >
          Самий дешевий
        </Button>
        <Button
          onClick={() => setActiveButton(1)}
          sx={getButtonStyles(activeButton === 1)}
          fullWidth
        >
          Самий швидкий
        </Button>
      </ButtonGroup>

      {testRequest.map((ticket, index) => (
        <Box
          key={index}
          sx={{
            display: "grid",
            mb: "20px",
            backgroundColor: styledTheme.colors.white,
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px 26px",
            gridTemplateRows: "auto",
            gridTemplateAreas: `"price . logo"
                                "destination duration stops"`,
          }}
        >
          <Box
            sx={{
              gridArea: "price",
              fontWeight: "bold",
              fontSize: "1.4rem",
              color: styledTheme.font.blue,
              alignSelf: "center",
            }}
          >
            {ticket.price} ₴
          </Box>

          <Box
            sx={{
              gridArea: "logo",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <img
              src={AirCompanyLogo}
              alt="Air Company Logo"
              style={{ height: "40px" }}
            />
          </Box>

          {ticket.segments.map((segment, segmentIndex) => (
            <React.Fragment key={segmentIndex}>
              <Box sx={{ gridColumn: "1 / span 1" }}>
                <Typography variant="body2">
                  {segment.origin} - {segment.destination}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: styledTheme.font.boldGrey, fontWeight: "bold" }}
                >
                  {segment.date}
                </Typography>
              </Box>

              <Box sx={{ gridColumn: "2 / span 1" }}>
                <Typography variant="body2">В ДОРОЗІ:</Typography>
                <Typography
                  variant="body1"
                  sx={{ color: styledTheme.font.boldGrey, fontWeight: "bold" }}
                >
                  {segment.duration}
                </Typography>
              </Box>

              <Box sx={{ gridColumn: "3 / span 1" }} variant="body2">
                {segment.stops.length > 0 ? (
                  <>
                    {segment.stops.length === 1
                      ? "1 ПЕРЕСАДКА:"
                      : "2 ПЕРЕСАДКИ:"}
                    <Typography
                      variant="body1"
                      sx={{
                        color: styledTheme.font.boldGrey,
                        fontWeight: "bold",
                      }}
                    >
                      {segment.stops.join(", ")}
                    </Typography>
                  </>
                ) : (
                  "БЕЗ ПЕРЕСАДОК"
                )}
              </Box>
            </React.Fragment>
          ))}
        </Box>
      ))}
    </>
  );
};

export default TicketList;
