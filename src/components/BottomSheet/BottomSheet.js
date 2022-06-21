import React from "react";
import BottomSheetImport from "@gorhom/bottom-sheet";

const BottomSheet = (props) => {
  return (
    <BottomSheetImport
      ref={props.reference}
      index={props.index}
      snapPoints={props.snapPoints}
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      handleIndicatorStyle={{ width: "0%" }}
      bottomInset={-50}
    >
      {props.children}
    </BottomSheetImport>
  );
};

export default BottomSheet;
