import axios from 'axios';
import { useState, FormEvent } from 'react';

export default function SignUp(): JSX.Element {

    const [userProgramId, setUserProgramId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isVisible, setIsVisible] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const response =
                await axios.post('http://localhost:4000/signup',
                    {
                        userProgramId,
                        name,
                        email,
                        password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )

            console.log('Utilisateur créé', response.data)
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur', error)
        }
    }

    return (
        <div className="full-width flex center gap-3">
            <div className="half-width m-t-40">
                <h2>Créer un compte</h2>
                <form className="flex column gap-1" onSubmit={handleSubmit}>
                    <div className='m-b-10'>
                        <input
                            type="user_program_id"
                            placeholder='Type de programme'
                            value={userProgramId}
                            onChange={(e) => setUserProgramId(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="name"
                            placeholder="Nom d'utilisateur"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                                    ? <img alt="Masquer le mot de passe" src='assets/not-visible.svg'></img>
                                    : <img alt="Afficher le mot de passe" src='assets/visible.svg'></img>
                            }
                        </button>
                    </div>
                    <button className='strong-button' type="submit">Créer un compte</button>
                </form>
            </div>
        </div>
    )
}
