# solid-outer-router

### Install

`npm i https://github.com/twfarland/solid-outer-router`
`yarn add https://github.com/twfarland/solid-outer-router`

### Usage

```typescript
import { setRoutes, route } from "solid-outer-router";

initialize(history);

setRoutes([
  ["/", Home],
  ["/profile/:profileId", Profile]
]);

export function App() {
  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/profile/123">Profile</Link>
      {route()}
    </>
  );
}
```



