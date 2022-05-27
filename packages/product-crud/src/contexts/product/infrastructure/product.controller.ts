import Boom from "@hapi/boom";
import { ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { convertSearchQueryParamsToSearchParams } from "../../../infrastructure/database/datasources/tests/factory";
import { ProductDomainException } from "../domain/exceptions/product-domain.exception";
import { CreateProductUseCase } from "../Use-cases/create-product";
import { DeleteProductUseCase } from "../Use-cases/delete-product";
import { GetProductUseCase } from "../Use-cases/get-product";
import { SearchProductUseCase } from "../Use-cases/search-product";
import { UpdateProductUseCase } from "../Use-cases/update-product";
import { CreateProductRequest } from "./types/requests/create-product.request";
import { DeleteProductRequest } from "./types/requests/delete-product.request";
import { GetProductRequest } from "./types/requests/get-product.request";
import { SearchProductRequest } from "./types/requests/search-product.request";
import { UpdateProductRequest } from "./types/requests/update-product.request";

export interface ProductController {
  createProduct(
    request: CreateProductRequest,
    reply: ResponseToolkit
  ): Promise<ResponseObject>;
  getProduct(
    request: GetProductRequest,
    reply: ResponseToolkit
  ): Promise<ResponseObject>;
  updateProduct(
    request: UpdateProductRequest,
    reply: ResponseToolkit
  ): Promise<ResponseObject>;
  deleteProduct(
    request: DeleteProductRequest,
    reply: ResponseToolkit
  ): Promise<ResponseObject>;
  searchProduct(
    request: SearchProductRequest,
    reply: ResponseToolkit
  ): Promise<ResponseObject>;
}

export class RestProductController implements ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly searchProductUseCase: SearchProductUseCase
  ) {}

  async createProduct(
    request: CreateProductRequest,
    reply: ResponseToolkit
  ): Promise<ResponseObject> {
    try {
      const result = await this.createProductUseCase(request.payload);
      if (result instanceof ProductDomainException) {
        throw Boom.badRequest(result.message);
      } else {
        return reply.response(result).code(201);
      }
    } catch (e) {
      throw Boom.badRequest("Server Error");
    }
  }

  async getProduct(
    request: GetProductRequest,
    reply: ResponseToolkit
  ): Promise<ResponseObject> {
    const product = await this.getProductUseCase(request.params.reference);
    if (!product) {
      throw Boom.notFound("Product not found");
    }
    return reply.response(product).code(200);
  }

  async updateProduct(
    request: UpdateProductRequest,
    reply: ResponseToolkit
  ): Promise<ResponseObject> {
    try {
      const result = await this.updateProductUseCase(
        request.params.reference,
        request.payload
      );
      if (result instanceof ProductDomainException) {
        throw Boom.badRequest(result.message);
      } else {
        return reply.response(result).code(201);
      }
    } catch (e) {
      throw Boom.badRequest();
    }
  }

  async deleteProduct(
    request: DeleteProductRequest,
    reply: ResponseToolkit
  ): Promise<ResponseObject> {
    await this.deleteProductUseCase(request.params.reference);
    return reply.response().code(204);
  }

  async searchProduct(
    request: SearchProductRequest,
    reply: ResponseToolkit
  ): Promise<ResponseObject> {
    try {
      const products = await this.searchProductUseCase(
        convertSearchQueryParamsToSearchParams(request.query)
      );
      
      return reply.response(products).code(200);
    } catch(e) {
      console.log(e)
      return reply.response()
    }
  }
}
