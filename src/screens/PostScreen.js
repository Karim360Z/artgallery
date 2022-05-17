import styled from "styled-components"
import Platform, { ActivityIndicator, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { AntDesign } from '@expo/vector-icons'
import Text from '../components/Text'
import firebase from 'firebase';
import 'firebase/firestore'
import { UserContext } from "../context/UserContext"
const PostScreen = () => {

    const [user, setUser] = useContext(UserContext)
    const [post, setPost] = useState(null)
    const [postPhoto, setPostPhoto] = useState()
    const [uploading, setUploading] = useState(false)

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
                setPostPhoto(result.uri)
            }

        } catch (error) {
            console.log("Error @pickImage: ", error)
        }
    }

    const addPostPhoto = async () => {

        const status = await getPermission()

        if (status !== "granted") {
            alert("App needs permission to access your photo gallery")

            return
        }

        pickImage()

    }

    const uploadPost = async () => {
        const imageUrl = await uploadImage()
        console.log("imageUrl: ", imageUrl)
        console.log('Post: ', post)

        firebase.firestore()
            .collection('posts')
            .add({
                userId: user.uid,
                username: user.username,
                post: post,
                postImg: imageUrl,
                postTime: firebase.firestore.Timestamp.fromDate(new Date()),
                likes: null,
                comments: null,
            })
            .then(() => {
                console.log("Post Added")
                Alert.alert(
                    'Posted Successfully!',
                    'Your post has been successfully posted.',
                )
                setPost(null)
            })
            .catch((error) => {
                console.log("Error @uploadPost: ", error)
            })
    }
    const getBlob = async (uri) => {
        return await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.onload = () => {
                resolve(xhr.response)
            }

            xhr.onerror = () => {
                reject(new TypeError("Network request failed."))
            }

            xhr.responseType = "blob"
            xhr.open("GET", uri, true)
            xhr.send(null)
        })
    }
    const uploadImage = async () => {
        if (postPhoto == null) {
            return null
        }
        const uploadUri = await getBlob(postPhoto)
        const storageRef = firebase.storage().ref(`posts/${uploadUri}`);

        setUploading(true);

        const task = storageRef.put(uploadUri)

        try {
            await task

            const url = await storageRef.getDownloadURL()
            setUploading(false);
            setPostPhoto(null)
            return url
        } catch (error) {
            console.log("Error @uploadPost: ", error)
            return null
        }
    }


    return (
        <Container>
            <Text medium bold color="#ebebeb">Post to Community</Text>
            <ProfilePhotoContainer onPress={addPostPhoto}>
                {postPhoto ? (
                    <ProfilePhoto source={{ uri: postPhoto }} />

                ) : (
                    <DefaultProfilePhoto>
                        <AntDesign name="plus" size={24} color="#fff" />
                    </DefaultProfilePhoto>
                )}

            </ProfilePhotoContainer>
            <TextContainer>
                <PostTitle>What's On Your Mind</PostTitle>
                <PostField
                    autoCorrect={false}
                    autoFocus={false}
                    onChangeText={post => setPost(post)}
                    value={post}
                    multiline={true}

                />
            </TextContainer>

            <PostButton onPress={uploadPost}>
                {uploading ? (
                    <Loading />
                ) : (
                    <Text large bold center color="#ebebeb">Post</Text>
                )}
            </PostButton>


            <HeaderGraphic>
                <RightCircle />
                <LeftCircle />
            </HeaderGraphic>

        </Container>


    )
}

export default PostScreen

const Container = styled.View`
    flex: 1
`;

const ProfilePhotoContainer = styled.TouchableOpacity`
    background-color: #8a8a8a;
    width: 250px;
    height: 150px;
    border-radius: 3px;
    align-self: center;
    margin-top: 175px;
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

const HeaderGraphic = styled.View`
    position: absolute;
    width: 40%;
    top: -50px;
    z-index: -100
`;

const RightCircle = styled.View`
    background-color : #40e65c;
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 250px;
    right: -100px;
    top:-200px;
`;

const LeftCircle = styled.View`
    background-color : #727d74;
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    left: -50px;
    top:-50px;
    
` ;

const TextContainer = styled.View`
    margin: 25px 5px 5px 5px;
    align-items: center;
`;

const PostTitle = styled(Text)`
    color: #383838;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;

`;

const PostField = styled.TextInput`
    margin-top: 10px;
    border-bottom-color: #919191;
    border-bottom-width: 2px;
    height: 50px;
    width: 250px;

`;

const PostButton = styled.TouchableOpacity`
    margin: 55px 65px 0 65px;
    height: 45px;
    align-items: center;
    justify-content: center;
    background-color: #40e65c;
    border-radius: 7px;

`;

const Loading = styled.ActivityIndicator.attrs(props => ({
    color: '#fff',
    size: 'small'
}))``;