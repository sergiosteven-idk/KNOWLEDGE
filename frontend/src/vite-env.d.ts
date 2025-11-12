/// <reference types="vite/client" />

declare module "./contexts/AuthContext" {
  export const AuthProvider: React.FC<{ children: React.ReactNode }>;
  export const useAuth: () => any;
}

declare module "./contexts/AccessibilityContext" {
  export const AccessibilityProvider: React.FC<{ children: React.ReactNode }>;
  export const useAccessibility: () => any;
}

declare module "./components/ProtectedRoute" {
  export default function ProtectedRoute(props: {
    children: React.ReactNode;
    roles?: string[];
  }): JSX.Element;
}

declare module "./pages/Home" {
  export default function Home(): JSX.Element;
}

declare module "./pages/Dashboard" {
  export default function Dashboard(): JSX.Element;
}

declare module "./pages/Profile" {
  export default function Profile(): JSX.Element;
}

declare module "./pages/admin/AdminDashboard" {
  export default function AdminDashboard(): JSX.Element;
}

declare module "./pages/community/Eventos" {
  export default function Eventos(): JSX.Element;
}

declare module "./pages/community/Donaciones" {
  export default function Donaciones(): JSX.Element;
}

declare module "./pages/community/Feedback" {
  export default function Feedback(): JSX.Element;
}

declare module "./pages/auth/Login" {
  export default function Login(): JSX.Element;
}

declare module "./pages/auth/Register" {
  export default function Register(): JSX.Element;
}
