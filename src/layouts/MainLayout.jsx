import { Link, Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      <header className="header">
        <h1>Pokédex</h1>

        <nav>
          <Link to="/">Inici</Link>
        </nav>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}