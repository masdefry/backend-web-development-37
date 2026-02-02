Hello Students! 😉

🧑‍💻 How to Setup Express Typescript?

    1. Create New Directory for ExpressTS Projects

    2. Inside New Directory, Execute this Command:

            ➡️ npm init --yes

    3. Install Express Typescript & Nodemon

            ➡️ npm i express 

            ➡️ npm i --save-dev @types/express

            ➡️ npm i -D typescript ts-node nodemon

    4. Initiate Typescript Configuration

            ➡️ npx tsc --init

    5. Replace `tsconfig.json` with This Configuration:

            {
                "compilerOptions": {
                    "target": "ES6",
                    "module": "commonjs",
                    "outDir": "./dist",
                    "rootDir": "./src",
                    "strict": true,
                    "esModuleInterop": true,
                    "skipLibCheck": true
                }
            }

    6. Replace Property `scripts` on `package.json` with this Code:

            "scripts": {
                "dev": "nodemon",
                "build": "tsc",
                "start": "node dist/server.js",
            }

    7. Create New File with Name `nodemon.json` and Add this Configuration:

            {
                "watch": ["src"],
                "ext": "ts",
                "ignore": ["dist"],
                "exec": "ts-node src/server.ts"
            }

    8. Running Express Typescript Projects

            ➡️ npm run dev

🧑‍💻 How to Setup Prisma ORM?

        1. Install Prisma & Prisma Client:

                npm install prisma --save-dev

                npm install @prisma/client

        2. Init Prisma:

                npx prisma init

        3. Configure `DATABASE_URL` on `.env`:

                DATABASE_URL="postgresql://[user]:[password]@localhost:5432/[dbname]"