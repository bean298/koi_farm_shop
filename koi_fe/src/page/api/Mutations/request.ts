import { gql } from "@apollo/client";

// Mutation để tạo một request mới
export const CREATE_REQUEST = gql`
  mutation CreateRequest($data: RequestCreateInput!) {
    createRequest(data: $data) {
      consignment {
        id
      }
      description
      user {
        id
      }
    }
  }
`;

// // Mutation để thêm chi tiết cá Koi vào bảng ConsignmentSale
export const CREATE_CONSIGNMENT_SALE = gql`
  mutation CreateConsignmentSale(
    $name: String!
    $birth: Int!
    $sex: String!
    $medical: String!
    $size: Int!
    $description: String!
    $generic: String!
    $image: Upload!
    $category: String!
    $estimatedPrice: String!
  ) {
    createConsignmentSale(
      data: {
        name: $name
        birth: $birth
        sex: $sex
        medical: $medical
        size: $size
        description: $description
        generic: $generic
        photo: { create: { image: $image, title: $name } }
        category: $category
        estimatedPrice: $estimatedPrice
      }
    ) {
      id
      name
      birth
      sex
      medical
      size
      description
      generic
      photo {
        image {
          filename
          publicUrl
        }
      }
      category
      estimatedPrice
    }
  }
`;

export const CANCEL_REQUEST = gql`
  mutation CancelRequest($id: ID!, $status: String!) {
    updateRequest(where: { id: $id }, data: { status: $status }) {
      id
      status
    }
  }
`;

export const ACCEPT_REQUEST = gql`
  mutation AcceptRequest(
    $id: ID!
    $status: String!
    $consignmentId: ID!
    $consignmentStatus: String!
  ) {
    updateRequest(where: { id: $id }, data: { status: $status }) {
      id
      status
    }
    updateConsignmentStatus: updateConsignmentSale(
      where: { id: $consignmentId }
      data: { status: $consignmentStatus }
    ) {
      id
      status
    }
  }
`;
