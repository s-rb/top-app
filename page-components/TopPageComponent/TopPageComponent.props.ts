import {TopLevelCategory, TopPageModel} from "../../interfaces/page.interface";
import {ProductModel} from "../../interfaces/product.interface";

export interface TopPageComponentProps { // extend для использованию в withLayout
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}