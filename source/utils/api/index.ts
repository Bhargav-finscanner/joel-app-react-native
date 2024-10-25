import {
  address_body,
  sign_in_body,
  sign_up_body,
} from '../../components/types/apisBodyTypes';
import {
  BrandType,
  CartProductType,
  CategoryType,
  ProductType,
} from '../../components/types/stateTypes';
import instance from '../axios/interceptors';

export const sign_in = async (data: sign_in_body) => {
  try {
    const response = await instance.post(
      `rest/V1/integration/customer/token?username=${data?.username}&password=${data?.password}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const sign_up = async (data: sign_up_body) => {
  try {
    const response = await instance.post('rest/V1/customers', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_category = async (): Promise<CategoryType[]> => {
  try {
    const response = await instance.get(
      'rest/V1/categories?searchCriteria[pageSize]=100',
    );

    return response?.data?.children_data?.map((ele: any) => {
      return {id: ele?.id, name: ele?.name, product_count: ele?.product_count};
    });
  } catch (error) {
    throw error;
  }
};

export const get_brands = async (): Promise<BrandType[]> => {
  try {
    const response = await instance.get(
      'https://digitalstout.me/rest/V1/products/attributes/brand/options',
    );

    return response?.data?.map((ele: any) => {
      return {id: ele?.value, name: ele?.label};
    });
  } catch (error) {
    throw error;
  }
};

export type ProductResponseType = {list: ProductType[]; total_count: number};

export const get_products = async (
  page: number,
  sort: string,
): Promise<ProductResponseType> => {
  try {
    const response = await instance.get(
      `rest/V1/products?searchCriteria[pageSize]=10&searchCriteria[currentPage]=1${sort}`,
    );

    return {
      list: response?.data?.items?.map((ele: any) => {
        return {
          id: ele?.id,
          sku: ele?.sku,
          name: ele?.name,
          price: ele?.price,
          main_image:
            'https://digitalstout.me/pub/media/catalog/product/cache/o9y7jh4p3kx3lxv1c181w64jg3e5uzck' +
            ele?.media_gallery_entries[0]?.file,
          description: ele?.custom_attributes?.find(
            (ele_dec: any) => ele_dec?.attribute_code === 'meta_description',
          )?.value,
          available_unit: ele?.custom_attributes?.find(
            (ele_dec: any) => ele_dec?.attribute_code === 'unit',
          )?.value,
          properties: [
            {
              conductor: ele?.custom_attributes?.find(
                (ele_dec: any) => ele_dec?.attribute_code === 'conductor',
              )?.value,
            },
            {
              insulation: ele?.custom_attributes?.find(
                (ele_dec: any) => ele_dec?.attribute_code === 'insulation',
              )?.value,
            },
            {
              unit: ele?.custom_attributes?.find(
                (ele_dec: any) => ele_dec?.attribute_code === 'unit',
              )?.value,
            },
            {
              wire_armour: ele?.custom_attributes?.find(
                (ele_dec: any) => ele_dec?.attribute_code === 'wire_armour',
              )?.value,
            },
            {
              colour_code:
                '#' +
                ele?.custom_attributes?.find(
                  (ele_dec: any) => ele_dec?.attribute_code === 'colour_code',
                )?.value,
            },
          ],
        } as ProductType;
      }),
      total_count: response?.data?.total_count,
    };
  } catch (error) {
    throw error;
  }
};

export type CartProductResponseType = {
  list: CartProductType[];
  total_count: number;
  sub_total: number;
  quantity: number;
};

export const get_cart_added_product = async (
  page: number,
): Promise<CartProductResponseType> => {
  try {
    const response = await instance.get(
      `https://digitalstout.me/rest/V1/products?searchCriteria[pageSize]=${page}`,
    );

    return {
      list: response?.data?.items?.map((ele: any) => {
        return {
          id: ele?.id,
          sku: ele?.sku,
          name: ele?.name,
          price: ele?.price,
          main_image:
            'https://digitalstout.me/pub/media/catalog/product/cache/o9y7jh4p3kx3lxv1c181w64jg3e5uzck' +
            ele?.media_gallery_entries[0]?.file,
          description: ele?.custom_attributes?.find(
            (ele_dec: any) => ele_dec?.attribute_code === 'meta_description',
          ).value,
          available_unit: ele?.custom_attributes?.find(
            (ele_dec: any) => ele_dec?.attribute_code === 'unit',
          ).value,
          selected_unit: 123,
          properties: [
            {
              conductor: ele?.custom_attributes?.find(
                (ele_dec: any) => ele_dec?.attribute_code === 'conductor',
              ).value,
            },
            {
              insulation: ele?.custom_attributes?.find(
                (ele_dec: any) => ele_dec?.attribute_code === 'insulation',
              ).value,
            },
            {
              unit: ele?.custom_attributes?.find(
                (ele_dec: any) => ele_dec?.attribute_code === 'unit',
              ).value,
            },
            {
              wire_armour: ele?.custom_attributes?.find(
                (ele_dec: any) => ele_dec?.attribute_code === 'wire_armour',
              ).value,
            },
            {
              colour_code:
                '#' +
                ele?.custom_attributes?.find(
                  (ele_dec: any) => ele_dec?.attribute_code === 'colour_code',
                ).value,
            },
          ],
        } as ProductType;
      }),
      total_count: response?.data?.total_count,
      sub_total: 2344,
      quantity: 123,
    };
  } catch (error) {
    throw error;
  }
};

export const add_to_wish_list = async (data: {id: number | string}) => {
  console.log('data', data);
};

export const add_to_cart_list = async (data: {
  id: number | string;
  quantity: string;
}) => {
  console.log('data', data);
};

export const address_list = async () => {
  try {
    const response = await instance.get(
      'https://digitalstout.me/rest/V1/customers/search?searchCriteria[pageSize]=50&searchCriteria[currentPage]=1',
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const add_new_address = async (data: address_body) => {
  try {
    const response = await instance.post(
      `rest/V1/customers/${data?.customer_id}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
