# MEVN-BOSTOREKO
### Genel Bakış
MEVN-BOSTOREKO, MongoDB, Express.js, Vue.js ve Node.js (MEVN) teknolojilerini kullanarak oluşturulmuş bir web uygulamasıdır. Kullanıcılar kitapları inceleyebilir, yorum yapabilir ve puanlayabilirler. Proje, backend ve frontend olmak üzere iki ana bileşene ayrılmıştır.
Proje [bu adresteki](https://www.youtube.com/watch?v=PZIiy95IJz8&list=PL-Hkw4CrSVq-YPIgQtuLS3Lx1S-z9Sy_S) eğitimden faydalanılarak hazırlanmıştır.

## Kurulum

### Gereksinimler

- [Node.js](https://nodejs.org/en)
- npm veya yarn
- [MongoDB](https://www.mongodb.com)
- [Cloudinary](https://cloudinary.com) (Cloudinary görsellerimizi yükleyip saklayacağımız ücretsiz bir bulut platformu.)

### Backend Kurulumu

1. Backend dizinine gidin:
   
   ```
   cd backend
   ```
2. Gerekli paketleri yükleyin:
   
   ```
   npm install
   ```
3. .env dosyasını oluşturun ve gerekli ortam değişkenlerini ekleyin:
   
   ```
   MONGODB_URI=<MongoDB URI>
   JWT_SECRET_KEY=<JWT Secret Key>
   JWT_EXPIRE_TIME=1d
   CLOUD_NAME=<Cloudinary Name>
   CLOUD_API_KEY=<Cloudinary API Key>
   CLOUD_API_SECRET=<Cloudinary Secret Key>
   ```
4. Sunucuyu başlatın:
   
   ```
   npm run start
   ```

### Frontend Kurulumu

1. Frontend dizinine gidin:
   
   ```
   cd frontend
   ```
2. Gerekli paketleri yükleyin:
   
   ```
   npm install
   ```
3. Geliştirme sunucusunu başlatın:
   
   ```
   npm run dev
   ```
