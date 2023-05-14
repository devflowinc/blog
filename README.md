# Arguflow blog monorepo

## Installing dependencies

### Install frontend dependcies

```sh
pnpm --filter frontend install
```

### Ensure backend compiles

```sh
pnpm cargo:build
```

## Running 

### Run the frontend 

```sh
pnpm astro:dev
```

### Run the backend

```sh
pnpm rocket:run
```
