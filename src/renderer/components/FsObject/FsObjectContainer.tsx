import React from "react";
import { useObserver } from "mobx-react";

import { isFolder } from "../../types/fs";
import { s3 } from "../../stores";
import FsObjects from "./FsObjects";

const FsObjectContainer: React.FC = () =>
  useObserver(() => {
    const { fsObjects, openFolder } = s3.useStore();

    return (
      <FsObjects
        fsObjects={fsObjects}
        loading={false}
        onClickFsObject={object => {
          if (isFolder(object)) {
            openFolder(object);
          }
        }}
      ></FsObjects>
    );
  });

export default FsObjectContainer;
