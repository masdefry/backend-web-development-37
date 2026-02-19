# Node Version
FROM node:20-alpine

# Set Working Directory
WORKDIR /app

# Copy `package.json`
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy All Files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose Port Express
EXPOSE 5000

# Start Application
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
