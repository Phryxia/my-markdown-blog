import React, { useState, useEffect, useCallback } from 'react';

function extractTitleFromUrl(url: string): string {
  const tokens = url.split('/');
  const last = tokens[tokens.length - 1];
  
  if (last.match(/\.md$/))
    return last.substring(0, last.length - 3);
  else
    return last;
}

type FileNode = {
  path: string,
  modifyTime: string
}

type FolderNode = {
  path: string,
  files: FileNode[],
  children: FolderNode[]
};

const NavigatorEntry = ({folderNode, key, onFileSelected}) => {
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
          <div className='navigator-file' key={filenode.path} onClick={() => onFileSelected(filenode.path, filenode.modifyTime)}>
            {/* 파일 이름만 추출해서 보여준다 */}
            {extractTitleFromUrl(filenode.path)}
          </div>) : null}
          
          {/* 폴더 버튼들 */}
          {isOpen ? folderNode.children.map(child => <NavigatorEntry key={child.path} folderNode={child} onFileSelected={onFileSelected}/>) : null}
        </div>
      </React.Fragment>
      : null}
    </div>
  )
};

const Navigator = ({onFileSelected}) => {
  const [structure, setStructure] = useState(null);

  // navigation.json파일을 불러와서 구조를 적용시킨다.
  useEffect(() => {
    fetch('./navigation.json')
    .then(response => response.json())
    .then(json => {
      setStructure(json as FolderNode);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <nav className='general-box'>
      <NavigatorEntry key={null} folderNode={structure} onFileSelected={onFileSelected}/>
    </nav>
  );
};

export default Navigator;