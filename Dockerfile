# استخدام صورة Playwright الرسمية التي تحتوي على كل التبعات
FROM mcr.microsoft.com/playwright:v1.49.0-noble

# تحديد مجلد العمل
WORKDIR /app

# نسخ ملفات التعريف أولاً للاستفادة من الـ Cache
COPY package*.json ./

# تثبيت المكتبات
RUN npm install

# تثبيت متصفح Chromium فقط (الصورة تحتوي على التبعات بالفعل)
RUN npx playwright install chromium

# نسخ باقي ملفات المشروع
COPY . .

# فتح المنفذ 3000
EXPOSE 3000

# تشغيل السيرفر
CMD ["node", "server.js"]
