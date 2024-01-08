const apiKey = '31731640-63415b264c7abe0734c9208e1';

const fetchImages = async (query, page = 1) => {
  const url = `https://pixabay.com/api/?q=${encodeURIComponent(
    query
  )}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Помилка отримання зображень');
    }
    const data = await response.json();
    return { images: data.hits, totalHits: data.totalHits };
  } catch (error) {
    console.error('Під час отримання зображень сталася помилка:', error);
    throw error;
  }
};

export default fetchImages;
