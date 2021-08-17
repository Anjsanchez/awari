import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { ButtonGroup } from "@material-ui/core";
import ReservationDatePicker from "../../pages/Reservation/ReservationDatePicker";
import ReservationType from "../../pages/Reservation/ReservationType";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: "10px",
    fontSize: "14px",
  },
  actionsContainer: {},
  resetContainer: {},
  button__wrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  labelSpan: {
    fontWeight: 400,
    fontSize: "15px",
    fontFamily: `"Poppins", sans-serif`,
  },
}));

const getSteps = () => ["Type", "Details", "Create an ad", "Create an ad1"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ReservationType />;
    case 1:
      return <ReservationDatePicker />;
    case 2:
      return `Try  .`;
    case 3:
      return `Try  .`;
    default:
      return "Unknown step";
  }
}

const ReservationSteps = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleReset = () => setActiveStep(0);

  const typeInStore = useSelector(
    (state) => state.entities.createReservation.reservation.type
  );

  const getDisabled = () => {
    const { name, remark } = typeInStore;

    if (activeStep === 0) {
      if (name === null || name === "") return true;

      const type = name.toLowerCase();
      if (type === "day tour" || type === "walk in" || type === "restaurant")
        return false;

      if (remark === null || remark === "") return true;

      return false;
    }

    return true;
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              <span className={classes.labelSpan}>{label}</span>
            </StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div className={classes.button__wrapper}>
                  <ButtonGroup
                    className={classes.button}
                    variant="text"
                    color="primary"
                    aria-label="text primary button group"
                  >
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                      size="small"
                      color="secondary"
                    >
                      Back
                    </Button>
                    <Button
                      disabled={getDisabled()}
                      size="small"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default ReservationSteps;
