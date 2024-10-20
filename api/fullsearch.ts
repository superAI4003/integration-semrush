import axios from 'axios';
import { Handler } from '@netlify/functions';
import { processResponse } from './responseModels/apiResponse';
import { parseFullSearchResponse } from './responseModels/fullSearchResponse';

const { SEMRUSH_API_KEY } = process.env;

export const handler: Handler = async event => {
  const body: Body = JSON.parse(event.body ?? '');

  if (!SEMRUSH_API_KEY) {
    return {
      statusCode: 500,
      body: 'Missing api key. Please check the documentation and re-configure the server.',
    };
  }

  const params = {
    type: 'phrase_fullsearch',
    key: SEMRUSH_API_KEY,
    phrase: body.keyword,
    database: body.selectedRegion,
    export_columns: 'Ph,Nq',
    display_limit: 10,
  };

  try {
    const response = await axios.get("https://api.semrush.com/", { params });

    return processResponse(parseFullSearchResponse, response.data);
  }
  catch (err) {
    console.log('err: ', err);
    if (!axios.isAxiosError(err)) {
      throw err;
    }

    return {
      statusCode: err.response?.status ?? 400,
      body: err.message,
    };
  }
};

type Body = Readonly<{
  keyword: string;
  selectedRegion: string;
}>;
