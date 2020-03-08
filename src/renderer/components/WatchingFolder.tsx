import { s3 } from "@renderer/context";
import { useObserver } from "mobx-react";
import React from "react";
import styled from "styled-components";

const Self = styled.div`
  overflow: hidden;
  white-space: nowrap;
  padding: 5px 10px;
`;

const Breadcurmb = styled.span`
  color: blue;
  cursor: pointer;
  padding: 0 3px;
  margin: 0 3px;
`;

const WatchingFolder: React.FC = () =>
  useObserver(() => {
    const {
      currentFolder,
      openFolderByName,
      openCurrentBucket
    } = s3.useStore();

    if (currentFolder) {
      const splitedName = currentFolder.name.split("/").filter(name => !!name);
      const rootPath = (
        <Breadcurmb
          onClick={() => {
            openCurrentBucket();
          }}
        >
          /
        </Breadcurmb>
      );
      const breadcrumbs = splitedName.map((folderName, index) => (
        <span key={index}>
          <Breadcurmb
            onClick={() => {
              const fileName = splitedName.slice(0, index + 1).join("/") + "/";
              openFolderByName(fileName);
            }}
          >
            {folderName}
          </Breadcurmb>
          /
        </span>
      ));
      return (
        <Self>
          {rootPath}
          {breadcrumbs}
        </Self>
      );
    }
    return <Self>select bucket</Self>;
  });

export default WatchingFolder;
