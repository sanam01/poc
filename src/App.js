import logo from './logo.svg';
import './App.css';
import React from 'react';
import jszip from 'jszip';
import { saveAs } from 'file-saver';
import JSZipUtils from 'jszip-utils';


var zip = new jszip();
var count = 0;
var zipFilename = "brochure.zip";
var urls = [
  '/images/a.jpg',
  '/images/b.jpg',
  '/images/c.jpg'
];


urls.forEach(async function (url){
  const urlArr = url.split('/');
  const filename = urlArr[urlArr.length - 1];
  try {
    const file = await JSZipUtils.getBinaryContent(url)
    zip.file(filename, file, { binary: true});
    count++;
    if(count === urls.length) {
      zip.generateAsync({type:'blob'}).then(function(content) {
        saveAs(content, zipFilename);
      });
    }
  } catch (err) {
    console.log(err);
  }
});



class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React aggggg
        </a>
        </header>
      </div>
    );
  }
}

export default App;
