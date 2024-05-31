import { Link } from "react-router-dom";

export default function HomePage(): JSX.Element {
  return (
    <div className="full-width m-t-40 m-4 gap-1">
      <h1 className="text-center m-b-40">Bienvenue sur Learning French !</h1>
      <div className="flex center gap-1">
        <Link className="item" to={"/signup-teacher"}>
          <div className="flex column">
            <h3>Créer un compte d'enseignant</h3>
            <p className="text-center">
              Si vous êtes un nouvel élève, contactez votre enseignant pour
              qu'il vous crée un compte
            </p>
          </div>
        </Link>
        <Link className="item" to={"/login"}>
          <h3>J'ai déjà un compte</h3>
        </Link>
      </div>
    </div>
  );
}
