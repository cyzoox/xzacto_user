import React, { useState } from "react";
import { Text, ListItem } from "react-native-elements";

import { ActionSheet } from "./ActionSheet";
import { Task } from "../schemas";
import { useStore } from "../providers/StoreContext";

export function TaskItem({ task }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const { deleteTask, setTaskStatus } = useStore();
  const actions = [
    {
      title: "Delete",
      action: () => {
        deleteTask(task);
      },
    },
  ];

  // For each possible status other than the current status, make an action to
  // move the task into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
  // TODO

  return (
    <>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (task.status) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
      />
      <ListItem
        key={task.id}
        onPress={() => {
          setActionSheetVisible(true);
        }}
        title={task.name}
        bottomDivider
        checkmark={
          task.status === Task.STATUS_COMPLETE ? (
            <Text>&#10004; {/* checkmark */}</Text>
          ) : task.status === Task.STATUS_IN_PROGRESS ? (
            <Text>In Progress</Text>
          ) : null
        }
      />
    </>
  );
}
