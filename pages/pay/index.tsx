import {NextPage} from 'next'
import {useSupabaseClient, useUser} from '@supabase/auth-helpers-react'
import {useRouter} from "next/router";
import {useState, useEffect} from "react";
import {Spacer, Text, User, Button} from '@nextui-org/react'


const Pay: NextPage = () => {
    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const router = useRouter()
    const [pays, setPays] = useState<any>({});

    const {id} = router.query

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
                setPays(data)
            }
        }
        if (typeof id !== "undefined") {
            getPays()
        }
    }, [id])

    const deletePays = async() => {
        try {
            const {data, error} = await supabaseClient
                .from("cards")
                .delete()
                .eq("id", id)
            if (error) throw error;
                router.push("/card");
        }catch (error: any) {
            alert(error.message)
        }

    }

    return (
        <>
            <Text h2>{pays.title}</Text>
            <Spacer y={.5}/>
            <User name={pays.user_email?.toLowerCase()}
                  size={"md"}
            />
            <Spacer y={1} />
            <Text size={"$lg"}>
                {pays.content}
            </Text>
            {user && pays.user_id === user.id ?
                <>
                    <Button onPress={() => router.push("/editCard?id=" + id)} size={"sm"}>Редактировать</Button>
                    <Spacer y={.5}/>
                    <Button onPress={() => deletePays()} size={"sm"} color={"error"}>Удалить</Button>
                </>
                : null}
        </>
    );
};

export default Pay;
