import { gql } from "@apollo/client";

export const PRODUCT_GQL = gql`
  query HomePage(
    $cursor: String
    $postCursor: String
    $featured: Boolean!
    $includeAds: Boolean!
    $visibleOnHomepage: Boolean!
  ) {
    sections(first: 1, after: $cursor, featured: $featured) {
      edges {
        cursor
        node {
          id
          date
          cutoffIndex
          postsCount
          ad(kind: "feed", bundle: homepage_other) {
            id
            ...AdFragment
            __typename
          }
          cards(first: 1, daysAgo: $cursor) {
            edges {
              node {
                ...FeedCards
                __typename
              }
              __typename
            }
            __typename
          }
          posts(after: $postCursor, visible_on_homepage: $visibleOnHomepage) {
            edges {
              node {
                ...PostItemList
                featuredComment {
                  id
                  body: bodyText
                  user {
                    id
                    ...UserImage
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            pageInfo {
              endCursor
              hasNextPage
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      pageInfo {
        endCursor
        hasNextPage
        __typename
      }
      __typename
    }
    adPrimary: ad(kind: "feed", bundle: homepage_primary)
      @include(if: $includeAds) {
      id
      ...AdFragment
      __typename
    }
    adSecondary: ad(kind: "feed", bundle: homepage_secondary)
      @include(if: $includeAds) {
      id
      ...AdFragment
      __typename
    }
  }
  fragment FeedCards on Card {
    ...NewPostsCard
    ...MakersDiscussionCardFragment
    __typename
  }
  fragment NewPostsCard on NewPostsCard {
    posts {
      ...PostItemList
      __typename
    }
    __typename
  }
  fragment PostItemList on Post {
    id
    ...PostItem
    __typename
  }
  fragment PostItem on Post {
    id
    _id
    commentsCount
    name
    shortenedUrl
    slug
    tagline
    updatedAt
    pricingType
    topics(first: 1) {
      edges {
        node {
          id
          name
          slug
          __typename
        }
        __typename
      }
      __typename
    }
    ...PostThumbnail
    ...PostVoteButton
    __typename
  }
  fragment PostThumbnail on Post {
    id
    name
    thumbnail {
      id
      ...MediaThumbnail
      __typename
    }
    ...PostStatusIcons
    __typename
  }
  fragment MediaThumbnail on Media {
    id
    imageUuid
    __typename
  }
  fragment PostStatusIcons on Post {
    name
    productState
    __typename
  }
  fragment PostVoteButton on Post {
    _id
    id
    featuredAt
    updatedAt
    createdAt
    disabledWhenScheduled
    hasVoted
    ... on Votable {
      id
      votesCount
      __typename
    }
    __typename
  }
  fragment MakersDiscussionCardFragment on MakersDiscussionCard {
    discussion {
      _id
      id
      ...DiscussionThreadListItem
      __typename
    }
    __typename
  }
  fragment DiscussionThreadListItem on DiscussionThread {
    _id
    id
    title
    description
    descriptionHtml
    slug
    commentsCount
    can_comment: canComment
    canEdit
    votesCount
    hasVoted
    createdAt
    poll {
      ...PollFragment
      __typename
    }
    user {
      id
      name
      username
      headline
      avatarUrl
      ...UserImage
      __typename
    }
    __typename
  }
  fragment PollFragment on Poll {
    id
    answersCount
    hasAnswered
    options {
      id
      text
      imageUuid
      answersCount
      answersPercent
      hasAnswered
      __typename
    }
    __typename
  }
  fragment UserImage on User {
    _id
    id
    name
    username
    avatarUrl
    headline
    isViewer
    ...KarmaBadge
    __typename
  }
  fragment KarmaBadge on User {
    karmaBadge {
      kind
      score
      __typename
    }
    __typename
  }
  fragment AdFragment on AdChannel {
    id
    post {
      id
      slug
      name
      updatedAt
      commentsCount
      ...PostVoteButton
      __typename
    }
    ctaText
    dealText
    name
    tagline
    thumbnailUuid
    url
    __typename
  }
`;
