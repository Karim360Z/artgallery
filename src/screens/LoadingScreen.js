import React, { useEffect, useContext } from 'react'
import LottieView from 'lottie-react-native'
import styled from 'styled-components'
import Text from '../components/Text'
import { UserContext } from '../context/UserContext'
import { FirebaseContext } from '../context/FirebaseContext'

const LoadingScreen = () => {

    const [_, setUser] = useContext(UserContext)
    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        setTimeout(async () => {

            const user = firebase.getCurrentUser()

            if (user) {
                const userInfo = await firebase.getUserInfo(user.uid)

                setUser({
                    isLoggedIn: true,
                    email: userInfo.email,
                    uid: user.uid,
                    username: user.username,
                    profilePhotoUrl: userInfo.profilePhotoUrl
                })
            } else {

                setUser(state => ({ ...state, isLoggedIn: false }))

            }

        }, 200)
    }, [])

    return (

        <Container>
            <Text title color="#fff">
                Art Gallery
            </Text>

            <LottieView source={require("../../assets/loadingAnimation.json")}
                autoPlay
                loop
                style={{ width: "50%" }}
            />
        </Container>

    )
}

const Container = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
    background-color: #222222;
`

export default LoadingScreen
