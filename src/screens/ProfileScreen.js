import React, { useContext } from 'react'
import styled from 'styled-components'
import Text from '../components/Text'
import { UserContext } from '../context/UserContext'
import { FirebaseContext } from '../context/FirebaseContext'

const ProfileScreen = () => {

    const [user, setUser] = useContext(UserContext)
    const firebase = useContext(FirebaseContext)

    const logOut = async () => {
        const loggedOut = await firebase.logOut()

        if (loggedOut) {
            setUser(state => ({ ...state, isLoggedIn: false }))
        }
    }

    return (
        <Container>
            <ProfilePhotoContainer>
                <ProfilePhoto source={user.profilePhotoUrl === "default"
                    ? require("../../assets/default.png")
                    : { uri: user.profilePhotoUrl }}
                />
            </ProfilePhotoContainer>

            <Text medium bold margin="16px 0 32px 0" color="black">{user.username}</Text>

            <StatsContainer>
                <StatContainer>
                    <Text large light>1</Text>
                    <Text small bold color="#c2c4cd">Art</Text>
                </StatContainer>
                <StatContainer>
                    <Text large light>0</Text>
                    <Text small bold color="#c2c4cd">Followers</Text>
                </StatContainer>
                <StatContainer>
                    <Text large light>0</Text>
                    <Text small bold color="#c2c4cd">Following</Text>
                </StatContainer>
            </StatsContainer>

            <Logout onPress={logOut}>
                <Text medium bold color="#fff">Logout</Text>
            </Logout>

        </Container>

    )
}

const Container = styled.View`
    align-items: center;
    margin-top: 64px;
    flex: 1;
`;

const ProfilePhotoContainer = styled.View`
    shadow-opacity:0.8;
    shadow-radius: 30px;
    shadow-color: #222222
`;

const ProfilePhoto = styled.Image`
    width: 128px;
    height: 128px;
    border-radius: 64px;
`;

const StatsContainer = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 32px;
`;


const StatContainer = styled.View`
    align-items: center;
    flex:1;
`;

const Logout = styled.TouchableOpacity`
    margin-bottom: 32px;
    height: 40px;
    width: 150px;
    align-items: center;
    justify-content: center;
    background-color: #32b347;
    border-radius: 7px;
`;

export default ProfileScreen
