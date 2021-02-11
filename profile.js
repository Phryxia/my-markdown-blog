/**
 * 매 빌드마다 이 스크립트를 실행하여, MD파일들의 구조를 JSON으로 만들어둔다.
 * 순수 클라이언트 사이드에서 서버에 존재하는 파일과 폴더의 구조를 알기 위함이다.
 * 
 * 정적페이지 호스팅 사이트에선 임의로 서버를 돌릴 수가 없다. 그래서 MD파일 구조 API를
 * 제공할 수 없다. 따라서 정적 파일 json으로 제공해줄 필요가 있다.
 */
const fs = require('fs');

// path를 탐색하여 JSON으로 반환한다. 재귀적으로 실행됨.
function readdir(path) {
  const out = {
    path,
    files: [],
    children: []
  };

  const files = fs.readdirSync(path, {withFileTypes: true});
  
  files.forEach(file => {
    // 폴더가 아니면서 마크다운 파일이 아닌 것은 무조건 넘긴다
    if (!file.isDirectory() && !file.name.match(/\.md$/))
      return;

    // System 폴더는 숨긴다
    if (file.name === 'System')
      return;

    const newPath = path + '/' + file.name;

    const modifyTime = fs.statSync(newPath).birthtime;

    if (file.isFile())
      out.files.push({path: newPath, modifyTime});

    else if (file.isDirectory())
      out.children.push(readdir(newPath));
  });

  return out;
}


const out = readdir('./contents');
fs.writeFile('navigation.json', JSON.stringify(out), err => {
  if (err) console.log(err); 
});