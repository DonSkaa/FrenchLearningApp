import { createContext, useContext, useEffect, useState } from "react"
import { Deck } from "FormatedDatabase"
import { isToReview, useCallApi } from "Functions"
import { FLA_ENDPOINT } from "AppConstantes";
import { UserProgramContext } from "./UserProgramContext";

interface DeckContextType {
    decks: Deck[];
    // getDeck: (id: number) => Deck | undefined;
    // updateDeck: (updatedDeck: Deck) => void;
}

export const DeckContext = createContext<DeckContextType>({
    decks: [],
    // getDeck: () => undefined,
    // updateDeck: () => { },
})

function DeckContextProvider(props: React.PropsWithChildren<{}>) {

    const controller = new AbortController()
    const [decks, setDecks] = useState<Deck[]>([])
    const userProgramContext = useContext(UserProgramContext)
    const callApi = useCallApi()

    const getCurrentDecks = async (deckIds: number[]): Promise<Deck[]> => {
        const response = await callApi(`${FLA_ENDPOINT}/decks`, { method: "get" }, controller.signal, { deck_ids: deckIds })
        return response.data.data
    }

    useEffect(() => {
        const fetchUserProgram = async () => {
            if (userProgramContext?.currentUserProgram?.deck_ids) {

                const currentDecks = await getCurrentDecks(userProgramContext?.currentUserProgram?.deck_ids)
                setDecks(currentDecks)
            }
        }
        fetchUserProgram()
    }, [userProgramContext?.currentUserProgram])

    // useEffect(() => {
    //     setDecks(pvsDeck => {
    //         const newDeck = pvsDeck.map(deck => {
    //             const cardsToReview = deck.cards.filter(card => isToReview(card))
    //             return {
    //                 ...deck,
    //                 cards: cardsToReview,
    //             }
    //         })
    //         return newDeck
    //     })
    // }, [])

    // const getDeck = (id: number) => {
    //     return decks.find(deck => deck.id === id)
    // }

    // const updateDeck = (updatedDeck: Deck) => {
    //     setDecks((prvDecks) => {
    //         return prvDecks.map((deck) =>
    //             deck.id === updatedDeck.id
    //                 ? { ...updatedDeck, cards: updatedDeck.cards.filter(card => isToReview(card)) }
    //                 : deck
    //         )
    //     })
    // }

    return (
        <DeckContext.Provider value={{ decks }}>
            {props.children}
        </DeckContext.Provider>
    )
}

export default DeckContextProvider


