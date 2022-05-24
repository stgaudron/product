import { ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { ProductController } from "./product.controller";
import { CreateProductRequest } from "./types/requests/create-product.request";
import { DeleteProductRequest } from "./types/requests/delete-product.request";
import { GetProductRequest } from "./types/requests/get-product.request";
import { SearchProductRequest } from "./types/requests/search-product.request";
import { UpdateProductRequest } from "./types/requests/update-product.request";

export function productRoutes(controller: ProductController): ServerRoute[] {
    return [
        {
            method: 'POST',
            path: '/v1/product',
            options: {
                handler: (request: CreateProductRequest, reply: ResponseToolkit) => controller.createProduct(request,reply),
                description: 'Create Product',
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/v1/product/{reference}',
            options: {
                handler: (request: GetProductRequest, reply: ResponseToolkit) => controller.getProduct(request,reply),
                description: 'Get Product',
                tags: ['api']
            }
        },
        {
            method: 'PUT',
            path: '/v1/product/{reference}',
            options: {
                handler: (request: UpdateProductRequest, reply: ResponseToolkit) => controller.updateProduct(request, reply),
                description: 'Update Product',
                tags: ['api']
            }
        },
        {
            method: 'DELETE',
            path: '/v1/product/{reference}',
            options: {
                handler: (request: DeleteProductRequest, reply: ResponseToolkit) => controller.deleteProduct(request, reply),
                description: 'Soft Delete Product',
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/v1/products',
            options: {
                handler: (request: SearchProductRequest, reply: ResponseToolkit) => controller.searchProduct(request, reply),
                description: 'Search Products',
                tags: ['api']
            }
        }
    ]
}