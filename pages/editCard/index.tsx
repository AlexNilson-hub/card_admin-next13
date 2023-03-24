import {GetServerSidePropsContext, NextPage} from 'next'
import {useSupabaseClient, useUser} from '@supabase/auth-helpers-react'
import {useRouter} from "next/router";
import {useState, useEffect} from "react";
import {Spacer, Text, User, Button, Grid, Textarea} from '@nextui-org/react'
import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs";


const EditCard: NextPage = () => {
    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const router = useRouter()
    // const [pays, setPays] = useState<any>({});

    const {id} = router.query

    const initialState = {
        title: "",
        content: ""
    }
    const [cardData, setCardData] = useState(initialState)

    const handleChange = (e: any) => {
        setCardData({...cardData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        async function getPays() {
            const {data, error} = await supabaseClient
                .from("cards")
                .select("*")
                .filter("id", "eq", id)
                .single()
            if (error) {
                console.log(error)
            }else {
                setCardData(data)
            }
        }
        if (typeof id !== "undefined") {
            getPays()
        }
    }, [id])

    const editCards = async () => {
        try {
            const {data, error} = await supabaseClient
                .from("cards")
                .update([
                    {
                        title: cardData.title,
                        content: cardData.content,
                    }
                ])
                .eq("id", id)
            if (error) throw error;
            router.push("/pay?id=" + id);
        } catch (error: any) {
            alert(error.message)
        }
    }

    console.log(cardData)
    return (
        <Grid.Container gap={1}>
            <Text h3>Title</Text>
            <Grid xs={12}>
                <Textarea
                    name={"title"}
                    aria-label={"title"}
                    placeholder={"Card Title"}
                    fullWidth
                    rows={1}
                    size={"xl"}
                    onChange={handleChange}
                    initialValue={cardData.title}
                />
            </Grid>
            <Text h3>Content</Text>
            <Grid xs={12}>
                <Textarea
                    name={"content"}
                    aria-label={"content"}
                    placeholder={"Card Title"}
                    fullWidth
                    rows={6}
                    size={"xl"}
                    onChange={handleChange}
                    initialValue={cardData.content}
                />
            </Grid>
            <Grid xs={12}>
                <Text>Update as {user?.email}</Text>
            </Grid>
            <Button onPress={editCards}>Update card</Button>
        </Grid.Container>
    );
};

export default EditCard;
