import './App.css';
import React from 'react';
import jszip from 'jszip';
import { saveAs } from 'file-saver';
import JSZipUtils from 'jszip-utils';


class App extends React.Component {

  brochureDownload = () => {
    var zip = new jszip();
    var count = 0;
    var zipFilename = "brochure.zip";
    var urls = [
      '/pdfs/Subaru-XV-brochure.pdf',
      '/pdfs/Subaru-hybrid-brochure.pdf',
      '/pdfs/Subaru-WRX-STI-brochure.pdf'
    ];


    urls.forEach(async function (url) {
      const urlArr = url.split('/');
      const filename = urlArr[urlArr.length - 1];
      try {
        const file = await JSZipUtils.getBinaryContent(url)
        zip.file(filename, file, { binary: true });
        count++;
        if (count === urls.length) {
          zip.generateAsync({ type: 'blob' }).then(function (content) {
            saveAs(content, zipFilename);
          });
        }
      } catch (err) {
        console.log(err);
      }
    });

  }

  handleDownloadBrochure = () => {
    this.brochureDownload();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <button className="download-brochure" onClick={this.handleDownloadBrochure}>Download</button>
        </header>
      </div>
    );
  }
}

export default App;
