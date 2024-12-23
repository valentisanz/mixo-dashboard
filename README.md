## Getting Started

First install the dependencies:

```bash
npm install
```

### Local - development server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker

First build the images:

```bash
docker compose build
```

Then create and run the containers:

```bash
docker compose up
```

### Setup data

Steps to add some data:

1. Create a user: `POST /api/users` with `{ username, password }`
2. Create a machine: `POST /api/machines` with `{ name, status }`
3. Create a service: `POST /api/services` with `{ type, service, date, price, machineId }`
4. Repeat steps 1 to 3 for more users, machines and services
