
import axios from 'axios';

const error = async (title, body) => {

  console.log('doing the error func');


  try {
    const res = await axios.post(`http://localhost:8080/error`, {title, body});

    return res
  } catch(err) {
    console.log(err);
  }

  return false;
};

export default error;