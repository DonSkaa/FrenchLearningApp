import axios from 'axios';
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(): JSX.Element {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isVisible, setIsVisible] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const response =
                await axios.post('http://localhost:4000/login',
                    {
                        email,
                        password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )
            navigate("/dashboard")
            // console.log('Utilisateur connecté', response.data)
        } catch (error) {
            console.error('Erreur lors de la connexion de l\'utilisateur', error)
        }
    }

    return (
        <div className="full-width flex center gap-3">
            <div className="half-width m-t-40">
                <h2>Se connecter</h2>
                <form className="flex column gap-1" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            placeholder='E-mail'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='relative'>
                        <input
                            type={isVisible ? 'text' : 'password'}
                            placeholder='Mot de passe'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setIsVisible(!isVisible)}
                            className='input-icon-btn'
                        >
                            {
                                isVisible
                                    ? <img alt="Masquer le mot de passe" src='assets/not-visible.png'></img>
                                    : <img alt="Afficher le mot de passe" src='assets/visible.png'></img>
                            }
                        </button>
                    </div>
                    <button className='strong-button' type="submit">Connexion</button>
                </form>
            </div>
        </div>
    )
}
