FROM node:20-alpine as dev

WORKDIR /usr/src/app

# Copy dependency definitions only
COPY package*.json ./

# Install dependencies inside container
RUN npm install --force
# or RUN npm install --legacy-peer-deps

# Copy the rest of the source code (excluding node_modules)
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
