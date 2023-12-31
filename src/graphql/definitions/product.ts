import {
  getProduct,
  saveProduct,
  getProductsByProducer,
  updateProduct,
  deleteProducts
} from '@src/services/db'
import fetchCsv from '@src/services/csv'
import type { ProductType, UpdateProductType } from '@src/types'

export const ProductTypes = `
  type Product {
    _id: ID!
    name: String!
    vintage: String!
    producer: Producer!
  }

  type ProductInfo {
    _id: ID!
    name: String!
    vintage: String!
    producerId: String!
  }

  input ProductInput {
    name: String!
    vintage: String!
    producer: ProducerInput!
  }

  input UpdateProductInput {
    _id: String!
    name: String
    vintage: String
    producerId: String
  }
`

export const ProductQuery = `
  product(_id: String!): Product!
  productsByProducer(producerId: String!): [Product!]!
`

export const ProductsMutation = `
  createProducts(products: [ProductInput!]!): [ProductInfo!]!
  updateProduct(product: UpdateProductInput!): String!
  deleteProducts(_ids: [String!]!): String!
  fetchProducts(url: String!): String!
`

interface CreateProps {
  products: ProductType[]
}

interface ProductProps {
  _id: string
}

interface ProductByProduceProps {
  producerId: string
}

interface UpdateProductProps {
  product: UpdateProductType
}

interface DeleteProductsProps {
  _ids: string[]
}

interface FetchProductsProps {
  url: string
}

export const productResolvers = {
  product: async ({ _id }: ProductProps) => {
    return await getProduct(_id)
  },
  productsByProducer: async ({ producerId }: ProductByProduceProps) => {
    return await getProductsByProducer(producerId)
  },
  createProducts: async ({ products }: CreateProps) => {
    return await saveProduct(products)
  },
  deleteProducts: async ({ _ids }: DeleteProductsProps) => {
    await deleteProducts(_ids)
    return 'ok'
  },
  updateProduct: async ({ product }: UpdateProductProps) => {
    await updateProduct(product)
    return 'ok'
  },
  fetchProducts: async ({ url }: FetchProductsProps) => {
    await fetchCsv(url)
    return true
  }
}
