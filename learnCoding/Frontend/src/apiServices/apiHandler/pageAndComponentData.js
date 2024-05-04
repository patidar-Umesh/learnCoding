import {toast} from "react-hot-toast"
import { apiConnector } from '../apiConnector.js';
import { catalogData } from '../apis.js';

export const getCategoryPageData = async(categoryId) => {
  const toastId = toast.loading("Loading...");
  // console.log("Category id", categoryId);

  let result = [];
  try{
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
        {categoryId: categoryId,});
        // console.log("Category courses Api Res....", response);

        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data");

         result = response?.data;
        //  console.log('result of category page', result)

  }
  catch(error) {
    console.log("Category courses Api Error....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}


