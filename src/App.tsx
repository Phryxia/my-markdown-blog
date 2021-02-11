import React, { useState, useCallback } from 'react';
import Article from './Article';
import Navigator from './Navigator';

const App = () => {
  const [currentMarkdown, setCurrentMarkdown] = useState('/contents/Welcome!.md');
  const [lastModified, setLastModified] = useState('');

  const onFileSelected = useCallback((filepath, lastModified) => {
    setCurrentMarkdown(filepath);
    setLastModified(lastModified);
  });

  return (
    <div className='app'>
      <Article contentUrl={currentMarkdown} lastModified={lastModified} />
      <aside>
        <Navigator onFileSelected={onFileSelected} />
      </aside>
    </div>
  );
};

export default App;