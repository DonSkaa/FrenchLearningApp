import { SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { Deck } from "FormatedDatabase"
import { isToReview, useCallApi } from "Functions"
import { UserProgramContext } from "./UserProgramContext"

interface DeckContextType {
    decks: Deck[];
    setDecks: React.Dispatch<React.SetStateAction<Deck[] | []>>
    // getDeck: (id: number) => Deck | undefined;
    // updateDeck: (updatedDeck: Deck) => void;
}

export const DeckContext = createContext<DeckContextType>({
    decks: [],
    setDecks: function (value: SetStateAction<Deck[] | []>): void {
        throw new Error("Function not implemented.")
    },
})

function DeckContextProvider(props: React.PropsWithChildren<{}>) {

    const controller = new AbortController()
    const [decks, setDecks] = useState<Deck[]>([])
    const [updateDecks, setUpdateDecks] = useState<boolean>(false)
    const userProgramContext = useContext(UserProgramContext)
    const callApi = useCallApi()

    const getCurrentDecks = async (deckIds: number[]): Promise<Deck[]> => {
        const response = await callApi(`api/decks`, { method: "get" }, controller.signal, { deck_ids: deckIds })
        return response.data.data
    }

    useEffect(() => {
        const fetchUserProgram = async () => {
            if (userProgramContext?.currentUserProgram?.deck_ids) {

                const currentDecks = await getCurrentDecks(userProgramContext?.currentUserProgram?.deck_ids)
                const formatedDeck = currentDecks.map(deck => {
                    const cardsToReview = deck.cards.filter(card => isToReview(card))
                    return {
                        ...deck,
                        cards: cardsToReview,
                    }
                })

                setDecks(formatedDeck)
            }
        }
        fetchUserProgram()
    }, [userProgramContext?.currentUserProgram])

    // const updateDeck = (updatedDeck: Deck) => {
    //     setDecks((prvDecks) => {
    //         return prvDecks.map((deck) =>
    //             deck.id === updatedDeck.id
    //                 ? { ...updatedDeck, cards: updatedDeck.cards.filter(card => isToReview(card)) }
    //                 : deck
    //         )
    //     })
    // }

    useEffect(() => {
        console.log(decks)
    }, [decks])

    return (
        <DeckContext.Provider value={{ decks, setDecks }}>
            {props.children}
        </DeckContext.Provider>
    )
}

export default DeckContextProvider


