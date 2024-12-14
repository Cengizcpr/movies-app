# Movies - NestJS Project

Bu proje, NestJS kullanarak oluşturulmuş bir **Movies App** uygulamasıdır. MongoDB ile entegre edilmiş ve test süreçleri için gerekli adımlar Docker ve Jest kullanılarak yapılandırılmıştır.

---

## Teknolojiler

- **Backend Framework**: NestJS
- **Database**: MongoDB
- **API Testing**: Jest, Supertest
- **Containerization**: Docker

---

## Kurulum(Proje kök klasöründe .env adında bir dosya oluştur.)

### 1. Projeyi Clone et

 ```bash
git clone https://github.com/Cengizcpr/movies-app.git
cd movies-app
```

### 2. Projeyi Başlatın

   ```bash
   docker-compose up -d --build
   ```

### 3. Server İçin Testleri Çalıştırın
   ```bash
   npm test
   ```