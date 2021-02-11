import React, { useState, useEffect, useCallback } from 'react';

function extractTitleFromUrl(url: string): string {
  const tokens = url.split('/');
  const last = tokens[tokens.length - 1];
  
  if (last.match(/\.md$/))
    return last.substring(0, last.length - 3);
  else
    return last;
}

export type FileNode = {
  path: string,
  modifyTime: string
}

export type FolderNode = {
  path: string,
  files: FileNode[],
  children: FolderNode[]
};

const NavigatorEntry = (props) => {
  const { folderNode } = props;
  
  const [isOpen, setIsOpen] = useState(true);

  const toggle = useCallback(() => setIsOpen(isOpen => !isOpen));

  return (
    <div>
      {folderNode ? 
      <React.Fragment>
        <div className='navigator-folder' onClick={toggle}>
          {extractTitleFromUrl(folderNode.path)}
        </div>
        
        <div className='navigator-entry'>
          {/* 파일 버튼들 */}
          {isOpen ? folderNode.files.map(filenode =>
            <a href={'#' + filenode.path.substring(1)} key={filenode.path}>
              <div className='navigator-file'>
                {/* 파일 이름만 추출해서 보여준다 */}
                {extractTitleFromUrl(filenode.path)}
              </div>
            </a>
          ) : null}
          
          {/* 폴더 버튼들 */}
          {isOpen ? folderNode.children.map(child => 
            <NavigatorEntry key={child.path} folderNode={child} />
          ) : null}
        </div>
      </React.Fragment>
      : null}
    </div>
  )
};

const Navigator = ({onStructureLoaded}) => {
  const [structure, setStructure] = useState(null);

  // navigation.json파일을 불러와서 구조를 적용시킨다.
  useEffect(() => {
    fetch('./navigation.json')
    .then(response => response.json())
    .then(json => {
      setStructure(json as FolderNode);
      onStructureLoaded(json as FolderNode);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <nav className='general-box'>
      <NavigatorEntry folderNode={structure} />
    </nav>
  );
};

export default Navigator;