const peer = new Peer();

const titleElement = document.getElementById('title');

let received = false;

peer.on('open', (id) => {

  setTimeout(() => {
    if (!received) {
      titleElement.innerHTML = 'Somebody doesn\'t want to share 😔';
    }
  }, 100);

  const conn = peer.connect(destUuid);
  
  conn.on('open', () => {
    
    conn.send('Request file');

    titleElement.innerHTML = 'Getting the file for you ❤️';
    
    received = true;

  });
  
  conn.on('data', (data) => {
    
    const blob = new Blob([data.file], {
      type: data.filetype,
    });
    
    const blobUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = data.filename;
    link.href = blobUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;

    setTimeout(() => {
      window.close();
    }, 300);


  });
});
