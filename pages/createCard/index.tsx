import type { NextPage } from "next";
import {useUser, useSupabaseClient} from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { Text, Textarea, Grid, Button } from '@nextui-org/react'
// import { CameraIcon } from '../../utils/constants/types';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { useState } from "react";

const CreateCard: NextPage = () => {
    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const router = useRouter()

    const initialState = {
        title: "",
        content: "",
        // images: ""
    }
    const [cardData, setCardData] = useState(initialState)

    const handleChange = (e: any) => {
        setCardData({...cardData, [e.target.name]: e.target.value })
    }

    const createCard = async () => {
        try {
            const {data, error} = await supabaseClient
                .from("cards")
                .insert([
                    {
                        title: cardData.title,
                        content: cardData.content,
                        // images: cardData.images,
                        user_email: user?.email?.toLowerCase(),
                        user_id: user?.id
                    }
                ])
                .single()
            if (error) throw error;
            setCardData(initialState)
            router.push("/card");
        } catch (error: any) {
            alert(error.message)
        }
    }

    return(
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
                />
            </Grid>
            <Text h3>Content</Text>
            <Grid xs={12}>
                <Textarea
                    name={"content"}
                    aria-label={"content"}
                    placeholder={"Card content"}
                    fullWidth
                    rows={6}
                    size={"xl"}
                    onChange={handleChange}
                />
            </Grid>
            <Grid xs={12}>
                <Text>Create as {user?.email}</Text>
            </Grid>
            <Button onPress={createCard}>create card</Button>
        </Grid.Container>
    )
}
export default CreateCard

export const getServerSideProps = async(ctx: GetServerSidePropsContext) => {
    const supabase = createServerSupabaseClient(ctx)
    const {
        data: {session},
    } = await supabase.auth.getSession()

    if (!session)
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    return {
        props: {
            initialSession: session,
            user: session.user,
        }
    }

}

