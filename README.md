# 🎬 Netflix Clone (ReactJS)

A responsive, Netflix-inspired movie streaming UI built using ReactJS. This project replicates the core features of the Netflix front-end experience — complete with dynamic movie rows, banner, autoplay scrolling, hover previews, and modals with trailers.

![Netflix UI Screenshot](https://user-images.githubusercontent.com/35263182/126314477-936b6acd-84d2-4c6b-b45a-c2678fd934b5.png)

### 🔗 Live Preview  
**🌐 [View Live Demo](https://netflix-clone-ten-woad.vercel.app/)**

---

## 🚀 Features

- 🔄 Auto-scrolling horizontal movie rows (pause on hover)
- 🎞 Movie modals with details and trailer (YouTube embedded)
- 📺 Banner section with featured movie
- 📱 Fully responsive design (mobile-first)
- 🔍 Dynamic rows fetched from an API
- 🌓 Dark-themed Netflix-like styling
- 📂 Clean folder structure with separation of concerns

---

## 🌐 API Service

To avoid exposing TMDB keys, this app uses a custom proxy API:

- GitHub Repo: [netflix-clone-API](https://github.com/abhinandansharma/netflix-clone-API)
- Hosted on: https://netflix-clone-api-key.herokuapp.com

This proxy securely communicates with TMDB and returns movie data used in the front-end.

---

## 🛠 Tech Stack

- **Frontend:** ReactJS, JavaScript (ES6), CSS
- **HTTP Requests:** Axios
- **Icons & UI:** Material-UI, Custom CSS
- **Media Embeds:** YouTube IFrame Player API
- **Deployment:** Vercel

---

## 📁 Project Structure
```plaintext
src/
├── API/
│   ├── axios.js         # Axios instance
│   └── requests.js      # TMDB endpoints
├── movieModal/
│   └── MovieModal.js    # Movie detail modal with trailer
├── components/
│   ├── Banner.js
│   ├── Nav.js
│   └── Row.js
├── App.js
├── App.css
└── index.js
---
```

## ⚙️ Getting Started

### 1. Clone the repo

- ```git clone https://github.com/YOUR_USERNAME/netflix-clone.git```
- ```cd netflix-clone```


### 2. Install dependencies
```npm install```

### 3. Run locally
```npm start```

#### App will start at ```http://localhost:3000```

## 🧪 Available Scripts
- ```npm start```       - Starts the dev server
- ```npm test```       - Launches test runner
- ```npm run build```  - Builds for production

## 🤝 Contributing

Pull requests are welcome! If you’d like to improve UI, fix bugs, or add new features, feel free to fork and submit a PR.



## 📄 License

This project is open-source under the MIT license.


### Built with ❤️ by Abhinandan Sharma

Let me know if you'd like to add GitHub repo badges or a short walkthrough video/gif preview.