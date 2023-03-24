import {NextPage} from 'next'
// import {useUser} from '@supabase/auth-helpers-react'
import {useRouter} from "next/router";
import {Card, Spacer, Text, Image} from '@nextui-org/react'
import {CardProps} from '../../../utils/types/cards'
import {supabase} from "@supabase/auth-ui-shared";

const CreateCards: NextPage<CardProps> = (props) => {
    const {card} = props
    const router = useRouter()

    function getDates() {
        let time = Date.parse(card.inserted_at)
        let date = new Date(time)
        const dates = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        const h = date.getHours().toString().padStart(2, "0");
        const m = date.getMinutes().toString().padStart(2, "0");

        return `${dates}.${month}.${year}, ${h}:${m}`

        // return date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();
        // return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    }

    // const {date} = supabase.storage
    //     .from('cards')
    //     .getPublicUrl(date.images, {
    //         transform: {
    //             width: 500,
    //             height: 600,
    //         },
    //     })

    return (
        <>
            <Card isPressable
                  onPress={() => router.push('/pay?id=' + card.id)}
            >
                <Card.Body>
                    <Image key={card.id}
                           src={"https://get.wallhere.com/photo/grass-mustache-black-hair-hair-man-beard-guy-camera-operator-situation-625460.jpg"}/>
                    <Text h2>{card.title}</Text>
                    <Text h2>{card.content}</Text>
                    <Text b>Date: {getDates()}</Text>
                    <Text b>By {card.user_email.toLowerCase()}</Text>
                </Card.Body>

            </Card>
            <Spacer y={1}/>
        </>
    );
};

export default CreateCards;
