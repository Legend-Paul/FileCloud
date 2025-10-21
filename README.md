# FileCloud

**FileCloud** is a simple yet powerful web-based file management and sharing system.  
It allows users to upload, store, view, and share files directly through the browser.  
The goal of this project is to provide a lightweight and intuitive platform for managing files locally or across connected users.

---

## 🌍 Overview

FileCloud acts as a **personal cloud storage solution** — like a miniature Google Drive or Dropbox that you can host yourself.  
Users can upload any file type, view a list of their uploaded files, download them anytime, and even share files via generated links or email (if configured).  

It’s designed to be **fast, minimal**, and **developer-friendly**, making it easy to expand with authentication, user accounts, or cloud storage integrations in the future.

---

## ⚙️ What FileCloud Does

### 1. **File Uploads**
Users can upload files through a simple web form.  
Once uploaded, each file is automatically stored in the server’s `uploads/` directory.

### 2. **File Storage**
Files are stored securely on the local server.  
The application organizes uploads so they can be accessed, shared, or deleted later.

### 3. **File Listing**
FileCloud displays a clear list of all uploaded files with details like:
- File name  
- Upload date/time  
- File size  
- Action buttons for viewing, downloading, or deleting

### 4. **File Viewing and Downloading**
Users can:
- View files directly in their browser (for viewable formats like PDFs, images, text files)
- Download files to their device with a single click

### 5. **Sharing via Email (Optional)**
Files can be shared by sending download links to a recipient’s email.  
This feature allows easy and secure sharing without exposing all uploads publicly.

### 6. **Simple Interface**
The interface is designed for clarity — a clean dashboard for uploads and file management without unnecessary clutter.

---

## 💡 Why FileCloud Exists

FileCloud was created to:
- Provide a **lightweight personal cloud** without the complexity of large cloud platforms  
- Help developers and students understand **file upload handling**, **routing**, and **file management** in Node.js and Express  
- Serve as a base project for building more advanced systems like:
  - Cloud backup tools  
  - File-sharing services  
  - Document management systems  

---

## 🚀 How It Works (In Simple Terms)

1. The user visits the FileCloud web page.  
2. They upload a file using the upload form.  
3. The server receives the file via an Express route using **Multer** for file handling.  
4. The file is stored inside the `uploads/` directory with a unique name.  
5. The database (via **Prisma**) keeps a record of the file (name, size, path, timestamp).  
6. The file then appears in the dashboard list.  
7. Users can:
   - View the file in the browser,  
   - Download it, or  
   - Share it via a generated link or email.

---

## 🔒 Security Notes

- Uploaded files are stored securely and served only via valid routes.
- Only specific routes handle uploads and downloads to prevent directory access.
- It can easily be extended with authentication to restrict file access.

---

## 🧱 Future Improvements

Planned or possible enhancements include:
- User authentication (login/register)
- File categorization (images, docs, videos)
- Cloud storage integration (AWS S3, Google Cloud)
- File preview support
- Expiring share links

---

## 📸 Example Use Cases

- Personal file storage on a private server  
- Sharing documents within a local network  
- School or office project submission system  
- Simple “send a file” app for developers or teams  

---

## 👨‍💻 Author

**Developed by:** [Legend-Paul](https://github.com/Legend-Paul)  
**Project:** [FileCloud Repository](https://legendpaul-filecloud.onrender.com)

> FileCloud — Your personal file-sharing cloud. Fast, minimal, and open-source.
