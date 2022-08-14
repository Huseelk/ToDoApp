import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import React, { useState } from "react";
import "./tasks.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Tasks = ({ tasks, setTasks, status, setStatus, filteredTasks }) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return tasks?.length ? (
    <div className="tasksList">
      <div className="filterTasks">
        <input
          onChange={() => setStatus(!status)}
          type="checkbox"
          className="taskCheckbox"
        />
        <span>Hide completed</span>
      </div>
      {filteredTasks.map((e) => {
        return (
          <div className="addedList" key={e.id}>
            <div className="taskContent">
              <input
                onChange={() => {
                  setTasks(
                    tasks.map((el) => {
                      if (el.id === e.id) {
                        return {
                          ...el,
                          done: !el.done,
                        };
                      }
                      return el;
                    })
                  );
                }}
                type="checkbox"
                className="taskCheckbox"
                checked={e.done ? true : false}
              />
              <span className={`task-item ${e.done ? `done` : ``}`}>
                {e.value}
              </span>
            </div>
            <div>
              <span
                onClick={() => {
                  handleClickOpen();
                  setId(e.id);
                }}
                className="deleteButton"
              >
                X
              </span>
            </div>
          </div>
        );
      })}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            fontWeight: "500",
            fontSize: "18px",
            lineHeight: "28px",
            color: "#008594",
          }}
        >
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogActions>
          <Button
            sx={{
              color: "#174348",
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: "28px",
              borderRadius: "nullpx",
            }}
            onClick={() => {
              setTasks(tasks.filter((el) => el.id !== id));
              handleClose();
            }}
          >
            Yes
          </Button>
          <Button
            sx={{
              color: "#174348",
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: "28px",
              borderRadius: "nullpx",
            }}
            onClick={handleClose}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ) : (
    <div className="emptyTasks">
      <span className="smallText">
        Your life is a blank page. You write on it.
      </span>
      <span className="bigText">So start by adding your tasks here.</span>
    </div>
  );
};
export default Tasks;
