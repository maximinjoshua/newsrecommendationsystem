import axios from 'axios'

export const callPublisherForArticles = async (publisherURL) =>{
    try{
    const response = await axios.get(publisherURL)
    return response
    }
    catch(error){
        throw error
    }
}