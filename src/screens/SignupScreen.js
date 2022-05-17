import React, { useState, useContext } from 'react'
import Platform, { KeyboardAvoidingView } from 'react-native'
import styled from "styled-components"
import Text from '../components/Text'
import { AntDesign } from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { FirebaseContext } from '../context/FirebaseContext'
import { UserContext } from '../context/UserContext'

export default SignupScreen = ({ navigation }) => {

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [profilePhoto, setProfilePhoto] = useState()
    const firebase = useContext(FirebaseContext)
    const [_, setUser] = useContext(UserContext)

    const getPermission = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            return status
        }
    }

    const pickImage = async () => {

        try {

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            })

            if (!result.cancelled) {
                setProfilePhoto(result.uri)
            }

        } catch (error) {
            console.log("Error @pickImage: ", error)
        }
    }

    const addProfilePhoto = async () => {

        const status = await getPermission()

        if (status !== "granted") {
            alert("App needs permission to access your photo gallery")

            return
        }

        pickImage()

    }

    const signUp = async () => {
        setLoading(true)

        const user = { username, email, password, profilePhoto }

        try {

            const createUser = await firebase.createUser(user)

            setUser({ ...createUser, isLoggedIn: true })

        } catch (error) {
            console.log("Error @signUp: ", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <Main>
                <Text large semi center >
                    Signup to Art Gallery
                </Text>
            </Main>

            <ProfilePhotoContainer onPress={addProfilePhoto}>
                {profilePhoto ? (
                    <ProfilePhoto source={{ uri: profilePhoto }} />

                ) : (
                    <DefaultProfilePhoto>
                        <AntDesign name="plus" size={24} color="#fff" />
                    </DefaultProfilePhoto>
                )}

            </ProfilePhotoContainer>

            <Auth>
                <AuthContainer>
                    <AuthTitle>Username</AuthTitle>
                    <AuthField
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={false}
                        onChangeText={username => setUsername(username.trim())}
                        value={username}
                    />
                </AuthContainer>
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

            <SignupContainer onPress={signUp} disabled={loading}>
                {loading ? (
                    <Loading />
                ) : (
                    <Text medium bold center color="#dedede">
                        Signup
                    </Text>
                )}
            </SignupContainer>

            <Login onPress={() => navigation.navigate("Login")}>
                <Text small center>Already have an account?
                    <Text bold color="#26d142"> Login</Text>
                </Text>
            </Login>


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
    margin-top: 145px;
`;

const ProfilePhotoContainer = styled.TouchableOpacity`
    background-color: #8a8a8a;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    align-self: center;
    margin-top: 20px;
    overflow: hidden;

`;

const DefaultProfilePhoto = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const ProfilePhoto = styled.Image`
    flex: 1;
`;

const Auth = styled.View`
    margin: 16px 32px 32px;

`;

const AuthContainer = styled.View`
    margin-bottom: 32px;
`;

const AuthTitle = styled(Text)`
    color: #8e93a1;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;

`;

const AuthField = styled.TextInput`
    border-bottom-color: #919191;
    border-bottom-width: 1px;
    height: 48px;
`;

const SignupContainer = styled.TouchableOpacity`
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

const Login = styled.TouchableOpacity`
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