import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons'
import Text from '../components/Text'
import firebase from 'firebase';
import 'firebase/firestore'
import moment from 'moment';
import { RefreshControl, ScrollView } from 'react-native';
import { View } from 'react-native-web';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = () => {

    const [refreshing, setRefreshing] = useState(false)

    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);


    const fetchPosts = async () => {
        try {
            const postsList = []

            await firebase.firestore()
                .collection('posts')
                .orderBy('postTime', 'desc')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const {
                            userId,
                            username,
                            post,
                            postImg: postImg,
                            postTime,
                            likes,
                            comments,
                        } = doc.data()
                        postsList.push({
                            id: doc.id,
                            userId,
                            username,
                            userImg: 'https://firebasestorage.googleapis.com/v0/b/art-gallery-2-0.appspot.com/o/profilePhotos%2F7oye4DHgL5c12V5ltPlShTFA6uB2?alt=media&token=6727b0d3-e2a7-44f7-b07e-e722273878cd',
                            postTime,
                            post,
                            postImg: postImg,
                            likes,
                            comments,

                        })
                    })
                })

            setPosts(postsList)
            if (loading) {
                setLoading(false)
            }

            // console.log('Posts: ', posts);

        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        fetchPosts()
        if (refreshing == true) {
            fetchPosts()
        }
    }, [])

    const renderPost = ({ item }) =>
        <PostContainer>
            <PostHeaderContainer>
                <PostProfilePhoto
                    source={{ uri: item.userImg }}
                />
                <PostInfoContainer>

                    <Text medium>
                        {item.username}
                    </Text>

                    <Text tiny color="#c1c3cc" margin="4px 0 0 0">
                        {moment(item.postTime.toDate()).fromNow()}
                    </Text>
                </PostInfoContainer>

            </PostHeaderContainer>

            <Post>
                <Text margin="5px">
                    {item.post}
                </Text>
                <PostPhoto source={{ uri: item.postImg }} />
                <>
                    {console.log(item.postImg)}
                </>
                <PostDetails>
                    <PostLikes>
                        <Ionicons name='heart-outline' size={24} color="#73788b" />

                    </PostLikes>
                    <Text tiny margin="4px 0 0 10px">
                        {item.likes + 10}
                    </Text>
                    <PostComments>
                        <Ionicons
                            name='chatbox-ellipses-outline'
                            size={24}
                            color="#73788b" />
                    </PostComments>
                    <Text tiny margin="4px 0 0 8px">
                        {item.comments + 5}
                    </Text>

                </PostDetails>
            </Post>

        </PostContainer>

    return (
        <Container>
            <FeedContainer>
                <Feed
                    data={posts}
                    renderItem={renderPost}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </FeedContainer>

            <StatusBar barStyle="dark-content" />
        </Container>

    )
}

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    padding-top: 10px;
`;

const TitleContainer = styled.View`
    borderBottom-width: 1px;
    height: 40px;
`;

const FeedContainer = styled.View`

`;

const Feed = styled.FlatList`

`;

const PostContainer = styled.View`
    margin: 12px 8px 5px 8px;
    background-color: #F1F1F1;
    padding: 5px;
    border-radius: 15px;
    border-width: 1px;
    border-color: #22e342;
    
`;

const PostHeaderContainer = styled.View`
    flex-direction: row;
    margin-bottom: 16px;
    align-items: center;
`;

const PostProfilePhoto = styled.Image`
    background-color: black;
    width: 48px;
    height: 48px;
    border-radius: 24px;
`;

const PostInfoContainer = styled.View`
    flex: 1;
    margin: 0 10px;
`;

const Options = styled.View`

`;

const Post = styled.View`
    margin-left: 15px;

`;

const PostPhoto = styled.Image`
    width: 97%;
    height: 200px;
    border-radius: 3px;
`;

const PostDetails = styled.View`
    flex-direction: row;
    margin-top: 12px;
    margin-left: 10px;
`;

const PostLikes = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

const PostComments = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
`;

const StatusBar = styled.StatusBar`

`;

export default HomeScreen

