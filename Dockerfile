# Sử dụng một base image có sẵn
FROM node:14

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép các tệp package.json và package-lock.json vào thư mục làm việc
COPY . .

# Cài đặt các phụ thuộc của ứng dụng với cờ --force hoặc --legacy-peer-deps
RUN npm install --force

# Sao chép tất cả các tệp từ thư mục hiện tại vào thư mục làm việc
COPY . .

# Mở cổng 3000 để truy cập ứng dụng
EXPOSE 3000

# Khởi chạy ứng dụng
CMD ["npm", "start"]