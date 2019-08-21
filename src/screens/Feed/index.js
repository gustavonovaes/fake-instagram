import React from "react";
import { FlatList } from "react-native";

import { chunk } from "../../utils"
import LazyImage from "../../components/LazyImage";

import {
  Container, Post, PostHeader, Avatar, Name, Description, Loading
} from "./styles";

let posts = [];
async function getPosts(page) {
  if (!posts.length) {
    const response = await fetch(`https://www.instagram.com/explore/tags/reactnative/?__a=1`)
    const data = await response.json();

    posts = data.graphql.hashtag.edge_hashtag_to_media.edges.map(({ node }) => {

      const aspectRatio = node.dimensions.width / node.dimensions.height;

      return {
        id: node.id,
        name: node.owner.id,
        url: node.thumbnail_resources[node.thumbnail_resources.length - 1].src,
        avatar_url: node.thumbnail_resources[0].src,
        urlSmall: node.thumbnail_resources[0].src,
        description: node.edge_media_to_caption.edges[0].node.text,
        aspectRatio
      }
    })
  }
  return chunk(posts, 2)[page - 1];
}

export default function Feed() {
  const [posts, setPosts] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [viewablePosts, setViewablePosts] = React.useState([]);

  async function loadMorePosts() {
    const nextPage = currentPage + 1;
    await getPosts(nextPage).then(newPosts => setPosts([...posts, ...newPosts]))
    setCurrentPage(nextPage)
  }

  async function loadInitialPosts() {
    await getPosts(1)
      .then(newPosts => {
        setPosts(newPosts)
        setLoading(false)
      })
  }

  const updateViewablePosts = React.useCallback(({ viewableItems, changed }) => {
    const ids = changed.map(({ item }) => item.id)
    setViewablePosts(ids)
  }, [])

  React.useEffect(() => {
    loadInitialPosts()
  }, []);

  return <Container>
    <FlatList
      data={posts}
      keyExtractor={({ id }) => String(id)}

      renderItem={({ item }) => (
        <Post>
          <PostHeader>
            <Avatar source={{ uri: item.avatar_url }} />
            <Name>{item.name}</Name>
          </PostHeader>

          <LazyImage
            aspectRatio={item.aspectRatio}
            shouldLoad={viewablePosts.includes(item.id)}
            smallSource={{ uri: item.urlSmall }}
            source={{ uri: item.url }}
          />

          <Description>{item.description}</Description>
        </Post>
      )}

      ListFooterComponent={() => loading && <Loading />}
      onEndReachedThreshold={.2}
      onEndReached={async () => {
        setLoading(true)
        await loadMorePosts()
        setLoading(false)
      }}

      refreshing={isRefreshing}
      onRefresh={async () => {
        setRefreshing(true)
        await loadInitialPosts()
        setRefreshing(false)
      }}

      viewabilityConfig={{
        viewAreaCoveragePercentThreshold: 50
      }}
      onViewableItemsChanged={updateViewablePosts}
    />
  </Container>
}
