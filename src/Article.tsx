import React, { useEffect } from 'react';
import MarkDownIt from 'markdown-it';
import * as hljs from 'highlight.js';
import mk from '@traptitech/markdown-it-katex';
import * as footnote from 'markdown-it-footnote';
import * as msup from 'markdown-it-sup';
import * as msub from 'markdown-it-sub';

// Markdonw-it 관련 설정
const md = new MarkDownIt({ 
  html: true, 
  linkify: false, 
  typographer: false,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      }
      catch (_) {}
    }
    return '';
  }
});

// Katex 지원
md.use(mk, {'errorColor': '#c41020'});

// Footnote 지원
md.use(footnote);

// Superscript
md.use(msup);

// Subscript
md.use(msub);

// ./abc/def.md => def
function extractTitleFromUrl(url: string): string {
  const tokens = url.split('/');
  const last = tokens[tokens.length - 1];
  
  if (last.match(/\.md$/))
    return last.substring(0, last.length - 3);
  else
    return last;
}

function timeReformatting(lastModified: string): string {
  const date = new Date(lastModified);
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

// 게시글은 항상 최신본으로 가져오도록, 캐시를 막는다.
// 안그러면 구버전 문서를 자꾸 가져옴.
const fetchHeader = new Headers();
fetchHeader.append('pragma', 'no-cache');
fetchHeader.append('cache-control', 'no-cache');

const Article = ({contentUrl, lastModified, on404NotFound}) => {
  // contentURL이 바뀌면 해당 URL로 마크다운을 로드한다.
  // 만약 그런거 없으면 404 페이지를 열도록 App에게 재요청한다.
  useEffect(() => {
    // 확장자가 .md가 아니면 불법접근으로 간주한다.
    if (!contentUrl.match(/\.md$/)) {
      on404NotFound();
      return;
    }

    // load file
    fetch(contentUrl, { headers: fetchHeader })
    .then(response => {
      if (response.ok)
        return response.text();
      else
        // 404 에러
        throw new Error('404 not found');
    })
    .then(markdown => {
      const html = md.render(markdown);
      document.querySelector('#content').innerHTML = html;
    })
    .catch(exception => {
      on404NotFound();
    });
  }, [contentUrl]);

  return (
    <article>
      {/* Title */}
      <div className='general-box title'>
        <h1>
          {extractTitleFromUrl(contentUrl)}
        </h1>
        <span>by nuko {lastModified ? 'on ' + timeReformatting(lastModified) : null}</span>
      </div>

      {/* Content */}
      <div className='general-box content' id='content'>
        
      </div>
    </article>
  );
};

export default Article;