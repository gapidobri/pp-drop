const peer = new Peer();

const urlElement = document.getElementById('url');
const fileElement = document.getElementById('upload-file');
const uploadButtonElement = document.getElementById('upload-button');
const filenameElement = document.getElementById('filename');
const countElement = document.getElementById('count');
const copiedElement = document.getElementById('copied');

let uploaded = false,
  downloadCount = 0;

uploadButtonElement.addEventListener('click', async () => {
  if (uploaded) {
    await navigator.clipboard.writeText(urlElement.href);
    copiedElement.style.opacity = 1;
    setTimeout(() => {
      copiedElement.style.opacity = 0;
    }, 2000);
  } else {
    fileElement.click();
  }
});

fileElement.addEventListener('change', (event) => {
  uploadButtonElement.classList.add('state-after-upload');
  uploadButtonElement.classList.remove('state-before-upload');

  uploadButtonElement.innerText = 'Copy Link';
  uploaded = true;
  urlElement.hidden = false;

  const file = event.currentTarget.files[0];

  filenameElement.innerText = file.name;
});

peer.on('open', (id) => {
  const current = window.location.href;

  const downloadUrl = current + id;

  urlElement.href = downloadUrl;
  urlElement.innerText = downloadUrl;
});

peer.on('connection', (conn) => {
  conn.on('data', () => {
    const file = fileElement.files[0];
    const blob = new Blob([file], { type: file.type });

    conn.send({
      file: blob,
      filename: file.name,
      filetype: file.type,
    });

    downloadCount++;
    countElement.innerText = `Downloads: ${downloadCount}`;
  });
});
