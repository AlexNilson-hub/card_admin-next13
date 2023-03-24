import type {NextPage} from "next";
import {useUser, useSupabaseClient} from '@supabase/auth-helpers-react'
import {useRouter} from 'next/router'
// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared'
import {useState, useEffect} from "react"
import {Text, Spacer} from "@nextui-org/react"
import CreateCards from "../../common/components/cards/CreateCards";

const Card: NextPage = () => {
    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const router = useRouter()
    const [cards, setCards] = useState<string[]>([])

    useEffect(() => {
        getCards()
    }, [])

    const getCards = async () => {
        try {
            const {data, error} = await supabaseClient
                .from("cards")
                .select("*")
                .limit(8)
            console.log(data);

            if (data != null) {
                setCards(data)
            }
        } catch (error: any) {
            alert(error.message)
        }
    }


    return (
        <>
            <Text h2>My Card</Text>
            <Text size={"$lg"}>
                Check user card
            </Text>
            <Spacer y={1} />
            {cards.map((card) => (
                <CreateCards card={card}/>
            ))}
        </>
    )
}
export default Card

