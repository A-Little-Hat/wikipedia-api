import axios from "axios";
const endpoint = 'https://en.wikipedia.org/w/api.php?';
const params = {
    origin: '*',
    format: 'json',
    action: 'query',
    prop: 'extracts',
    exchars: 200,
    exintro: true,
    explaintext: true,
    generator: 'search',
    gsrlimit: 1,
};

const getData = async () => {
    // keyword
    const keyword = 'elon musk';
    const queryStr = keyword.replace(/\s/g, '_');
    params.gsrsearch = queryStr;
    try {
        const response = await axios.get(endpoint, { params });
        const { data } = response;
        const { query: { pages } } = data;
        const { extract } = pages[Object.keys(pages)[0]];
        const url = `https://en.m.wikipedia.org/wiki/${queryStr}`
        // console.log(url);
        const responseData = { extract, url };
        console.log(responseData);
        if (data.error) throw new Error(data.error.info);
    } catch (error) {
        console.log(error);
    }
};
getData();