import { Navbar, Button, Text } from '@nextui-org/react'
import {useUser, useSupabaseClient} from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
// import Link from "next/link"

const NavbarComponent = () => {
    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const router = useRouter()
    function signOutUser() {
        supabaseClient.auth.signOut()
        router.push("/")
    }

    return (
        <Navbar isBordered isCompact>
            <Navbar.Brand href={"/"}>
                NAME BRAND
            </Navbar.Brand>
            <Navbar.Content hideIn={"xs"} variant="highlight-rounded">
                <Navbar.Link href={"/card"}>My card</Navbar.Link>
                <Navbar.Link href={"/createCard"}>Create card</Navbar.Link>
            </Navbar.Content>

            <Navbar.Content>
                {!user ?
                    <>
                        <Navbar.Link href={"/login"}>
                            <Button auto flat>
                                Login
                            </Button>
                        </Navbar.Link>
                    </>
                    :
                    <>
                        <Navbar.Item>
                            <Text>Привет, {user?.email}</Text>
                        </Navbar.Item>
                        <Navbar.Item >
                            <Button auto flat onPress={() => signOutUser()}>
                                Выйти
                            </Button>
                        </Navbar.Item>
                    </>
                }
            </Navbar.Content>
        </Navbar>

    )
}
export default NavbarComponent;