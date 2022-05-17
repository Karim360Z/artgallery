import React, { useState, useContext } from 'react'
import styled from "styled-components"
import Text from '../components/Text'
import { UserContext } from '../context/UserContext'
import { FirebaseContext } from '../context/FirebaseContext'

export default LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const firebase = useContext(FirebaseContext)
    const [_, setUser] = useContext(UserContext)

    const logIn = async () => {
        setLoading(true)

        try {
            await firebase.logIn(email, password)

            const uid = firebase.getCurrentUser().uid

            const userInfo = await firebase.getUserInfo(uid)

            setUser({
                username: userInfo.username,
                email: userInfo.email,
                uid,
                profilePhotoUrl: userInfo.profilePhotoUrl,
                isLoggedIn: true,
            })

        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <Main>
                <Text title semi center >
                    Welcome to Art Gallery
                </Text>
            </Main>

            <Auth>
                <AuthContainer>
                    <AuthTitle>Email</AuthTitle>
                    <AuthField
                        autoCapitalize="none"
                        autoCompleteType="email"
                        autoCorrect={false}
                        autoFocus={false}
                        keyboardType="email-address"
                        onChangeText={email => setEmail(email.trim())}
                        value={email}
                    />
                </AuthContainer>
                <AuthContainer>
                    <AuthTitle>Password</AuthTitle>
                    <AuthField
                        autoCapitalize="none"
                        autoCompleteType="password"
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={password => setPassword(password.trim())}
                        value={password}
                    />
                </AuthContainer>
            </Auth>

            <LoginContainer onPress={logIn} disabled={loading}>
                {loading ? (
                    <Loading />
                ) : (
                    <Text medium bold center color="#dedede">Login</Text>
                )}
            </LoginContainer>

            <Signup onPress={() => navigation.navigate("Signup")}>
                <Text small center>New to ArtGallery?
                    <Text bold color="#26d142"> Signup</Text>
                </Text>
            </Signup>


            <HeaderGraphic>

                <RightCircle />

                <LeftCircle />

            </HeaderGraphic>
            <StatusBar barStyle="light-content" />
        </Container>
    )
}

const Container = styled.View`
    flex: 1
`;

const Main = styled.View`
    margin-top: 160px;
`;

const Auth = styled.View`
    margin: 64px 32px 32px;

`;

const AuthContainer = styled.View`
    margin-bottom: 32px;
`;

const AuthTitle = styled(Text)`
    color: #8e93a1;
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;

`;

const AuthField = styled.TextInput`
    border-bottom-color: #919191;
    border-bottom-width: 1px;
    height: 48px;
`;

const LoginContainer = styled.TouchableOpacity`
    margin: 0 32px;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: #40e65c;
    border-radius: 7px;

`;

const Loading = styled.ActivityIndicator.attrs(props => ({
    color: '#fff',
    size: 'small'
}))``;

const Signup = styled.TouchableOpacity`
    margin-top: 16px;

`;

const HeaderGraphic = styled.View`
    position: absolute;
    width: 100%;
    top: -50px;
    z-index: -100
`;

const RightCircle = styled.View`
    background-color : #727d74;
    position: absolute;
    width: 375px;
    height: 375px;
    border-radius: 200px;
    right: -100px;
    top:-200px;
`;

const LeftCircle = styled.View`
    background-color : #40e65c;
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    left: -50px;
    top:-50px;
` ;

const StatusBar = styled.StatusBar`

`;