const resolvePromise = async (promise) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    console.error("Erro ao resolver a promessa:", error.response || error);
    throw error;
  }
};

export default resolvePromise;
