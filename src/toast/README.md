# Toast system

This project exposes a lightweight global toast system through `ToastProvider` and `useToast`.

## Usage

Wrap the app once:

```tsx
import {ToastProvider} from './toast';

<ToastProvider>
  <App />
</ToastProvider>
```

Trigger a toast from any component inside the provider:

```tsx
import {useToast} from '../toast';

const {success, error, info, warning} = useToast();

success('Saved', 'Your changes were stored successfully.');
error('Oops', 'Something went wrong.');
```

Toasts auto-dismiss by default after 5 seconds and also expose manual dismiss controls.

