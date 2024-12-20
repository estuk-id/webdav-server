const { v2: webdav } = require('webdav-server');
const express = require('express');
const path = require('path');

// Buat aplikasi Express
const app = express();

// Buat instance server WebDAV
const server = new webdav.WebDAVServer();

// Tambahkan folder root untuk menyimpan file
server.setFileSystem('/', new webdav.PhysicalFileSystem(path.join(__dirname, 'data')), (success) => {
    if (success) {
        console.log('Root file system berhasil diatur.');
    } else {
        console.error('Gagal mengatur root file system.');
    }
});

// Tambahkan middleware WebDAV ke Express
app.use(webdav.extensions.express('/webdav', server));

// Rute default untuk memeriksa server berjalan
app.get('/', (req, res) => {
    res.send('WebDAV Server berjalan. Akses di /webdav');
});

// Jalankan server pada port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
