import { UserContext } from 'AppContainer/Context/UserContext';
import { CurrentUser } from 'FormatedDatabase';
import { useCallApi } from 'Functions';
import axios from 'axios';
import { useState, FormEvent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignUpProps {
    setter?: (value: any) => void | null;
    setterPopUp?: (value: any) => void | null;
    type?: 'teacher' | 'student';
}

export default function SignUp({ setter, setterPopUp, type = 'teacher' }: SignUpProps): JSX.Element {

    const navigate = useNavigate()
    const callApi = useCallApi()
    const userContext = useContext(UserContext)
    const [isVisible, setIsVisible] = useState(false)
    const [userData, setUserData] = useState({
        program_id: '',
        type: type,
        name: '',
        email: '',
        password: '',
        teacher_id: type === 'teacher' ? null : userContext?.currentUser?.id,
    })

    const updateUserDataKey = (key: string, value: string) => {
        setUserData({ ...userData, [key]: value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            await callApi(`/api/signup`, { method: "post" }, null, userData)
                .then(res => {
                    if (type === 'teacher') {
                        const userData = res.data
                        setter && setter(true)
                        if (userContext) {
                            userContext.setCurrentUser(userData)
                        }
                        navigate("/dashboard")
                    } else if (type === 'student') {
                        setterPopUp && setterPopUp(false)
                        userContext?.setCurrentStudents(prevStudents => prevStudents ? [...prevStudents, res.data] : [res.data]);
                    }
                })

        } catch (error: unknown) {
            setter && setter(false)
            if (axios.isAxiosError(error)) {
                console.error('Erreur lors de la création de l\'utilisateur', error)
            }
        }
    }

    return (
        <div className="full-width flex center gap-3">
            <div className="half-width m-t-40">
                <h2>Créer un compte</h2>
                <form className="flex column gap-1" onSubmit={handleSubmit}>
                    {
                        type === 'student'
                            ? <div className='m-b-10'>
                                <input
                                    placeholder='Type de programme'
                                    value={userData.program_id}
                                    onChange={(e) => updateUserDataKey('program_id', e.target.value)}
                                    required
                                />
                            </div>
                            : null}
                    <div>
                        <input
                            placeholder="Nom d'utilisateur"
                            value={userData.name}
                            onChange={(e) => updateUserDataKey('name', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            placeholder='E-mail'
                            value={userData.email}
                            onChange={(e) => updateUserDataKey('email', e.target.value)}
                            required
                        />
                    </div>
                    <div className='relative'>
                        <input
                            type={isVisible ? 'text' : 'password'}
                            placeholder='Mot de passe'
                            value={userData.password}
                            onChange={(e) => updateUserDataKey('password', e.target.value)}
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
                    <button className='strong-button' type="submit">Créer un compte</button>
                </form>
            </div>
        </div>
    )
}
