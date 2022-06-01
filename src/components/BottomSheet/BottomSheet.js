import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";

const BottomSheet = (props) => {
  return (
    <BottomSheet
      ref={props.bottomSheetRef}
      index={props.index}
      snapPoints={props.snapPoints}
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      handleIndicatorStyle={{ width: "0%" }}
      bottomInset={-50}
    >
      {props.children}
    </BottomSheet>
  );
};

export default BottomSheet;
