import { useCallApi } from "Functions";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "store";

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const callApi = useCallApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setWrongPassword(false);
    try {
      await callApi(`/api/login`, { method: "post" }, null, {
        email,
        password,
      }).then((res) => {
        const userData = res.data;
        store.currentUser = userData;
      });

      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          setWrongPassword(true);
        }
        console.error("Erreur lors de la connexion de l'utilisateur", error);
      }
    }
  };

  return (
    <div className="full-width flex center gap-3">
      <div className="main-section m-t-40">
        <h2>Se connecter</h2>
        <form className="flex column gap-1" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="input-icon-btn"
            >
              {isVisible ? (
                <img
                  alt="Masquer le mot de passe"
                  src="assets/not-visible.png"
                ></img>
              ) : (
                <img
                  alt="Afficher le mot de passe"
                  src="assets/visible.png"
                ></img>
              )}
            </button>
          </div>
          {wrongPassword ? (
            <div className="warning">
              L'identifiant ou le mot de passe est erroné
            </div>
          ) : null}
          <button className="strong-button" type="submit">
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}
