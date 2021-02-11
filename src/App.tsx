import React, { useState, useEffect, useCallback } from 'react';
import Article from './Article';
import Navigator, { FileNode, FolderNode } from './Navigator';

function getLastModified(structure: FolderNode, path: string): string {
  const found = structure.files.find((file: FileNode) => file.path === path);

  if (found)
    return found.modifyTime;
  else if (structure.children)
  {
    for (const child of structure.children)
    {
      const childFound = getLastModified(child, path);
      if (childFound)
        return childFound;
    }
  }
  
  return '';
}

const App = () => {
  const [currentMarkdown, setCurrentMarkdown] = useState('./contents/Welcome!.md');
  const [structure, setStructure] = useState(null);

  // 시스템 폴더에 있는 md 파일들은 트리에 표시되지 않게 만들었다.
  const on404NotFound = useCallback(() => setCurrentMarkdown('./contents/System/Page Not Found!.md'));

  useEffect(() => {
    // 해시 라우터를 구현한다.
    // NavigationEntry에서 a 태그를 통해 해시를 설정한다.
    const callback = () => {
      if (!location.hash || location.hash === '#/')
        setCurrentMarkdown('./contents/Welcome!.md');
      else
        setCurrentMarkdown(decodeURIComponent('.' + location.hash.substring(1)));
    };

    window.onhashchange = callback;
    window.onload = callback;

    // 파일 구조를 불러온다.
    fetch('./navigation.json')
    .then(response => response.json())
    .then(json => {
      setStructure(json as FolderNode);
    })
    .catch(err => console.log(err));
  }, []);

  // 뷰!
  return (
    <div className='app'>
      <Article contentUrl={currentMarkdown} lastModified={structure ? getLastModified(structure, currentMarkdown) : ''} on404NotFound={on404NotFound} />
      <aside>
        <Navigator structure={structure} />
      </aside>
    </div>
  );
};

export default App;